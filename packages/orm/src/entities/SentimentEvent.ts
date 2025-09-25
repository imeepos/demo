import {
  IsArray,
  IsDateString,
  IsLatitude,
  IsLongitude,
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
 * 情感倾向枚举
 * 基于score值确定情感类型
 */
export enum SentimentType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

/**
 * 舆情事件实体
 * 用于存储舆情监控系统中的事件数据，包含事件内容、情感分析结果、地理位置等信息
 */
@Entity('sentiment_events')
@Index(['score', 'timestamp']) // 复合索引：支持按分数和时间查询
@Index(['latitude', 'longitude']) // 地理空间索引：支持地理范围查询
@Index(['source']) // 单列索引：支持按来源查询
@Index(['hotness']) // 单列索引：支持按热度查询
export class SentimentEvent {
  @PrimaryGeneratedColumn({ comment: '事件唯一标识符' })
  id: number;

  @Column({
    type: 'varchar',
    length: 500,
    comment: '事件标题',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '事件详细内容描述',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    comment: '情感分数，范围 0.00 到 1.00，0表示最负面，1表示最正面，0.5为中性',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  score: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    comment: '纬度，支持7位小数精度',
  })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    comment: '经度，支持7位小数精度',
  })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: '事件发生的具体地址描述',
  })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  address?: string;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '信息来源媒体或平台',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  source: string;

  @Column({
    type: 'timestamp',
    comment: '事件发生的时间戳',
  })
  @IsDateString()
  timestamp: Date;

  @Column({
    type: 'smallint',
    default: 1,
    comment: '事件热度值，范围1-10，数值越高表示关注度越高',
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  hotness: number;

  @Column({
    type: 'json',
    nullable: true,
    comment: '事件相关标签，存储为字符串数组',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @CreateDateColumn({ comment: '记录创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '记录更新时间' })
  updatedAt: Date;

  /**
   * 获取地理位置坐标对象
   * @returns {lat: number, lng: number}
   */
  getLocation(): { lat: number; lng: number } {
    return {
      lat: Number(this.latitude),
      lng: Number(this.longitude),
    };
  }

  /**
   * 设置地理位置坐标
   * @param location 地理位置坐标
   */
  setLocation(location: { lat: number; lng: number }): void {
    this.latitude = location.lat;
    this.longitude = location.lng;
  }

  /**
   * 根据分数自动计算情感类型
   * @returns 情感类型
   */
  getSentimentType(): SentimentType {
    if (this.score >= 0.6) return SentimentType.POSITIVE;
    if (this.score <= 0.4) return SentimentType.NEGATIVE;
    return SentimentType.NEUTRAL;
  }

  /**
   * 获取情感强度值
   * @returns 0-1之间的强度值，距离中性点(0.5)越远强度越高
   */
  getSentimentIntensity(): number {
    // 计算距离中性点(0.5)的距离，然后乘以2得到0-1的强度值
    return Math.abs(this.score - 0.5) * 2;
  }

  /**
   * 获取情感强度等级
   * @returns 强度等级：low, medium, high
   */
  getIntensityLevel(): 'low' | 'medium' | 'high' {
    const intensity = this.getSentimentIntensity();
    if (intensity >= 0.7) return 'high';
    if (intensity >= 0.4) return 'medium';
    return 'low';
  }

  /**
   * 获取情感描述
   */
  getSentimentDescription(): string {
    const type = this.getSentimentType();
    const level = this.getIntensityLevel();

    const descriptions = {
      positive: {
        high: '非常正面',
        medium: '比较正面',
        low: '轻微正面',
      },
      negative: {
        high: '非常负面',
        medium: '比较负面',
        low: '轻微负面',
      },
      neutral: {
        high: '中性',
        medium: '中性',
        low: '中性',
      },
    };

    return descriptions[type][level];
  }

  /**
   * 判断是否为正面情感
   */
  isPositive(): boolean {
    return this.getSentimentType() === SentimentType.POSITIVE;
  }

  /**
   * 判断是否为负面情感
   */
  isNegative(): boolean {
    return this.getSentimentType() === SentimentType.NEGATIVE;
  }

  /**
   * 判断是否为中性情感
   */
  isNeutral(): boolean {
    return this.getSentimentType() === SentimentType.NEUTRAL;
  }

  /**
   * 判断是否为高强度情感
   */
  isHighIntensity(): boolean {
    return this.getIntensityLevel() === 'high';
  }

  /**
   * 判断是否为中等强度情感
   */
  isMediumIntensity(): boolean {
    return this.getIntensityLevel() === 'medium';
  }

  /**
   * 判断是否为低强度情感
   */
  isLowIntensity(): boolean {
    return this.getIntensityLevel() === 'low';
  }
}
