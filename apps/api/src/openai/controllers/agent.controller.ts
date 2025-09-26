import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OpenAIService } from '../services/openai.service';
import {
  CreateAgentDto,
  UpdateAgentDto,
  QueryAgentDto,
  PaginatedResponse,
} from '../types';
import { Agent } from '@sker/orm';

@ApiTags('智能体管理')
@Controller('agents')
export class AgentController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post()
  @ApiOperation({ summary: '创建智能体' })
  @ApiResponse({
    status: 201,
    description: '智能体创建成功',
    type: Agent,
  })
  @ApiResponse({
    status: 409,
    description: '智能体代码已存在',
  })
  async create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.openaiService.createAgent(createAgentDto);
  }

  @Get()
  @ApiOperation({ summary: '分页查询智能体列表' })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: PaginatedResponse<Agent>,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '页码，从1开始',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '每页数量，最大100',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: '排序字段',
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: '排序方向',
    enum: ['ASC', 'DESC'],
  })
  @ApiQuery({
    name: 'code',
    required: false,
    description: '智能体代码筛选',
    example: 'sentiment',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '智能体名称筛选',
    example: '情感',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: '是否启用筛选',
    example: true,
  })
  @ApiQuery({
    name: 'model',
    required: false,
    description: '模型筛选',
    example: 'gpt-3.5-turbo',
  })
  async findAll(
    @Query() query: QueryAgentDto,
  ): Promise<PaginatedResponse<Agent>> {
    return this.openaiService.findAgents(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个智能体详情' })
  @ApiParam({ name: 'id', description: '智能体ID' })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: Agent,
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Agent> {
    return this.openaiService.getAgentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新智能体' })
  @ApiParam({ name: 'id', description: '智能体ID' })
  @ApiResponse({
    status: 200,
    description: '更新成功',
    type: Agent,
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<Agent> {
    return this.openaiService.updateAgent(id, updateAgentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除智能体' })
  @ApiParam({ name: 'id', description: '智能体ID' })
  @ApiResponse({
    status: 204,
    description: '删除成功（如果有执行记录则软删除）',
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.openaiService.deleteAgent(id);
  }

  @Post(':id/toggle-status')
  @ApiOperation({ summary: '切换智能体启用状态' })
  @ApiParam({ name: 'id', description: '智能体ID' })
  @ApiResponse({
    status: 200,
    description: '状态切换成功',
    type: Agent,
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async toggleStatus(@Param('id', ParseIntPipe) id: number): Promise<Agent> {
    const agent = await this.openaiService.getAgentById(id);
    return this.openaiService.updateAgent(id, { isActive: !agent.isActive });
  }

  @Get(':id/stats')
  @ApiOperation({ summary: '获取智能体统计信息' })
  @ApiParam({ name: 'id', description: '智能体ID' })
  @ApiResponse({
    status: 200,
    description: '统计信息获取成功',
  })
  @ApiResponse({
    status: 404,
    description: '智能体不存在',
  })
  async getStats(@Param('id', ParseIntPipe) id: number) {
    const agent = await this.openaiService.getAgentById(id);
    return this.openaiService.getEnhancedExecutionStats(agent.code);
  }
}
