import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  Min,
  Max,
  Length,
  IsInt,
  IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AgentExecutionStatus } from '@sker/orm';

export class ExecuteAgentDto {
  @ApiProperty({
    description: '智能体代码',
    example: 'sentiment-analyzer',
  })
  @IsString()
  @IsNotEmpty()
  agentCode: string;

  @ApiProperty({
    description: '输入内容',
    example: '今天天气真好',
  })
  @IsString()
  @IsNotEmpty()
  input: string;

  @ApiProperty({
    description: '额外上下文信息',
    example: '这是用户在社交媒体上的评论',
    required: false,
  })
  @IsString()
  @IsOptional()
  context?: string;
}

export class AgentExecutionResult {
  @ApiProperty({
    description: '执行记录ID',
    example: 123,
  })
  executionId: number;

  @ApiProperty({
    description: 'AI生成的输出内容',
    example: '这是一条积极正面的评论',
  })
  output: string;

  @ApiProperty({
    description: '输入token数量',
    example: 15,
  })
  inputTokens: number;

  @ApiProperty({
    description: '输出token数量',
    example: 25,
  })
  outputTokens: number;

  @ApiProperty({
    description: '总token数量',
    example: 40,
  })
  totalTokens: number;

  @ApiProperty({
    description: '执行时间（毫秒）',
    example: 1500,
  })
  executionTime: number;

  @ApiProperty({
    description: '使用的模型',
    example: 'gpt-3.5-turbo',
  })
  model: string;
}

export interface OpenAIExecutionOptions {
  timeout?: number;
  maxRetries?: number;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

// ================== 分页相关DTOs ==================

export class PaginationDto {
  @ApiPropertyOptional({
    description: '页码，从1开始',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: '每页数量，最大100',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: '排序字段',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: '排序方向',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}

export class PaginationMeta {
  @ApiProperty({ description: '当前页码' })
  page: number;

  @ApiProperty({ description: '每页数量' })
  limit: number;

  @ApiProperty({ description: '总记录数' })
  total: number;

  @ApiProperty({ description: '总页数' })
  totalPages: number;

  @ApiProperty({ description: '是否有上一页' })
  hasPrevious: boolean;

  @ApiProperty({ description: '是否有下一页' })
  hasNext: boolean;
}

export class PaginatedResponse<T> {
  @ApiProperty({ description: '数据列表' })
  data: T[];

  @ApiProperty({ description: '分页信息', type: PaginationMeta })
  meta: PaginationMeta;
}

// ================== Agent相关DTOs ==================

export class CreateAgentDto {
  @ApiProperty({
    description: '智能体代码',
    example: 'sentiment-analyzer',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @ApiProperty({
    description: '智能体名称',
    example: '情感分析器',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiPropertyOptional({
    description: '智能体描述',
    example: '用于分析文本的情感倾向',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: '系统提示词',
    example: '你是一个专业的情感分析助手...',
  })
  @IsString()
  @IsNotEmpty()
  systemPrompt: string;

  @ApiPropertyOptional({
    description: '温度值，控制输出随机性',
    example: 0.7,
    minimum: 0,
    maximum: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number = 0.7;

  @ApiPropertyOptional({
    description: '最大token数',
    example: 4000,
    minimum: 1,
    maximum: 32000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(32000)
  maxTokens?: number = 4000;

  @ApiPropertyOptional({
    description: '使用的模型',
    example: 'gpt-3.5-turbo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  model?: string = 'gpt-3.5-turbo';

  @ApiPropertyOptional({
    description: '是否启用',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiPropertyOptional({
    description: '排序权重',
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder?: number = 0;
}

export class UpdateAgentDto {
  @ApiPropertyOptional({
    description: '智能体名称',
    example: '情感分析器',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiPropertyOptional({
    description: '智能体描述',
    example: '用于分析文本的情感倾向',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: '系统提示词',
    example: '你是一个专业的情感分析助手...',
  })
  @IsOptional()
  @IsString()
  systemPrompt?: string;

  @ApiPropertyOptional({
    description: '温度值，控制输出随机性',
    example: 0.7,
    minimum: 0,
    maximum: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({
    description: '最大token数',
    example: 4000,
    minimum: 1,
    maximum: 32000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(32000)
  maxTokens?: number;

  @ApiPropertyOptional({
    description: '使用的模型',
    example: 'gpt-3.5-turbo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  model?: string;

  @ApiPropertyOptional({
    description: '是否启用',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: '排序权重',
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class QueryAgentDto extends PaginationDto {
  @ApiPropertyOptional({
    description: '智能体代码筛选',
    example: 'sentiment',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: '智能体名称筛选',
    example: '情感',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: '是否启用筛选',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }: { value: any }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: '模型筛选',
    example: 'gpt-3.5-turbo',
  })
  @IsOptional()
  @IsString()
  model?: string;
}

// ================== AgentExecution相关DTOs ==================

export class BatchExecuteAgentDto {
  @ApiProperty({
    description: '批量执行请求列表',
    type: [ExecuteAgentDto],
  })
  @Type(() => ExecuteAgentDto)
  requests: ExecuteAgentDto[];

  @ApiPropertyOptional({
    description: '执行选项',
  })
  @IsOptional()
  options?: OpenAIExecutionOptions;
}

export class QueryAgentExecutionDto extends PaginationDto {
  @ApiPropertyOptional({
    description: '智能体ID筛选',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  agentId?: number;

  @ApiPropertyOptional({
    description: '智能体代码筛选',
    example: 'sentiment-analyzer',
  })
  @IsOptional()
  @IsString()
  agentCode?: string;

  @ApiPropertyOptional({
    description: '执行状态筛选',
    example: 'completed',
    enum: AgentExecutionStatus,
  })
  @IsOptional()
  @IsEnum(AgentExecutionStatus)
  status?: AgentExecutionStatus;

  @ApiPropertyOptional({
    description: '开始时间筛选（ISO字符串）',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: '结束时间筛选（ISO字符串）',
    example: '2024-12-31T23:59:59.999Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: '输入内容关键词筛选',
    example: '情感',
  })
  @IsOptional()
  @IsString()
  inputKeyword?: string;

  @ApiPropertyOptional({
    description: '最小执行时间筛选（毫秒）',
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minExecutionTime?: number;

  @ApiPropertyOptional({
    description: '最大执行时间筛选（毫秒）',
    example: 30000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxExecutionTime?: number;
}

export class AgentExecutionStatsDto {
  @ApiProperty({ description: '总执行次数' })
  total: number;

  @ApiProperty({ description: '成功执行次数' })
  completed: number;

  @ApiProperty({ description: '失败执行次数' })
  failed: number;

  @ApiProperty({ description: '运行中执行次数' })
  running: number;

  @ApiProperty({ description: '等待中执行次数' })
  pending: number;

  @ApiProperty({ description: '成功率（百分比）' })
  successRate: number;

  @ApiProperty({ description: '总消耗token数' })
  totalTokens: number;

  @ApiProperty({ description: '平均执行时间（毫秒）' })
  averageExecutionTime: number;

  @ApiProperty({ description: '总执行时间（毫秒）' })
  totalExecutionTime: number;

  @ApiProperty({ description: '平均输入token数' })
  averageInputTokens: number;

  @ApiProperty({ description: '平均输出token数' })
  averageOutputTokens: number;
}

// ================== 响应DTOs ==================

export class BatchExecutionResultDto {
  @ApiProperty({ description: '成功执行的结果', type: [AgentExecutionResult] })
  successResults: AgentExecutionResult[];

  @ApiProperty({ description: '失败的错误信息', type: [String] })
  errorMessages: string[];

  @ApiProperty({ description: '成功数量' })
  successCount: number;

  @ApiProperty({ description: '失败数量' })
  failureCount: number;

  @ApiProperty({ description: '总数量' })
  totalCount: number;
}
