import { forwardRef } from 'react';
import type {
  MetricCardVariants,
  MetricValueVariants,
} from '../../lib/dashboard-variants';
import {
  MetricCard as BaseMetricCard,
  MetricLabel,
  MetricValue,
  TrendIndicator,
} from './DashboardComponents';

interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    MetricCardVariants {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  valueVariant?: MetricValueVariants['variant'];
}

/**
 * 指标卡片组件 (重构版)
 * 基于 Tailwind CSS 变体系统实现
 * 职责：展示单个核心指标数据，支持多种样式变体
 */
export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      title,
      value,
      trend,
      trendValue,
      icon,
      valueVariant = 'primary',
      className,
      ...props
    },
    ref
  ) => {
    const getTrendIcon = () => {
      switch (trend) {
        case 'up':
          return '↗';
        case 'down':
          return '↘';
        case 'neutral':
        default:
          return '→';
      }
    };

    return (
      <BaseMetricCard ref={ref} className={className} {...props}>
        <div className="flex items-center justify-center mb-3">
          {icon && <span className="mr-2 text-muted-foreground">{icon}</span>}
          <MetricLabel>{title}</MetricLabel>
        </div>

        <MetricValue variant={valueVariant}>{value}</MetricValue>

        {trend && trendValue && (
          <TrendIndicator
            trend={trend}
            value={trendValue}
            icon={<span>{getTrendIcon()}</span>}
          />
        )}
      </BaseMetricCard>
    );
  }
);
MetricCard.displayName = 'MetricCard';
