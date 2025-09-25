import { useState, useEffect } from 'react';

/**
 * Dashboard 模拟数据
 * 为舆情监控大屏提供测试数据
 */

export interface DashboardMetrics {
  totalData: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  trends: {
    total: string;
    positive: string;
    neutral: string;
    negative: string;
  };
}

export interface SystemStatus {
  dataCollection: number;
  sentimentAnalysis: number;
  realTimePush: number;
  backupService: number;
}

export interface SentimentIntensity {
  veryPositive: number;
  positive: number;
  neutral: number;
  negative: number;
  veryNegative: number;
}

export interface HotTopic {
  text: string;
  weight: number;
  category: 'technology' | 'society' | 'economy' | 'politics';
}

// 生成随机数据的工具函数
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, decimals: number = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// 生成实时变化的指标数据
export const generateDashboardMetrics = (): DashboardMetrics => {
  const total = randomBetween(2500, 3200);
  const positive = randomBetween(
    Math.floor(total * 0.5),
    Math.floor(total * 0.7)
  );
  const negative = randomBetween(
    Math.floor(total * 0.1),
    Math.floor(total * 0.2)
  );
  const neutral = total - positive - negative;

  return {
    totalData: total,
    positiveCount: positive,
    neutralCount: neutral,
    negativeCount: negative,
    trends: {
      total: `+${randomFloat(8, 15)}%`,
      positive: `+${randomFloat(5, 12)}%`,
      neutral: `±${randomFloat(1, 5)}%`,
      negative: `-${randomFloat(3, 8)}%`,
    },
  };
};

// 生成系统状态数据
export const generateSystemStatus = (): SystemStatus => ({
  dataCollection: randomFloat(95, 99, 1),
  sentimentAnalysis: randomFloat(85, 95, 1),
  realTimePush: randomFloat(90, 98, 1),
  backupService: randomFloat(0, 15, 1),
});

// 生成情感强度分布数据
export const generateSentimentIntensity = (): SentimentIntensity => {
  const veryPositive = randomFloat(0.8, 0.9, 2);
  const positive = randomFloat(0.6, 0.75, 2);
  const neutral = randomFloat(0.4, 0.55, 2);
  const negative = randomFloat(0.2, 0.35, 2);
  const veryNegative = randomFloat(0.08, 0.18, 2);

  return {
    veryPositive,
    positive,
    neutral,
    negative,
    veryNegative,
  };
};

// 热点话题数据
export const generateHotTopics = (): HotTopic[] => {
  const topics = [
    { text: '人工智能', category: 'technology' as const, baseWeight: 0.9 },
    { text: '科技创新', category: 'technology' as const, baseWeight: 0.85 },
    { text: '数字化转型', category: 'technology' as const, baseWeight: 0.8 },
    { text: '智能制造', category: 'technology' as const, baseWeight: 0.75 },
    { text: '云计算', category: 'technology' as const, baseWeight: 0.7 },
    { text: '大数据', category: 'technology' as const, baseWeight: 0.65 },
    { text: '区块链', category: 'technology' as const, baseWeight: 0.6 },
    { text: '5G技术', category: 'technology' as const, baseWeight: 0.55 },
    { text: '物联网', category: 'technology' as const, baseWeight: 0.5 },
    { text: '机器学习', category: 'technology' as const, baseWeight: 0.45 },
    { text: '深度学习', category: 'technology' as const, baseWeight: 0.4 },
    { text: '量子计算', category: 'technology' as const, baseWeight: 0.35 },
    { text: '网络安全', category: 'technology' as const, baseWeight: 0.3 },
    { text: '新能源汽车', category: 'technology' as const, baseWeight: 0.25 },
    { text: '绿色发展', category: 'society' as const, baseWeight: 0.2 },
  ];

  return topics.map(topic => ({
    ...topic,
    weight: topic.baseWeight + randomFloat(-0.1, 0.1, 2),
  }));
};

// 实时性能指标
export interface PerformanceMetrics {
  dataGrowthRate: string;
  serviceAvailability: string;
  avgResponseTime: string;
  trendIcons: {
    growth: string;
    availability: string;
    response: string;
  };
}

export const generatePerformanceMetrics = (): PerformanceMetrics => ({
  dataGrowthRate: `+${randomFloat(12, 18, 1)}%`,
  serviceAvailability: `${randomFloat(90, 99, 1)}%`,
  avgResponseTime: `${randomFloat(2.0, 3.5, 1)}s`,
  trendIcons: {
    growth: '📈',
    availability: '✅',
    response: '⏱',
  },
});

// 创建静态 mock 数据实例
export const mockDashboardData = {
  metrics: generateDashboardMetrics(),
  systemStatus: generateSystemStatus(),
  sentimentIntensity: generateSentimentIntensity(),
  hotTopics: generateHotTopics(),
  performance: generatePerformanceMetrics(),
};

// 定时更新数据的钩子（可选）
export const useRealtimeDashboardData = (intervalMs: number = 5000) => {
  const [data, setData] = useState(mockDashboardData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        metrics: generateDashboardMetrics(),
        systemStatus: generateSystemStatus(),
        sentimentIntensity: generateSentimentIntensity(),
        hotTopics: generateHotTopics(),
        performance: generatePerformanceMetrics(),
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return data;
};
