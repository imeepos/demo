import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 地理坐标接口
 * 定义经纬度坐标的数据结构
 */
export interface GeoCoordinate {
  /** 纬度 */
  lat: number;
  /** 经度 */
  lng: number;
}

/**
 * 舆情事件数据传输对象
 * 包含舆情事件的完整信息，用于前后端数据交互
 */
export interface SentimentEventDto {
  /** 事件唯一标识符 */
  id: string;
  /** 事件标题 */
  title: string;
  /** 事件详细内容描述 */
  content: string;
  /** 情感倾向：positive(正面)、negative(负面)、neutral(中性) */
  sentiment: 'positive' | 'negative' | 'neutral';
  /** 情感分数，范围通常为-1到1，负数表示负面情感 */
  score: number;
  /** 事件发生的地理位置坐标 */
  location: GeoCoordinate;
  /** 事件发生的具体地址描述 */
  address: string;
  /** 信息来源媒体或平台 */
  source: string;
  /** 事件发生的时间戳 */
  timestamp: string;
  /** 事件热度值，数值越高表示关注度越高 */
  hotness: number;
  /** 事件相关标签，可选字段 */
  tags?: string[];
}

/**
 * 舆情统计指标数据传输对象
 * 包含舆情分析的各项统计数据和比例信息
 */
export interface SentimentMetricsDto {
  /** 总事件数量 */
  totalPosts: number;
  /** 正面情感事件占比（百分比） */
  positiveRatio: number;
  /** 负面情感事件占比（百分比） */
  negativeRatio: number;
  /** 中性情感事件占比（百分比） */
  neutralRatio: number;
  /** 正面情感事件总数 */
  totalPositive: number;
  /** 负面情感事件总数 */
  totalNegative: number;
  /** 中性情感事件总数 */
  totalNeutral: number;
}

/**
 * 热词数据传输对象
 * 包含热门词汇的统计信息和情感分析结果
 */
export interface HotWordDto {
  /** 词汇内容 */
  word: string;
  /** 词汇出现频次 */
  count: number;
  /** 词汇整体情感倾向：positive(正面)、negative(负面)、neutral(中性) */
  sentiment: 'positive' | 'negative' | 'neutral';
}

/**
 * 舆情表格展示数据传输对象
 * 用于表格组件显示的简化舆情事件信息
 */
export interface SentimentTableItemDto {
  /** 事件唯一标识符 */
  id: string;
  /** 事件标题 */
  title: string;
  /** 信息来源 */
  source: string;
  /** 情感倾向 */
  sentiment: 'positive' | 'negative' | 'neutral';
  /** 情感分数 */
  score: number;
  /** 事件时间 */
  time: string;
}

/**
 * Swagger 文档用的 Schema 类
 * 用于生成正确的 OpenAPI 文档
 */
export class GeoCoordinateSchema {
  @ApiProperty({ description: '纬度', example: 39.9042 })
  lat: number;

  @ApiProperty({ description: '经度', example: 116.4074 })
  lng: number;
}

export class SentimentEventSchema {
  @ApiProperty({ description: '事件唯一标识符', example: 'event-001' })
  id: string;

  @ApiProperty({ description: '事件标题', example: '某地发生重大新闻事件' })
  title: string;

  @ApiProperty({
    description: '事件详细内容描述',
    example: '详细描述了事件的经过和影响...',
  })
  content: string;

  @ApiProperty({
    description: '情感倾向：positive(正面)、negative(负面)、neutral(中性)',
    enum: ['positive', 'negative', 'neutral'],
    example: 'positive',
  })
  sentiment: 'positive' | 'negative' | 'neutral';

  @ApiProperty({
    description: '情感分数，范围通常为-1到1，负数表示负面情感',
    example: 0.75,
  })
  score: number;

  @ApiProperty({
    description: '事件发生的地理位置坐标',
    type: GeoCoordinateSchema,
  })
  location: GeoCoordinate;

  @ApiProperty({
    description: '事件发生的具体地址描述',
    example: '北京市朝阳区某街道',
  })
  address: string;

  @ApiProperty({ description: '信息来源媒体或平台', example: '新浪微博' })
  source: string;

  @ApiProperty({
    description: '事件发生的时间戳',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp: string;

  @ApiProperty({
    description: '事件热度值，数值越高表示关注度越高',
    example: 85,
  })
  hotness: number;

  @ApiPropertyOptional({
    description: '事件相关标签',
    type: [String],
    example: ['社会', '热点'],
  })
  tags?: string[];
}

export class SentimentMetricsSchema {
  @ApiProperty({ description: '总事件数量', example: 1000 })
  totalPosts: number;

  @ApiProperty({ description: '正面情感事件占比（百分比）', example: 45.5 })
  positiveRatio: number;

  @ApiProperty({ description: '负面情感事件占比（百分比）', example: 25.3 })
  negativeRatio: number;

  @ApiProperty({ description: '中性情感事件占比（百分比）', example: 29.2 })
  neutralRatio: number;

  @ApiProperty({ description: '正面情感事件总数', example: 455 })
  totalPositive: number;

  @ApiProperty({ description: '负面情感事件总数', example: 253 })
  totalNegative: number;

  @ApiProperty({ description: '中性情感事件总数', example: 292 })
  totalNeutral: number;
}

export class HotWordSchema {
  @ApiProperty({ description: '词汇内容', example: '经济发展' })
  word: string;

  @ApiProperty({ description: '词汇出现频次', example: 156 })
  count: number;

  @ApiProperty({
    description:
      '词汇整体情感倾向：positive(正面)、negative(负面)、neutral(中性)',
    enum: ['positive', 'negative', 'neutral'],
    example: 'positive',
  })
  sentiment: 'positive' | 'negative' | 'neutral';
}

export class SentimentTableItemSchema {
  @ApiProperty({ description: '事件唯一标识符', example: 'event-001' })
  id: string;

  @ApiProperty({ description: '事件标题', example: '某地发生重大新闻事件' })
  title: string;

  @ApiProperty({ description: '信息来源', example: '新浪微博' })
  source: string;

  @ApiProperty({
    description: '情感倾向',
    enum: ['positive', 'negative', 'neutral'],
    example: 'positive',
  })
  sentiment: 'positive' | 'negative' | 'neutral';

  @ApiProperty({ description: '情感分数', example: 0.75 })
  score: number;

  @ApiProperty({ description: '事件时间', example: '2024-01-15 10:30:00' })
  time: string;
}
