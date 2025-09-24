import { Controller, Get, Param } from '@nestjs/common';
import type {
  HotWordDto,
  SentimentEventDto,
  SentimentMetricsDto,
  SentimentTableItemDto,
} from './dto/sentiment-event.dto';
import { SentimentService } from './sentiment.service';

/**
 * 舆情分析控制器
 * 负责处理舆情相关的API请求，为前端提供数据接口
 */
@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  /**
   * 获取所有舆情事件
   * GET /api/sentiment/events
   * @returns 舆情事件列表
   */
  @Get('events')
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
  getEventById(@Param('id') id: string): SentimentEventDto | undefined {
    return this.sentimentService.getEventById(id);
  }

  /**
   * 获取舆情统计指标
   * GET /api/sentiment/metrics
   * @returns 包含正面、负面、中性情感比例等统计数据
   */
  @Get('metrics')
  getMetrics(): SentimentMetricsDto {
    return this.sentimentService.getMetrics();
  }

  /**
   * 获取热点词汇数据
   * GET /api/sentiment/hotwords
   * @returns 热词列表，包含词汇频次和情感倾向
   */
  @Get('hotwords')
  getHotWords(): HotWordDto[] {
    return this.sentimentService.getHotWords();
  }

  /**
   * 获取舆情表格显示数据
   * GET /api/sentiment/table
   * @returns 适用于表格展示的舆情数据
   */
  @Get('table')
  getSentimentTableData(): SentimentTableItemDto[] {
    return this.sentimentService.getSentimentTableData();
  }
}
