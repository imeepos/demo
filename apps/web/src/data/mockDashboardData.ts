import { useState, useEffect } from 'react';

/**
 * 舆情监控大屏模拟数据生成器
 * 提供各种图表和组件所需的模拟数据，支持 Tremor 和 G2Plot 组件
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

// 时间序列数据接口
export interface TimeSeriesData {
  time: string;
  value: number;
  type: string;
}

// 情感趋势数据接口
export interface SentimentTrendData {
  time: string;
  positive: number;
  neutral: number;
  negative: number;
}

// 热点话题数据接口（用于图表）
export interface HotTopicData {
  topic: string;
  count: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

// 地理分布数据接口
export interface GeographicData {
  region: string;
  value: number;
  latitude: number;
  longitude: number;
}

// 系统性能指标接口
export interface SystemMetricData {
  name: string;
  value: number;
  status: 'good' | 'warning' | 'error';
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

// 生成时间序列数据（24小时）
export const generateTimeSeriesData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  const types = ['数据采集', '情感分析', '实时推送'];

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const timeStr = time.getHours().toString().padStart(2, '0') + ':00';

    types.forEach(type => {
      data.push({
        time: timeStr,
        value: randomBetween(100, 1000),
        type,
      });
    });
  }

  return data;
};

// 生成情感趋势数据（24小时）
export const generateSentimentTrendData = (): SentimentTrendData[] => {
  const data: SentimentTrendData[] = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const timeStr = time.getHours().toString().padStart(2, '0') + ':00';

    const positive = randomBetween(200, 800);
    const negative = randomBetween(50, 200);
    const neutral = randomBetween(100, 400);

    data.push({
      time: timeStr,
      positive,
      neutral,
      negative,
    });
  }

  return data;
};

// 生成热点话题数据（用于图表）
export const generateHotTopicsData = (): HotTopicData[] => {
  const topics = [
    '人工智能发展',
    '数字化转型',
    '智能制造',
    '新能源技术',
    '5G应用创新',
    '云计算服务',
    '大数据分析',
    '物联网应用',
    '区块链技术',
    '智慧城市建设',
  ];

  const sentiments: Array<'positive' | 'neutral' | 'negative'> = [
    'positive',
    'neutral',
    'negative',
  ];

  return topics
    .map(topic => ({
      topic,
      count: randomBetween(500, 5000),
      sentiment: sentiments[randomBetween(0, sentiments.length - 1)],
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
};

// 生成地理分布数据
export const generateGeographicData = (): GeographicData[] => {
  const regions = [
    { name: '北京', lat: 39.9042, lng: 116.4074 },
    { name: '上海', lat: 31.2304, lng: 121.4737 },
    { name: '广州', lat: 23.1291, lng: 113.2644 },
    { name: '深圳', lat: 22.3193, lng: 114.1694 },
    { name: '杭州', lat: 30.2741, lng: 120.1551 },
    { name: '成都', lat: 30.5728, lng: 104.0668 },
    { name: '西安', lat: 34.3416, lng: 108.9398 },
    { name: '武汉', lat: 30.5844, lng: 114.2998 },
  ];

  return regions
    .map(region => ({
      region: region.name,
      value: randomBetween(1000, 8000),
      latitude: region.lat,
      longitude: region.lng,
    }))
    .sort((a, b) => b.value - a.value);
};

// 生成系统性能指标数据
export const generateSystemMetricsData = (): SystemMetricData[] => {
  const metrics = [
    '数据采集引擎',
    '情感分析服务',
    '实时计算集群',
    '存储系统',
    'API网关',
    '消息队列',
  ];

  return metrics.map(name => {
    const value = randomBetween(60, 100);
    let status: 'good' | 'warning' | 'error' = 'good';

    if (value < 70) status = 'error';
    else if (value < 85) status = 'warning';

    return { name, value, status };
  });
};
