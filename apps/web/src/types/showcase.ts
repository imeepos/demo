/**
 * UI展示页面数据类型定义
 * 职责：为组件展示提供标准化的数据结构
 */

export interface SentimentData {
  id: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
  source: 'weibo' | 'wechat' | 'news' | 'forum' | 'douyin';
  author: string;
  publishTime: string;
  keywords: string[];
  region: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'processing' | 'completed' | 'alert';
}

export interface TrendData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface RegionData {
  region: string;
  count: number;
  sentiment: number;
  coordinates: [number, number];
}

export interface AlertData {
  id: string;
  title: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  isRead: boolean;
  category: 'sentiment' | 'volume' | 'keyword' | 'source';
}

export interface EventTypeData {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
  isActive: boolean;
}

export interface MediaTypeData {
  id: string;
  name: string;
  icon: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ShowcaseSection {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'business' | 'complex' | 'layout';
}

export interface SearchFilters {
  keyword: string;
  sentiment: string[];
  source: string[];
  dateRange: [Date, Date] | null;
  region: string[];
  urgency: string[];
}
