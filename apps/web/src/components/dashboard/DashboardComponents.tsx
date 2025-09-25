import { cn } from '@sker/ui';
import { forwardRef } from 'react';
import {
  chartContainerVariants,
  dashboardCardVariants,
  intensityBarVariants,
  intensityFillVariants,
  liveIndicatorVariants,
  metricCardVariants,
  metricValueVariants,
  progressBarVariants,
  progressFillVariants,
  sentimentBadgeVariants,
  statusDotVariants,
  trendIndicatorVariants,
  wordcloudTagVariants,
  type ChartContainerVariants,
  type DashboardCardVariants,
  type IntensityBarVariants,
  type IntensityFillVariants,
  type LiveIndicatorVariants,
  type MetricCardVariants,
  type MetricValueVariants,
  type ProgressBarVariants,
  type ProgressFillVariants,
  type SentimentBadgeVariants,
  type StatusDotVariants,
  type TrendIndicatorVariants,
  type WordcloudTagVariants,
} from '../../lib/dashboard-variants';

/**
 * 舆情监控大屏组件库
 * 基于 Tailwind CSS 和样式变体系统实现
 */

// 仪表盘卡片组件
interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement>, DashboardCardVariants {}

export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, size, variant, highlighted, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dashboardCardVariants({ size, variant, highlighted }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DashboardCard.displayName = 'DashboardCard';

// 指标卡片组件
interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement>, MetricCardVariants {}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(metricCardVariants({ variant, size }), className)} {...props}>
        {children}
      </div>
    );
  },
);
MetricCard.displayName = 'MetricCard';

// 指标数值组件
interface MetricValueProps extends React.HTMLAttributes<HTMLDivElement>, MetricValueVariants {}

export const MetricValue = forwardRef<HTMLDivElement, MetricValueProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(metricValueVariants({ size, variant }), className)} {...props}>
        {children}
      </div>
    );
  },
);
MetricValue.displayName = 'MetricValue';

// 指标标签组件
interface MetricLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MetricLabel = forwardRef<HTMLDivElement, MetricLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-muted-foreground text-sm font-medium', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
MetricLabel.displayName = 'MetricLabel';

// 趋势指示器组件
interface TrendIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    TrendIndicatorVariants {
  value?: string | number;
  icon?: React.ReactNode;
}

export const TrendIndicator = forwardRef<HTMLSpanElement, TrendIndicatorProps>(
  ({ className, trend, value, icon, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(trendIndicatorVariants({ trend }), className)} {...props}>
        {icon}
        {value && <span>{value}</span>}
        {children}
      </span>
    );
  },
);
TrendIndicator.displayName = 'TrendIndicator';

// 情感标签组件
interface SentimentBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    SentimentBadgeVariants {}

export const SentimentBadge = forwardRef<HTMLSpanElement, SentimentBadgeProps>(
  ({ className, sentiment, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(sentimentBadgeVariants({ sentiment }), className)} {...props}>
        {children}
      </span>
    );
  },
);
SentimentBadge.displayName = 'SentimentBadge';

// 情感强度条组件
interface IntensityBarProps extends React.HTMLAttributes<HTMLDivElement>, IntensityBarVariants {
  value: number; // 0-1
  intensity?: IntensityFillVariants['intensity'];
}

export const IntensityBar = forwardRef<HTMLDivElement, IntensityBarProps>(
  ({ className, size, value, intensity = 'neutral', ...props }, ref) => {
    const percentage = Math.max(0, Math.min(100, value * 100));

    return (
      <div ref={ref} className={cn(intensityBarVariants({ size }), className)} {...props}>
        <div
          className={cn(intensityFillVariants({ intensity }))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  },
);
IntensityBar.displayName = 'IntensityBar';

// 实时状态指示器组件
interface LiveIndicatorProps extends React.HTMLAttributes<HTMLSpanElement>, LiveIndicatorVariants {}

export const LiveIndicator = forwardRef<HTMLSpanElement, LiveIndicatorProps>(
  ({ className, status, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(liveIndicatorVariants({ status }), className)} {...props}>
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-live-pulse" />
        {children || 'LIVE'}
      </span>
    );
  },
);
LiveIndicator.displayName = 'LiveIndicator';

// 状态点组件
interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement>, StatusDotVariants {}

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, pulse, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(statusDotVariants({ status, pulse }), className)} {...props} />
    );
  },
);
StatusDot.displayName = 'StatusDot';

// 图表容器组件
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement>, ChartContainerVariants {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, size, pattern, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chartContainerVariants({ size, pattern }), className)}
        {...props}
      >
        {(title || subtitle || action) && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <div>
              {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);
ChartContainer.displayName = 'ChartContainer';

// 词云标签组件
interface WordcloudTagProps extends React.HTMLAttributes<HTMLSpanElement>, WordcloudTagVariants {}

export const WordcloudTag = forwardRef<HTMLSpanElement, WordcloudTagProps>(
  ({ className, variant, shine, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(wordcloudTagVariants({ variant, shine }), className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);
WordcloudTag.displayName = 'WordcloudTag';

// 进度条组件
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement>, ProgressBarVariants {
  value: number; // 0-100
  variant?: ProgressFillVariants['variant'];
  shine?: ProgressFillVariants['shine'];
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, size, value, variant = 'primary', shine = true, ...props }, ref) => {
    const percentage = Math.max(0, Math.min(100, value));

    return (
      <div ref={ref} className={cn(progressBarVariants({ size }), className)} {...props}>
        <div
          className={cn(progressFillVariants({ variant, shine }))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  },
);
ProgressBar.displayName = 'ProgressBar';

// 词云容器组件
interface WordcloudContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WordcloudContainer = forwardRef<HTMLDivElement, WordcloudContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap gap-2 p-4 items-center justify-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
WordcloudContainer.displayName = 'WordcloudContainer';
