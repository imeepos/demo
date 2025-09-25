import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import type {
  HotWordDto,
  SentimentEventDto,
  SentimentMetricsDto,
  SentimentTableItemDto,
} from './dto/sentiment-event.dto';
import {
  HotWordSchema,
  SentimentEventSchema,
  SentimentMetricsSchema,
  SentimentTableItemSchema,
} from './dto/sentiment-event.dto';
import { SentimentService } from './sentiment.service';

/**
 * 舆情分析控制器
 * 负责处理舆情相关的API请求，为前端提供数据接口
 */
@ApiTags('sentiment')
@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  /**
   * 获取所有舆情事件
   * GET /api/sentiment/events
   * @returns 舆情事件列表
   */
  @Get('events')
  @ApiOperation({
    summary: '获取所有舆情事件',
    description:
      '获取系统中所有舆情事件的完整列表，包含事件详情、地理位置、情感分析结果等信息',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取舆情事件列表',
    type: [SentimentEventSchema],
  })
  getAllEvents(): SentimentEventDto[] {
    return this.sentimentService.getAllEvents();
  }

  /**
   * 根据ID获取单个舆情事件
   * GET /api/sentiment/events/:id
   * @param id 事件ID
   * @returns 舆情事件详情或undefined
   */
  @Get('events/:id')
  @ApiOperation({
    summary: '根据ID获取单个舆情事件',
    description: '根据事件唯一标识符获取特定舆情事件的详细信息',
  })
  @ApiParam({
    name: 'id',
    description: '舆情事件的唯一标识符',
    example: 'event-001',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取舆情事件详情',
    type: SentimentEventSchema,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的舆情事件',
  })
  getEventById(@Param('id') id: string): SentimentEventDto | undefined {
    return this.sentimentService.getEventById(id);
  }

  /**
   * 获取舆情统计指标
   * GET /api/sentiment/metrics
   * @returns 包含正面、负面、中性情感比例等统计数据
   */
  @Get('metrics')
  @ApiOperation({
    summary: '获取舆情统计指标',
    description:
      '获取舆情分析的统计数据，包含正面、负面、中性情感的数量和比例信息',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取舆情统计指标',
    type: SentimentMetricsSchema,
  })
  getMetrics(): SentimentMetricsDto {
    return this.sentimentService.getMetrics();
  }

  /**
   * 获取热点词汇数据
   * GET /api/sentiment/hotwords
   * @returns 热词列表，包含词汇频次和情感倾向
   */
  @Get('hotwords')
  @ApiOperation({
    summary: '获取热点词汇数据',
    description: '获取当前热门词汇的统计信息，包含词汇出现频次和整体情感倾向',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取热点词汇数据',
    type: [HotWordSchema],
  })
  getHotWords(): HotWordDto[] {
    return this.sentimentService.getHotWords();
  }

  /**
   * 获取舆情表格显示数据
   * GET /api/sentiment/table
   * @returns 适用于表格展示的舆情数据
   */
  @Get('table')
  @ApiOperation({
    summary: '获取舆情表格显示数据',
    description: '获取适合在表格中展示的简化舆情数据，包含关键信息字段',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取舆情表格数据',
    type: [SentimentTableItemSchema],
  })
  getSentimentTableData(): SentimentTableItemDto[] {
    return this.sentimentService.getSentimentTableData();
  }
}
