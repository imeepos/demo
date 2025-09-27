// 重构后的舆情监控大屏组件库
// 基于 Tailwind CSS 和 class-variance-authority 实现

export { DashboardCard } from './DashboardCard';
export { MetricCard } from './MetricCard';

// 新的组件系统
export {
  // 基础组件
  DashboardCard as BaseDashboardCard,
  MetricCard as BaseMetricCard,
  // 数据可视化组件
  ChartContainer,
  MetricLabel,
  MetricValue,
  ProgressBar,
} from './DashboardComponents';

// 样式变体类型
export type {
  ChartContainerVariants,
  DashboardCardVariants,
  IntensityBarVariants,
  IntensityFillVariants,
  LiveIndicatorVariants,
  MetricCardVariants,
  MetricValueVariants,
  ProgressBarVariants,
  ProgressFillVariants,
  SentimentBadgeVariants,
  StatusDotVariants,
  TrendIndicatorVariants,
  WordcloudTagVariants,
} from '../../lib/dashboard-variants';
