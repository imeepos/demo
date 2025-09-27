/**
 * UI展示页面模拟数据
 * 职责：为组件展示提供真实的测试数据
 */

import type {
  SentimentData,
  TrendData,
  RegionData,
  AlertData,
  EventTypeData,
  MediaTypeData,
} from '../types/showcase';

export const mockSentimentData: SentimentData[] = [
  {
    id: '1',
    content: '新版舆情监控系统界面设计简洁美观，功能强大易用',
    sentiment: 'positive',
    score: 0.85,
    confidence: 0.92,
    source: 'weibo',
    author: '用户A',
    publishTime: '2024-01-15 10:30:00',
    keywords: ['界面设计', '功能强大', '易用'],
    region: '北京',
    urgency: 'low',
    status: 'completed',
  },
  {
    id: '2',
    content: '系统响应速度太慢，需要优化性能',
    sentiment: 'negative',
    score: -0.65,
    confidence: 0.88,
    source: 'forum',
    author: '用户B',
    publishTime: '2024-01-15 14:20:00',
    keywords: ['响应速度', '性能优化'],
    region: '上海',
    urgency: 'high',
    status: 'alert',
  },
  {
    id: '3',
    content: '舆情分析报告数据准确，为决策提供了有力支持',
    sentiment: 'positive',
    score: 0.78,
    confidence: 0.95,
    source: 'news',
    author: '媒体记者',
    publishTime: '2024-01-15 16:45:00',
    keywords: ['数据准确', '决策支持', '分析报告'],
    region: '广州',
    urgency: 'medium',
    status: 'processing',
  },
];

export const mockTrendData: TrendData[] = [
  { date: '2024-01-01', positive: 120, negative: 45, neutral: 80, total: 245 },
  { date: '2024-01-02', positive: 135, negative: 38, neutral: 92, total: 265 },
  { date: '2024-01-03', positive: 150, negative: 52, neutral: 88, total: 290 },
  { date: '2024-01-04', positive: 145, negative: 41, neutral: 95, total: 281 },
  { date: '2024-01-05', positive: 160, negative: 35, neutral: 105, total: 300 },
  { date: '2024-01-06', positive: 175, negative: 48, neutral: 112, total: 335 },
  { date: '2024-01-07', positive: 165, negative: 43, neutral: 98, total: 306 },
];

export const mockRegionData: RegionData[] = [
  {
    region: '北京',
    count: 1250,
    sentiment: 0.72,
    coordinates: [116.4074, 39.9042],
  },
  {
    region: '上海',
    count: 980,
    sentiment: 0.68,
    coordinates: [121.4737, 31.2304],
  },
  {
    region: '广州',
    count: 765,
    sentiment: 0.75,
    coordinates: [113.2644, 23.1291],
  },
  {
    region: '深圳',
    count: 690,
    sentiment: 0.78,
    coordinates: [114.0579, 22.5431],
  },
  {
    region: '杭州',
    count: 520,
    sentiment: 0.71,
    coordinates: [120.2038, 30.2588],
  },
];

export const mockAlertData: AlertData[] = [
  {
    id: 'alert1',
    title: '负面情绪激增',
    level: 'error',
    message: '过去1小时内负面评论增长150%，需要立即关注',
    timestamp: '2024-01-15 15:30:00',
    isRead: false,
    category: 'sentiment',
  },
  {
    id: 'alert2',
    title: '热词异常',
    level: 'warning',
    message: '新出现热词"系统崩溃"，建议检查相关情况',
    timestamp: '2024-01-15 14:45:00',
    isRead: false,
    category: 'keyword',
  },
  {
    id: 'alert3',
    title: '数据源异常',
    level: 'critical',
    message: '微博数据采集中断，影响实时监控',
    timestamp: '2024-01-15 13:20:00',
    isRead: true,
    category: 'source',
  },
];

export const mockEventTypes: EventTypeData[] = [
  {
    id: 'event1',
    name: '产品发布',
    description: '新产品或服务发布相关事件',
    color: '#10b981',
    count: 156,
    isActive: true,
  },
  {
    id: 'event2',
    name: '危机公关',
    description: '企业危机公关处理事件',
    color: '#ef4444',
    count: 23,
    isActive: true,
  },
  {
    id: 'event3',
    name: '市场活动',
    description: '营销推广活动相关事件',
    color: '#3b82f6',
    count: 89,
    isActive: false,
  },
];

export const mockMediaTypes: MediaTypeData[] = [
  {
    id: 'media1',
    name: '微博',
    icon: 'MessageCircle',
    count: 2340,
    percentage: 45.2,
    trend: 'up',
  },
  {
    id: 'media2',
    name: '微信',
    icon: 'MessageSquare',
    count: 1890,
    percentage: 36.5,
    trend: 'stable',
  },
  {
    id: 'media3',
    name: '新闻',
    icon: 'Newspaper',
    count: 567,
    percentage: 11.0,
    trend: 'down',
  },
  {
    id: 'media4',
    name: '论坛',
    icon: 'Users',
    count: 378,
    percentage: 7.3,
    trend: 'up',
  },
];
