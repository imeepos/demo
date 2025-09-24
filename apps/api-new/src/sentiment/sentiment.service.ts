import { Injectable } from '@nestjs/common';
import {
  HotWordDto,
  SentimentEventDto,
  SentimentMetricsDto,
  SentimentTableItemDto,
} from './dto/sentiment-event.dto';

/**
 * 舆情分析服务类
 * 提供舆情数据的核心业务逻辑，包括事件管理、统计分析等功能
 */
@Injectable()
export class SentimentService {
  /**
   * 模拟的舆情事件数据
   * 包含不同地区、不同情感倾向的舆情事件样本数据
   */
  private readonly mockEvents: SentimentEventDto[] = [
    {
      id: '1',
      title: '北京新技术发布会获得热烈反响',
      content:
        '某科技公司在北京举办的新产品发布会获得业界广泛关注，用户反馈积极',
      sentiment: 'positive',
      score: 0.85,
      location: { lat: 39.9042, lng: 116.4074 },
      address: '北京市朝阳区',
      source: '科技日报',
      timestamp: '2024-01-24 14:30',
      hotness: 8,
      tags: ['科技', '产品发布', '创新'],
    },
    {
      id: '2',
      title: '上海某服务平台系统故障影响用户体验',
      content:
        '上海一家互联网公司的服务平台出现技术故障，导致部分用户无法正常使用',
      sentiment: 'negative',
      score: -0.72,
      location: { lat: 31.2304, lng: 121.4737 },
      address: '上海市浦东新区',
      source: '澎湃新闻',
      timestamp: '2024-01-24 13:45',
      hotness: 6,
      tags: ['故障', '用户体验', '技术'],
    },
    {
      id: '3',
      title: '深圳智能制造展览会开幕',
      content: '第十五届深圳国际智能制造展览会正式开幕，展示最新工业4.0技术',
      sentiment: 'neutral',
      score: 0.15,
      location: { lat: 22.3193, lng: 114.1694 },
      address: '深圳市福田区',
      source: '深圳特区报',
      timestamp: '2024-01-24 12:00',
      hotness: 5,
      tags: ['展览会', '智能制造', '工业4.0'],
    },
    {
      id: '4',
      title: '广州美食节引发全民热议',
      content: '广州国际美食节吸引众多市民和游客参与，社交媒体上好评如潮',
      sentiment: 'positive',
      score: 0.78,
      location: { lat: 23.1291, lng: 113.2644 },
      address: '广州市天河区',
      source: '南方日报',
      timestamp: '2024-01-24 11:30',
      hotness: 7,
      tags: ['美食节', '文化', '旅游'],
    },
  ];

  /**
   * 模拟的热词数据
   * 包含各类热门词汇的统计信息和情感倾向分析
   */
  private readonly mockHotWords: HotWordDto[] = [
    { word: '创新技术', count: 156, sentiment: 'positive' },
    { word: '用户体验', count: 134, sentiment: 'positive' },
    { word: '系统故障', count: 89, sentiment: 'negative' },
    { word: '服务优化', count: 78, sentiment: 'positive' },
    { word: '网络延迟', count: 67, sentiment: 'negative' },
    { word: '界面设计', count: 56, sentiment: 'neutral' },
    { word: '功能更新', count: 45, sentiment: 'positive' },
    { word: 'Bug修复', count: 34, sentiment: 'neutral' },
  ];

  /**
   * 获取所有舆情事件
   * @returns 返回完整的舆情事件列表
   */
  getAllEvents(): SentimentEventDto[] {
    return this.mockEvents;
  }

  /**
   * 根据ID获取单个舆情事件
   * @param id 事件唯一标识符
   * @returns 找到的舆情事件对象，如果不存在则返回undefined
   */
  getEventById(id: string): SentimentEventDto | undefined {
    return this.mockEvents.find((event) => event.id === id);
  }

  /**
   * 计算舆情统计指标
   * 分析所有事件的情感分布，计算各类情感的数量和占比
   * @returns 包含总数、各情感类型统计和占比的指标数据
   */
  getMetrics(): SentimentMetricsDto {
    // 计算事件总数
    const totalPosts = this.mockEvents.length;
    // 统计正面情感事件数量
    const totalPositive = this.mockEvents.filter(
      (e) => e.sentiment === 'positive',
    ).length;
    // 统计负面情感事件数量
    const totalNegative = this.mockEvents.filter(
      (e) => e.sentiment === 'negative',
    ).length;
    // 统计中性情感事件数量
    const totalNeutral = this.mockEvents.filter(
      (e) => e.sentiment === 'neutral',
    ).length;

    return {
      totalPosts,
      positiveRatio: Number(((totalPositive / totalPosts) * 100).toFixed(1)),
      negativeRatio: Number(((totalNegative / totalPosts) * 100).toFixed(1)),
      neutralRatio: Number(((totalNeutral / totalPosts) * 100).toFixed(1)),
      totalPositive,
      totalNegative,
      totalNeutral,
    };
  }

  /**
   * 获取热点词汇数据
   * @returns 返回按热度排序的热词列表，包含词汇频次和情感分析
   */
  getHotWords(): HotWordDto[] {
    return this.mockHotWords;
  }

  /**
   * 获取适用于表格展示的舆情数据
   * 将完整事件数据转换为表格所需的简化格式
   * @returns 格式化后的表格数据数组，包含关键展示字段
   */
  getSentimentTableData(): SentimentTableItemDto[] {
    return this.mockEvents.map((event) => ({
      id: event.id,
      title: event.title,
      source: event.source,
      sentiment: event.sentiment,
      score: event.score,
      time: event.timestamp,
    }));
  }
}
