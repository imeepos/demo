import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { OpenAIService } from '../services/openai.service';
import {
  ExecuteAgentDto,
  BatchExecuteAgentDto,
  QueryAgentExecutionDto,
  AgentExecutionResult,
  BatchExecutionResultDto,
  PaginatedResponse,
  AgentExecutionStatsDto,
} from '../types';
import { AgentExecution } from '@sker/orm';

@ApiTags('智能体执行管理')
@Controller('executions')
export class AgentExecutionController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('execute')
  @ApiOperation({ summary: '执行单个智能体' })
  @ApiResponse({
    status: 200,
    description: '执行成功',
    type: AgentExecutionResult,
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  @ApiResponse({
    status: 500,
    description: '执行失败',
  })
  async executeAgent(@Body() dto: ExecuteAgentDto): Promise<AgentExecutionResult> {
    return this.openaiService.executeAgent(dto);
  }

  @Post('batch-execute')
  @ApiOperation({ summary: '批量执行智能体' })
  @ApiBody({
    type: BatchExecuteAgentDto,
    description: '批量执行请求',
  })
  @ApiResponse({
    status: 200,
    description: '批量执行完成',
    type: BatchExecutionResultDto,
  })
  async batchExecute(@Body() dto: BatchExecuteAgentDto): Promise<BatchExecutionResultDto> {
    return this.openaiService.executeAgentBatch(dto.requests, dto.options);
  }

  @Get()
  @ApiOperation({ summary: '分页查询执行记录' })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: PaginatedResponse<AgentExecution>,
  })
  @ApiQuery({ name: 'page', required: false, description: '页码，从1开始', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量，最大100', example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: '排序字段', example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: '排序方向', enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'agentId', required: false, description: '智能体ID筛选', example: 1 })
  @ApiQuery({ name: 'agentCode', required: false, description: '智能体代码筛选', example: 'sentiment-analyzer' })
  @ApiQuery({ name: 'status', required: false, description: '执行状态筛选', example: 'completed' })
  @ApiQuery({ name: 'startDate', required: false, description: '开始时间筛选', example: '2024-01-01T00:00:00.000Z' })
  @ApiQuery({ name: 'endDate', required: false, description: '结束时间筛选', example: '2024-12-31T23:59:59.999Z' })
  @ApiQuery({ name: 'inputKeyword', required: false, description: '输入内容关键词筛选', example: '情感' })
  @ApiQuery({ name: 'minExecutionTime', required: false, description: '最小执行时间筛选（毫秒）', example: 1000 })
  @ApiQuery({ name: 'maxExecutionTime', required: false, description: '最大执行时间筛选（毫秒）', example: 30000 })
  async findExecutions(@Query() query: QueryAgentExecutionDto): Promise<PaginatedResponse<AgentExecution>> {
    return this.openaiService.findExecutions(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取执行记录详情' })
  @ApiParam({ name: 'id', description: '执行记录ID' })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: AgentExecution,
  })
  @ApiResponse({
    status: 404,
    description: '执行记录不存在',
  })
  async getExecution(@Param('id', ParseIntPipe) id: number): Promise<AgentExecution> {
    return this.openaiService.getExecutionById(id);
  }

  @Get('history/:agentCode')
  @ApiOperation({ summary: '获取智能体执行历史' })
  @ApiParam({ name: 'agentCode', description: '智能体代码' })
  @ApiQuery({ name: 'limit', required: false, description: '限制数量', example: 50 })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: [AgentExecution],
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async getExecutionHistory(
    @Param('agentCode') agentCode: string,
    @Query('limit', ParseIntPipe) limit: number = 50,
  ): Promise<AgentExecution[]> {
    return this.openaiService.getExecutionHistory(agentCode, limit);
  }

  @Get('stats/:agentCode')
  @ApiOperation({ summary: '获取智能体执行统计' })
  @ApiParam({ name: 'agentCode', description: '智能体代码' })
  @ApiResponse({
    status: 200,
    description: '统计信息获取成功',
    type: AgentExecutionStatsDto,
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async getExecutionStats(@Param('agentCode') agentCode: string): Promise<AgentExecutionStatsDto> {
    return this.openaiService.getEnhancedExecutionStats(agentCode);
  }

  @Get('by-agent/:agentId')
  @ApiOperation({ summary: '根据智能体ID查询执行记录' })
  @ApiParam({ name: 'agentId', description: '智能体ID' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量', example: 10 })
  @ApiQuery({ name: 'status', required: false, description: '状态筛选' })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: PaginatedResponse<AgentExecution>,
  })
  async getExecutionsByAgent(
    @Param('agentId', ParseIntPipe) agentId: number,
    @Query() query: QueryAgentExecutionDto,
  ): Promise<PaginatedResponse<AgentExecution>> {
    query.agentId = agentId;
    return this.openaiService.findExecutions(query);
  }

  @Post('retry/:id')
  @ApiOperation({ summary: '重试失败的执行记录' })
  @ApiParam({ name: 'id', description: '执行记录ID' })
  @ApiResponse({
    status: 200,
    description: '重试成功',
    type: AgentExecutionResult,
  })
  @ApiResponse({
    status: 404,
    description: '执行记录不存在',
  })
  @ApiResponse({
    status: 400,
    description: '执行记录状态不允许重试',
  })
  async retryExecution(@Param('id', ParseIntPipe) id: number): Promise<AgentExecutionResult> {
    const execution = await this.openaiService.getExecutionById(id);
    
    if (!execution.isFailed()) {
      throw new Error('只能重试失败的执行记录');
    }

    return this.openaiService.executeAgent({
      agentCode: execution.agent!.code,
      input: execution.input,
    });
  }

  @Get('analytics/overview')
  @ApiOperation({ summary: '获取全局执行分析概览' })
  @ApiResponse({
    status: 200,
    description: '分析数据获取成功',
  })
  async getAnalyticsOverview() {
    // 这里可以实现全局统计逻辑
    // 目前返回基础统计信息
    return {
      message: '全局分析功能待实现',
      hint: '可以使用 /executions/stats/{agentCode} 获取特定智能体的统计信息',
    };
  }

  @Get('analytics/performance/:agentCode')
  @ApiOperation({ summary: '获取智能体性能分析' })
  @ApiParam({ name: 'agentCode', description: '智能体代码' })
  @ApiQuery({ name: 'days', required: false, description: '分析天数', example: 30 })
  @ApiResponse({
    status: 200,
    description: '性能分析数据获取成功',
  })
  async getPerformanceAnalysis(
    @Param('agentCode') agentCode: string,
    @Query('days', ParseIntPipe) days: number = 30,
  ) {
    const stats = await this.openaiService.getEnhancedExecutionStats(agentCode);
    
    // 这里可以扩展为更详细的性能分析
    return {
      agentCode,
      period: `最近 ${days} 天`,
      performance: {
        averageResponseTime: stats.averageExecutionTime,
        throughput: stats.total,
        successRate: stats.successRate,
        tokenEfficiency: stats.totalTokens > 0 ? stats.totalExecutionTime / stats.totalTokens : 0,
      },
      recommendations: this.generatePerformanceRecommendations(stats),
    };
  }

  private generatePerformanceRecommendations(stats: AgentExecutionStatsDto): string[] {
    const recommendations: string[] = [];
    
    if (stats.successRate < 90) {
      recommendations.push('成功率偏低，建议检查系统提示词和输入数据质量');
    }
    
    if (stats.averageExecutionTime > 10000) {
      recommendations.push('平均执行时间较长，建议优化提示词或调整模型参数');
    }
    
    if (stats.averageInputTokens > 2000) {
      recommendations.push('输入token数量较大，建议优化输入内容长度');
    }
    
    if (stats.total > 0 && stats.failed / stats.total > 0.1) {
      recommendations.push('失败率较高，建议检查错误日志和API配置');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('性能表现良好，继续保持');
    }
    
    return recommendations;
  }
}