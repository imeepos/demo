import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * AI智能体实体
 * 用于存储舆情分析AI智能体的配置信息，包含系统提示词、模型参数等
 */
@Entity('agents')
@Index(['isActive', 'category', 'sortOrder']) // 复合索引：支持按启用状态、分类和排序查询
@Index(['code'], { unique: true }) // 唯一索引：智能体代码
export class Agent {
  @PrimaryGeneratedColumn({ comment: '智能体唯一标识符' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '智能体代码，如 sentiment-analyzer, content-summarizer',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '智能体名称，如 情感分析器, 内容摘要器',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '智能体功能描述',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({
    type: 'text',
    comment: '系统提示词，定义AI智能体的角色和行为',
  })
  @IsString()
  @IsNotEmpty()
  systemPrompt: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0.7,
    comment: 'AI温度值，控制输出的随机性和创造性，范围0.00-2.00',
  })
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature: number;

  @Column({
    type: 'int',
    default: 4000,
    comment: '最大token限制，控制AI输出的最大长度',
  })
  @IsNumber()
  @Min(1)
  @Max(32000)
  maxTokens: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'gpt-3.5-turbo',
    comment: '使用的AI模型名称',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  model: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: '是否启用该智能体',
  })
  @IsBoolean()
  isActive: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment: '排序权重，数值越大排序越靠前',
  })
  @IsNumber()
  @Min(0)
  sortOrder: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  /**
   * 获取AI配置参数对象
   */
  getAIConfig(): {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
  } {
    return {
      model: this.model,
      temperature: Number(this.temperature),
      maxTokens: this.maxTokens,
      systemPrompt: this.systemPrompt,
    };
  }

  /**
   * 设置AI配置参数
   */
  setAIConfig(config: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  }): void {
    if (config.model) this.model = config.model;
    if (config.temperature !== undefined) this.temperature = config.temperature;
    if (config.maxTokens !== undefined) this.maxTokens = config.maxTokens;
    if (config.systemPrompt) this.systemPrompt = config.systemPrompt;
  }

  /**
   * 验证温度值是否在有效范围内
   */
  isValidTemperature(): boolean {
    return this.temperature >= 0 && this.temperature <= 2;
  }

  /**
   * 验证最大token值是否在有效范围内
   */
  isValidMaxTokens(): boolean {
    return this.maxTokens >= 1 && this.maxTokens <= 32000;
  }

  /**
   * 获取智能体状态描述
   */
  getStatusDescription(): string {
    return this.isActive ? '启用' : '禁用';
  }
}
