import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import OpenAI from 'openai';
import { Agent, AgentExecution, AgentExecutionStatus } from '@sker/orm';
import { OpenAIConfig } from '../config/openai.config';
import {
  AgentExecutionResult,
  ExecuteAgentDto,
  OpenAIExecutionOptions,
  CreateAgentDto,
  UpdateAgentDto,
  QueryAgentDto,
  QueryAgentExecutionDto,
  PaginatedResponse,
  PaginationMeta,
  AgentExecutionStatsDto,
  BatchExecutionResultDto,
} from '../types';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(AgentExecution)
    private readonly agentExecutionRepository: Repository<AgentExecution>,
  ) {
    const config = this.configService.get<OpenAIConfig>('openai');

    if (!config?.apiKey) {
      throw new Error(
        'OpenAI API key is required. Please set OPENAI_API_KEY environment variable.',
      );
    }

    this.openai = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
      timeout: config.timeout,
      maxRetries: config.maxRetries,
    });
  }

  /**
   * 执行智能体并记录执行结果
   * @param dto 执行参数
   * @param options 额外选项
   * @returns 执行结果
   */
  async executeAgent(
    dto: ExecuteAgentDto,
    options?: OpenAIExecutionOptions,
  ): Promise<AgentExecutionResult> {
    const { agentCode, input, context } = dto;

    this.logger.log(`开始执行智能体: ${agentCode}`);

    // 查找智能体配置
    const agent = await this.findActiveAgent(agentCode);

    // 创建执行记录
    const execution = await this.createExecution(agent.id, input);

    try {
      // 构建完整的输入内容
      const fullInput = context ? `${input}\n\n上下文：${context}` : input;

      // 执行AI调用
      const result = await this.callOpenAI(agent, fullInput, options);

      // 更新执行记录为完成状态
      await this.completeExecution(
        execution,
        result.output,
        result.outputTokens,
        result.inputTokens,
      );

      this.logger.log(`智能体执行完成: ${agentCode}, 执行ID: ${execution.id}`);

      return {
        executionId: execution.id,
        output: result.output,
        inputTokens: result.inputTokens,
        outputTokens: result.outputTokens,
        totalTokens: result.inputTokens + result.outputTokens,
        executionTime: execution.executionTime || 0,
        model: agent.model,
      };
    } catch (error) {
      // 更新执行记录为失败状态
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      await this.failExecution(execution, errorMessage);

      this.logger.error(`智能体执行失败: ${agentCode}, 错误: ${errorMessage}`);
      throw new InternalServerErrorException(`智能体执行失败: ${errorMessage}`);
    }
  }

  /**
   * 批量执行智能体
   * @param requests 批量执行请求
   * @param options 执行选项
   * @returns 批量执行结果
   */
  async executeAgentBatch(
    requests: ExecuteAgentDto[],
    options?: OpenAIExecutionOptions,
  ): Promise<BatchExecutionResultDto> {
    this.logger.log(`开始批量执行智能体，共 ${requests.length} 个任务`);

    const results = await Promise.allSettled(
      requests.map((request) => this.executeAgent(request, options)),
    );

    const successResults: AgentExecutionResult[] = [];
    const errorMessages: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successResults.push(result.value);
      } else {
        errorMessages.push(`任务 ${index + 1} 失败: ${result.reason.message}`);
      }
    });

    if (errorMessages.length > 0) {
      this.logger.warn(`批量执行部分失败: ${errorMessages.join(', ')}`);
    }

    this.logger.log(
      `批量执行完成，成功: ${successResults.length}, 失败: ${errorMessages.length}`,
    );

    return {
      successResults,
      errorMessages,
      successCount: successResults.length,
      failureCount: errorMessages.length,
      totalCount: requests.length,
    };
  }

  /**
   * 获取智能体执行历史
   * @param agentCode 智能体代码
   * @param limit 限制数量
   * @returns 执行历史列表
   */
  async getExecutionHistory(
    agentCode: string,
    limit: number = 50,
  ): Promise<AgentExecution[]> {
    const agent = await this.findActiveAgent(agentCode);

    return this.agentExecutionRepository.find({
      where: { agentId: agent.id },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['agent'],
    });
  }

  /**
   * 获取执行统计信息
   * @param agentCode 智能体代码
   * @returns 统计信息
   */
  async getExecutionStats(agentCode: string) {
    const agent = await this.findActiveAgent(agentCode);

    const [total, completed, failed, running] = await Promise.all([
      this.agentExecutionRepository.count({ where: { agentId: agent.id } }),
      this.agentExecutionRepository.count({
        where: { agentId: agent.id, status: AgentExecutionStatus.COMPLETED },
      }),
      this.agentExecutionRepository.count({
        where: { agentId: agent.id, status: AgentExecutionStatus.FAILED },
      }),
      this.agentExecutionRepository.count({
        where: { agentId: agent.id, status: AgentExecutionStatus.RUNNING },
      }),
    ]);

    const totalTokensResult = await this.agentExecutionRepository
      .createQueryBuilder('execution')
      .select(
        'SUM(execution.inputToken + execution.outputToken)',
        'totalTokens',
      )
      .where('execution.agentId = :agentId', { agentId: agent.id })
      .andWhere('execution.status = :status', {
        status: AgentExecutionStatus.COMPLETED,
      })
      .getRawOne();

    const avgExecutionTimeResult = await this.agentExecutionRepository
      .createQueryBuilder('execution')
      .select('AVG(execution.executionTime)', 'avgExecutionTime')
      .where('execution.agentId = :agentId', { agentId: agent.id })
      .andWhere('execution.status = :status', {
        status: AgentExecutionStatus.COMPLETED,
      })
      .getRawOne();

    return {
      total,
      completed,
      failed,
      running,
      successRate: total > 0 ? (completed / total) * 100 : 0,
      totalTokens: parseInt(totalTokensResult?.totalTokens) || 0,
      averageExecutionTime:
        parseInt(avgExecutionTimeResult?.avgExecutionTime) || 0,
    };
  }

  /**
   * 查找活跃的智能体
   */
  private async findActiveAgent(code: string): Promise<Agent> {
    const agent = await this.agentRepository.findOne({
      where: { code, isActive: true },
    });

    if (!agent) {
      throw new NotFoundException(`未找到活跃的智能体: ${code}`);
    }

    return agent;
  }

  /**
   * 创建执行记录
   */
  private async createExecution(
    agentId: number,
    input: string,
  ): Promise<AgentExecution> {
    const execution = this.agentExecutionRepository.create({
      agentId,
      input,
      inputToken: this.estimateTokenCount(input),
      status: AgentExecutionStatus.PENDING,
    });

    const savedExecution = await this.agentExecutionRepository.save(execution);

    // 开始执行
    savedExecution.start();
    await this.agentExecutionRepository.save(savedExecution);

    return savedExecution;
  }

  /**
   * 调用OpenAI API
   */
  private async callOpenAI(
    agent: Agent,
    input: string,
    options?: OpenAIExecutionOptions,
  ): Promise<{ output: string; inputTokens: number; outputTokens: number }> {
    const config = agent.getAIConfig();

    const response = await this.openai.chat.completions.create({
      model: options?.model || config.model,
      messages: [
        { role: 'system', content: config.systemPrompt },
        { role: 'user', content: input },
      ],
      temperature:
        options?.temperature !== undefined
          ? options.temperature
          : config.temperature,
      max_tokens: options?.maxTokens || config.maxTokens,
    });

    const choice = response.choices[0];
    if (!choice?.message?.content) {
      throw new Error('OpenAI API 未返回有效响应');
    }

    return {
      output: choice.message.content,
      inputTokens:
        response.usage?.prompt_tokens || this.estimateTokenCount(input),
      outputTokens:
        response.usage?.completion_tokens ||
        this.estimateTokenCount(choice.message.content),
    };
  }
  // ================== Agent CRUD 方法 ==================

  /**
   * 创建智能体
   */
  async createAgent(dto: CreateAgentDto): Promise<Agent> {
    this.logger.log(`创建智能体: ${dto.code}`);

    // 检查代码是否已存在
    const existingAgent = await this.agentRepository.findOne({
      where: { code: dto.code },
    });
    if (existingAgent) {
      throw new ConflictException(`智能体代码已存在: ${dto.code}`);
    }

    const agent = this.agentRepository.create(dto);
    const savedAgent = await this.agentRepository.save(agent);

    this.logger.log(`智能体创建成功: ${savedAgent.code}, ID: ${savedAgent.id}`);
    return savedAgent;
  }

  /**
   * 更新智能体
   */
  async updateAgent(id: number, dto: UpdateAgentDto): Promise<Agent> {
    this.logger.log(`更新智能体: ${id}`);

    const agent = await this.agentRepository.findOne({ where: { id } });
    if (!agent) {
      throw new NotFoundException(`智能体不存在: ${id}`);
    }

    Object.assign(agent, dto);
    const updatedAgent = await this.agentRepository.save(agent);

    this.logger.log(`智能体更新成功: ${updatedAgent.code}`);
    return updatedAgent;
  }

  /**
   * 删除智能体
   */
  async deleteAgent(id: number): Promise<void> {
    this.logger.log(`删除智能体: ${id}`);

    const agent = await this.agentRepository.findOne({ where: { id } });
    if (!agent) {
      throw new NotFoundException(`智能体不存在: ${id}`);
    }

    // 检查是否有相关的执行记录
    const executionCount = await this.agentExecutionRepository.count({
      where: { agentId: id },
    });
    if (executionCount > 0) {
      // 软删除 - 仅设置为不活跃状态
      agent.isActive = false;
      await this.agentRepository.save(agent);
      this.logger.log(`智能体已停用（存在执行记录）: ${agent.code}`);
    } else {
      // 硬删除
      await this.agentRepository.remove(agent);
      this.logger.log(`智能体已删除: ${agent.code}`);
    }
  }

  /**
   * 获取单个智能体
   */
  async getAgentById(id: number): Promise<Agent> {
    const agent = await this.agentRepository.findOne({ where: { id } });
    if (!agent) {
      throw new NotFoundException(`智能体不存在: ${id}`);
    }
    return agent;
  }

  /**
   * 分页查询智能体
   */
  async findAgents(query: QueryAgentDto): Promise<PaginatedResponse<Agent>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;
    const skip = (page - 1) * limit;

    // 构建查询条件
    const { code, name, isActive, model } = query;
    const where: FindOptionsWhere<Agent> = {};

    if (code) {
      where.code = Like(`%${code}%`);
    }
    if (name) {
      where.name = Like(`%${name}%`);
    }
    if (isActive !== undefined) {
      where.isActive = isActive;
    }
    if (model) {
      where.model = Like(`%${model}%`);
    }

    const [data, total] = await this.agentRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
    });

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasPrevious: page > 1,
      hasNext: page < Math.ceil(total / limit),
    };

    return { data, meta };
  }

  // ================== AgentExecution CRUD 方法 ==================

  /**
   * 获取单个执行记录
   */
  async getExecutionById(id: number): Promise<AgentExecution> {
    const execution = await this.agentExecutionRepository.findOne({
      where: { id },
      relations: ['agent'],
    });

    if (!execution) {
      throw new NotFoundException(`执行记录不存在: ${id}`);
    }

    return execution;
  }

  /**
   * 分页查询执行记录
   */
  async findExecutions(
    query: QueryAgentExecutionDto,
  ): Promise<PaginatedResponse<AgentExecution>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;
    const skip = (page - 1) * limit;

    // 构建查询条件
    const queryBuilder = this.agentExecutionRepository
      .createQueryBuilder('execution')
      .leftJoinAndSelect('execution.agent', 'agent')
      .skip(skip)
      .take(limit)
      .orderBy(`execution.${sortBy}`, sortOrder);

    // 添加筛选条件
    const {
      agentId,
      agentCode,
      status,
      startDate,
      endDate,
      inputKeyword,
      minExecutionTime,
      maxExecutionTime,
    } = query;

    if (agentId) {
      queryBuilder.andWhere('execution.agentId = :agentId', { agentId });
    }

    if (agentCode) {
      queryBuilder.andWhere('agent.code LIKE :agentCode', {
        agentCode: `%${agentCode}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('execution.status = :status', { status });
    }

    if (startDate) {
      queryBuilder.andWhere('execution.createdAt >= :startDate', {
        startDate: new Date(startDate),
      });
    }

    if (endDate) {
      queryBuilder.andWhere('execution.createdAt <= :endDate', {
        endDate: new Date(endDate),
      });
    }

    if (inputKeyword) {
      queryBuilder.andWhere('execution.input LIKE :inputKeyword', {
        inputKeyword: `%${inputKeyword}%`,
      });
    }

    if (minExecutionTime) {
      queryBuilder.andWhere('execution.executionTime >= :minTime', {
        minTime: minExecutionTime,
      });
    }

    if (maxExecutionTime) {
      queryBuilder.andWhere('execution.executionTime <= :maxTime', {
        maxTime: maxExecutionTime,
      });
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasPrevious: page > 1,
      hasNext: page < Math.ceil(total / limit),
    };

    return { data, meta };
  }

  /**
   * 获取增强版执行统计信息
   */
  async getEnhancedExecutionStats(
    agentCode: string,
  ): Promise<AgentExecutionStatsDto> {
    const agent = await this.findActiveAgent(agentCode);

    const [total, completed, failed, running, pending, tokenStats, timeStats] =
      await Promise.all([
        this.agentExecutionRepository.count({ where: { agentId: agent.id } }),
        this.agentExecutionRepository.count({
          where: { agentId: agent.id, status: AgentExecutionStatus.COMPLETED },
        }),
        this.agentExecutionRepository.count({
          where: { agentId: agent.id, status: AgentExecutionStatus.FAILED },
        }),
        this.agentExecutionRepository.count({
          where: { agentId: agent.id, status: AgentExecutionStatus.RUNNING },
        }),
        this.agentExecutionRepository.count({
          where: { agentId: agent.id, status: AgentExecutionStatus.PENDING },
        }),
        this.agentExecutionRepository
          .createQueryBuilder('execution')
          .select([
            'SUM(execution.inputToken + execution.outputToken) as totalTokens',
            'AVG(execution.inputToken) as avgInputTokens',
            'AVG(execution.outputToken) as avgOutputTokens',
          ])
          .where('execution.agentId = :agentId', { agentId: agent.id })
          .andWhere('execution.status = :status', {
            status: AgentExecutionStatus.COMPLETED,
          })
          .getRawOne(),
        this.agentExecutionRepository
          .createQueryBuilder('execution')
          .select([
            'AVG(execution.executionTime) as avgExecutionTime',
            'SUM(execution.executionTime) as totalExecutionTime',
          ])
          .where('execution.agentId = :agentId', { agentId: agent.id })
          .andWhere('execution.status = :status', {
            status: AgentExecutionStatus.COMPLETED,
          })
          .getRawOne(),
      ]);

    return {
      total,
      completed,
      failed,
      running,
      pending,
      successRate: total > 0 ? (completed / total) * 100 : 0,
      totalTokens: parseInt(tokenStats?.totalTokens) || 0,
      averageExecutionTime: parseInt(timeStats?.avgExecutionTime) || 0,
      totalExecutionTime: parseInt(timeStats?.totalExecutionTime) || 0,
      averageInputTokens: parseInt(tokenStats?.avgInputTokens) || 0,
      averageOutputTokens: parseInt(tokenStats?.avgOutputTokens) || 0,
    };
  }

  /**
   * 完成执行记录
   */
  private async completeExecution(
    execution: AgentExecution,
    output: string,
    outputTokens: number,
    inputTokens: number,
  ): Promise<void> {
    execution.complete(output, outputTokens);
    execution.inputToken = inputTokens; // 更新实际的输入token数
    await this.agentExecutionRepository.save(execution);
  }

  /**
   * 执行失败记录
   */
  private async failExecution(
    execution: AgentExecution,
    errorMessage: string,
  ): Promise<void> {
    execution.fail(errorMessage);
    await this.agentExecutionRepository.save(execution);
  }

  /**
   * 估算token数量（简单估算，实际应该使用更精确的方法）
   */
  private estimateTokenCount(text: string): number {
    // 粗略估算：1个token约等于0.75个英文单词或1个中文字符
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = text
      .replace(/[\u4e00-\u9fff]/g, '')
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return chineseChars + Math.ceil(englishWords * 0.75);
  }
}
