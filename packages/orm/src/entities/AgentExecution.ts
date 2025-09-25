import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agent } from './Agent';

/**
 * Agent执行状态枚举
 */
export enum AgentExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

/**
 * AI智能体执行记录实体
 * 用于记录AI智能体的每次执行情况，包含输入输出内容、token消耗、执行状态等信息
 */
@Entity('agent_executions')
@Index(['agentId']) // 单列索引：支持按智能体查询
@Index(['agentId', 'status']) // 复合索引：支持按智能体和状态查询
@Index(['agentId', 'createdAt']) // 复合索引：支持按智能体和时间查询
@Index(['status']) // 单列索引：支持按状态查询
@Index(['createdAt']) // 单列索引：支持按时间查询
export class AgentExecution {
  @PrimaryGeneratedColumn({ comment: '执行记录唯一标识符' })
  id: number;

  @Column({
    type: 'int',
    comment: '关联的智能体ID',
  })
  @IsNumber()
  @IsNotEmpty()
  agentId: number;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'agentId' })
  agent?: Agent;

  @Column({
    type: 'text',
    comment: '输入内容，包含用户提交的原始请求数据',
  })
  @IsString()
  @IsNotEmpty()
  input: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'AI智能体生成的输出内容',
  })
  @IsString()
  @IsOptional()
  output?: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '输入消耗的token数量',
  })
  @IsNumber()
  @IsInt()
  @Min(0)
  inputToken: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '输出消耗的token数量',
  })
  @IsNumber()
  @IsInt()
  @Min(0)
  outputToken: number;

  @Column({
    type: 'enum',
    enum: AgentExecutionStatus,
    default: AgentExecutionStatus.PENDING,
    comment:
      '执行状态：pending待执行, running执行中, completed已完成, failed执行失败',
  })
  @IsEnum(AgentExecutionStatus)
  status: AgentExecutionStatus;

  @Column({
    type: 'int',
    nullable: true,
    comment: '执行耗时（毫秒）',
  })
  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  executionTime?: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: '执行失败时的错误信息',
  })
  @IsString()
  @IsOptional()
  errorMessage?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '执行开始时间',
  })
  @IsOptional()
  startedAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '执行完成时间',
  })
  @IsOptional()
  completedAt?: Date;

  @CreateDateColumn({ comment: '记录创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '记录更新时间' })
  updatedAt: Date;

  /**
   * 计算总token消耗量
   * @returns 输入token + 输出token
   */
  getTotalTokens(): number {
    return this.inputToken + this.outputToken;
  }

  /**
   * 计算token使用成本估算（基于OpenAI定价）
   * @param inputRate 输入token单价（美元/1000tokens）
   * @param outputRate 输出token单价（美元/1000tokens）
   * @returns 估算成本（美元）
   */
  estimateCost(inputRate: number = 0.0015, outputRate: number = 0.002): number {
    const inputCost = (this.inputToken / 1000) * inputRate;
    const outputCost = (this.outputToken / 1000) * outputRate;
    return inputCost + outputCost;
  }

  /**
   * 判断执行是否成功
   */
  isSuccess(): boolean {
    return this.status === AgentExecutionStatus.COMPLETED;
  }

  /**
   * 判断执行是否失败
   */
  isFailed(): boolean {
    return this.status === AgentExecutionStatus.FAILED;
  }

  /**
   * 判断是否正在执行
   */
  isRunning(): boolean {
    return this.status === AgentExecutionStatus.RUNNING;
  }

  /**
   * 判断是否等待执行
   */
  isPending(): boolean {
    return this.status === AgentExecutionStatus.PENDING;
  }

  /**
   * 格式化执行时间
   * @returns 格式化的执行时间字符串
   */
  getFormattedExecutionTime(): string {
    if (!this.executionTime) return '未知';

    if (this.executionTime < 1000) {
      return `${this.executionTime}ms`;
    }

    const seconds = Math.floor(this.executionTime / 1000);
    const milliseconds = this.executionTime % 1000;

    if (seconds < 60) {
      return `${seconds}.${Math.floor(milliseconds / 100)}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * 获取执行状态的中文描述
   */
  getStatusDescription(): string {
    const statusMap = {
      [AgentExecutionStatus.PENDING]: '等待执行',
      [AgentExecutionStatus.RUNNING]: '执行中',
      [AgentExecutionStatus.COMPLETED]: '执行完成',
      [AgentExecutionStatus.FAILED]: '执行失败',
    };
    return statusMap[this.status];
  }

  /**
   * 开始执行（更新状态和开始时间）
   */
  start(): void {
    this.status = AgentExecutionStatus.RUNNING;
    this.startedAt = new Date();
  }

  /**
   * 完成执行（更新状态、完成时间和执行耗时）
   * @param output 执行输出结果
   * @param outputToken 输出token数量
   */
  complete(output: string, outputToken: number): void {
    this.status = AgentExecutionStatus.COMPLETED;
    this.output = output;
    this.outputToken = outputToken;
    this.completedAt = new Date();

    if (this.startedAt) {
      this.executionTime =
        this.completedAt.getTime() - this.startedAt.getTime();
    }
  }

  /**
   * 执行失败（更新状态、完成时间和错误信息）
   * @param errorMessage 错误信息
   */
  fail(errorMessage: string): void {
    this.status = AgentExecutionStatus.FAILED;
    this.errorMessage = errorMessage;
    this.completedAt = new Date();

    if (this.startedAt) {
      this.executionTime =
        this.completedAt.getTime() - this.startedAt.getTime();
    }
  }

  /**
   * 获取执行效率（token/秒）
   * @returns token处理速度，如果执行时间为0则返回0
   */
  getExecutionEfficiency(): number {
    if (!this.executionTime || this.executionTime === 0) return 0;
    return Math.round((this.getTotalTokens() / this.executionTime) * 1000);
  }

  /**
   * 判断是否为高消耗执行（总token超过指定阈值）
   * @param threshold token阈值，默认为10000
   */
  isHighConsumption(threshold: number = 10000): boolean {
    return this.getTotalTokens() > threshold;
  }

  /**
   * 判断是否为长时间执行（超过指定时间阈值）
   * @param threshold 时间阈值（毫秒），默认为30秒
   */
  isLongRunning(threshold: number = 30000): boolean {
    return this.executionTime ? this.executionTime > threshold : false;
  }
}
