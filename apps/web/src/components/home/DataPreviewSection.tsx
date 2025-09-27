import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Lightbulb,
  Sparkles,
  Target,
  Activity,
  LucideIcon,
} from 'lucide-react';
import {
  DashboardCard,
  MetricCard,
  MetricLabel,
  MetricValue,
  ChartContainer,
} from '../dashboard/DashboardComponents';
import {
  mockDashboardData,
  generateDashboardMetrics,
} from '../../data/mockDashboardData';
import { cn } from '@sker/ui';

// ==================== 数据指标配置 ====================

type MetricType = 'total' | 'positive' | 'neutral' | 'negative';
type MetricVariant = 'primary' | 'accent' | 'amber' | 'red';

interface MetricConfig {
  readonly type: MetricType;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly variant: MetricVariant;
  readonly gradientFrom: string;
  readonly gradientTo: string;
  readonly borderColor: string;
  readonly hoverBorder: string;
  readonly hoverShadow: string;
  readonly iconBg: string;
  readonly labelColor: string;
  readonly valueColor: string;
  readonly trendColor: string;
  readonly bgGradient: string;
  readonly hoverGradient: string;
}

const METRIC_CONFIGS: readonly MetricConfig[] = [
  {
    type: 'total',
    label: '总监控数据',
    icon: BarChart3,
    variant: 'primary',
    gradientFrom: 'from-primary-50',
    gradientTo: 'to-primary-100/60',
    borderColor: 'border-primary-200/80',
    hoverBorder: 'hover:border-primary-300',
    hoverShadow: 'hover:shadow-primary/10',
    iconBg: 'from-primary-500 to-primary-600',
    labelColor: 'text-primary-700',
    valueColor: 'text-primary-800',
    trendColor: 'text-primary-600',
    bgGradient: 'from-primary-500/8',
    hoverGradient: 'group-hover:opacity-100',
  },
  {
    type: 'positive',
    label: '正面情感',
    icon: TrendingUp,
    variant: 'accent',
    gradientFrom: 'from-accent-50/80',
    gradientTo: 'to-accent-100/50',
    borderColor: 'border-accent-200/80',
    hoverBorder: 'hover:border-accent-300',
    hoverShadow: 'hover:shadow-accent/10',
    iconBg: 'from-accent-500 to-accent-600',
    labelColor: 'text-accent-700',
    valueColor: 'text-accent-800',
    trendColor: 'text-accent-600',
    bgGradient: 'from-accent-500/8',
    hoverGradient: 'group-hover:opacity-100',
  },
  {
    type: 'neutral',
    label: '中性情感',
    icon: Activity,
    variant: 'amber',
    gradientFrom: 'from-amber-50/80',
    gradientTo: 'to-amber-100/50',
    borderColor: 'border-amber-200/80',
    hoverBorder: 'hover:border-amber-300',
    hoverShadow: 'hover:shadow-amber/10',
    iconBg: 'from-amber-500 to-amber-600',
    labelColor: 'text-amber-700',
    valueColor: 'text-amber-800',
    trendColor: 'text-amber-600',
    bgGradient: 'from-amber-500/8',
    hoverGradient: 'group-hover:opacity-100',
  },
  {
    type: 'negative',
    label: '负面情感',
    icon: TrendingUp,
    variant: 'red',
    gradientFrom: 'from-red-50/80',
    gradientTo: 'to-red-100/50',
    borderColor: 'border-red-200/80',
    hoverBorder: 'hover:border-red-300',
    hoverShadow: 'hover:shadow-red/10',
    iconBg: 'from-red-500 to-red-600',
    labelColor: 'text-red-700',
    valueColor: 'text-red-800',
    trendColor: 'text-red-600',
    bgGradient: 'from-red-500/8',
    hoverGradient: 'group-hover:opacity-100',
  },
] as const;

const getMetricValue = (metrics: any, type: MetricType): number => {
  const valueMap = {
    total: metrics.totalData,
    positive: metrics.positiveCount,
    neutral: metrics.neutralCount,
    negative: metrics.negativeCount,
  };
  return valueMap[type];
};

const getTrendValue = (metrics: any, type: MetricType): string => {
  const trendMap = {
    total: metrics.trends.total,
    positive: metrics.trends.positive,
    neutral: metrics.trends.neutral,
    negative: metrics.trends.negative,
  };
  return trendMap[type];
};

const getTrendDirection = (type: MetricType): 'up' | 'down' | 'neutral' => {
  return type === 'negative' ? 'down' : type === 'neutral' ? 'neutral' : 'up';
};

// ==================== 热点话题配置 ====================

const HOT_TOPICS = [
  '人工智能',
  '数字化转型',
  '新能源汽车',
  '元宇宙',
  '智能制造',
  '碳中和',
  '区块链',
  '5G应用',
] as const;

const TOPIC_GRADIENT_COLORS = [
  'bg-gradient-to-r from-primary-500 to-primary-600',
  'bg-gradient-to-r from-accent-500 to-accent-600',
  'bg-gradient-to-r from-blue-500 to-blue-600',
  'bg-gradient-to-r from-emerald-500 to-emerald-600',
] as const;

/**
 * 现代化首页实时数据预览区域
 *
 * 设计理念：
 * - 专业图标系统替代emoji
 * - 实时数据可视化
 * - 优雅的色彩层次
 * - 流畅的交互体验
 *
 * @author SKER Team
 * @version 2.0.0
 */
export function DataPreviewSection() {
  const [metrics, setMetrics] = useState(mockDashboardData.metrics);
  const [isUpdating, setIsUpdating] = useState(false);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setMetrics(generateDashboardMetrics());
        setIsUpdating(false);
      }, 800);
    }, 15000); // 每15秒更新

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* 标题 */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-foreground">
            实时数据概览
          </h2>
        </div>
        <p className="text-base md:text-lg text-muted-foreground">
          全网监控数据实时更新，掌握舆情动态第一手资料
        </p>
      </div>

      {/* 核心指标 - 系统化设计 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {METRIC_CONFIGS.map(config => {
          const Icon = config.icon;
          const value = getMetricValue(metrics, config.type);
          const trendValue = getTrendValue(metrics, config.type);
          const trendDirection = getTrendDirection(config.type);

          return (
            <DashboardCard
              key={config.type}
              variant="primary"
              className={cn(
                'group relative overflow-hidden bg-gradient-to-br',
                config.gradientFrom,
                config.gradientTo,
                config.borderColor,
                config.hoverBorder,
                'transition-all duration-300 hover:shadow-lg',
                config.hoverShadow
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-r',
                  config.bgGradient,
                  'to-transparent opacity-0',
                  config.hoverGradient,
                  'transition-opacity duration-300'
                )}
              />
              <MetricCard variant="primary" className="relative z-10 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl bg-gradient-to-br',
                      config.iconBg,
                      'flex items-center justify-center text-white shadow-md'
                    )}
                  >
                    {config.type === 'neutral' ? (
                      <div className="w-5 h-1 bg-white rounded-full" />
                    ) : config.type === 'negative' ? (
                      <Icon className="h-5 w-5 rotate-180" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <MetricLabel
                    className={cn(config.labelColor, 'font-semibold text-sm')}
                  >
                    {config.label}
                  </MetricLabel>
                </div>
                <MetricValue
                  variant="primary"
                  className={cn(
                    config.valueColor,
                    'text-3xl md:text-4xl font-bold mb-2'
                  )}
                >
                  {value.toLocaleString()}
                </MetricValue>
              </MetricCard>
            </DashboardCard>
          );
        })}
      </div>

      {/* 热点话题词云 - 优化版设计 */}
      <DashboardCard
        size="lg"
        className="bg-gradient-to-br from-card via-primary-50/20 to-accent-50/15 border-primary-200/60 shadow-lg"
      >
        <ChartContainer
          title={
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span>热点话题实时监控</span>
            </div>
          }
          subtitle="基于全网数据智能分析 · 每小时自动更新"
          className="p-6"
        ></ChartContainer>
      </DashboardCard>

      {/* 底部状态与提示 - 优化版设计 */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>以上数据每15秒智能更新，全方位展示系统实时监控能力</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <span className="w-3 h-3 bg-gradient-to-r from-primary to-primary-600 rounded-full animate-pulse shadow-sm"></span>
            <span className="text-sm font-semibold text-primary">
              实时数据采集中
            </span>
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-full border border-accent/20">
            <span className="w-3 h-3 bg-gradient-to-r from-accent to-accent-600 rounded-full animate-pulse shadow-sm"></span>
            <span className="text-sm font-semibold text-accent">
              全网平台监控
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
