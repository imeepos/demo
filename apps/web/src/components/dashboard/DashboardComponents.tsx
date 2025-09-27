import { cn } from '@sker/ui';
import { forwardRef, type ReactNode } from 'react';
import * as variants from '../../lib/dashboard-variants';

/**
 * 舆情监控大屏组件库
 *
 * 组件分类：
 * - Container: 容器类组件 (DashboardCard, ChartContainer)
 * - Metric: 指标展示组件 (MetricCard, MetricValue, MetricLabel)
 * - Progress: 进度类组件 (ProgressBar, IntensityBar)
 * - Status: 状态指示组件 (LiveIndicator, StatusDot, TrendIndicator)
 * - Sentiment: 舆情专用组件 (SentimentBadge, WordcloudTag)
 *
 * @author SKER Team
 * @version 1.0.0
 */

// ==================== 类型定义区域 ====================

/** 基础组件Props类型 */
type BaseProps<T = HTMLDivElement> = React.HTMLAttributes<T>;
type BaseSpanProps = React.HTMLAttributes<HTMLSpanElement>;

/** 容器类组件接口 */
interface DashboardCardProps
  extends BaseProps,
    variants.DashboardCardVariants {}

interface ChartContainerProps
  extends Omit<BaseProps, 'className' | 'title'>,
    variants.ChartContainerVariants {
  title?: string | ReactNode;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

/** 指标类组件接口 */
interface MetricCardProps extends BaseProps, variants.MetricCardVariants {}
interface MetricValueProps extends BaseProps, variants.MetricValueVariants {}
interface MetricLabelProps extends BaseProps {}

/** 进度类组件接口 */
interface ProgressBarProps extends BaseProps, variants.ProgressBarVariants {
  value: number; // 0-100
  variant?: variants.ProgressFillVariants['variant'];
  shine?: variants.ProgressFillVariants['shine'];
}

interface IntensityBarProps extends BaseProps, variants.IntensityBarVariants {
  value: number; // 0-1
  intensity?: variants.IntensityFillVariants['intensity'];
}

/** 状态类组件接口 */
interface LiveIndicatorProps
  extends BaseSpanProps,
    variants.LiveIndicatorVariants {}
interface StatusDotProps extends BaseSpanProps, variants.StatusDotVariants {}

interface TrendIndicatorProps
  extends BaseSpanProps,
    variants.TrendIndicatorVariants {
  value?: string | number;
  icon?: ReactNode;
}

/** 舆情专用组件接口 */
interface SentimentBadgeProps
  extends BaseSpanProps,
    variants.SentimentBadgeVariants {}
interface WordcloudTagProps
  extends BaseSpanProps,
    variants.WordcloudTagVariants {}
interface WordcloudContainerProps extends BaseProps {}

// ==================== 工具函数 ====================

/** 百分比值规范化 */
const normalizePercentage = (value: number, max = 100): number =>
  Math.max(0, Math.min(max, value));

// ==================== 容器类组件 ====================

export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, size, variant, highlighted, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        variants.dashboardCardVariants({ size, variant, highlighted }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DashboardCard.displayName = 'DashboardCard';

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    { className, size, pattern, title, subtitle, action, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        variants.chartContainerVariants({ size, pattern }),
        className
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <header className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="space-y-1">
            {title && (
              <div className="text-lg font-semibold text-foreground">
                {title}
              </div>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </header>
      )}
      <main className="relative z-10">{children}</main>
    </div>
  )
);
ChartContainer.displayName = 'ChartContainer';

// ==================== 指标类组件 ====================

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(variants.metricCardVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
MetricCard.displayName = 'MetricCard';

export const MetricValue = forwardRef<HTMLDivElement, MetricValueProps>(
  ({ className, size, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(variants.metricValueVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
MetricValue.displayName = 'MetricValue';

export const MetricLabel = forwardRef<HTMLDivElement, MetricLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-muted-foreground text-sm font-medium', className)}
      {...props}
    >
      {children}
    </div>
  )
);
MetricLabel.displayName = 'MetricLabel';

// ==================== 进度类组件 ====================

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, size, value, variant = 'primary', shine = true, ...props },
    ref
  ) => {
    const percentage = normalizePercentage(value);

    return (
      <div
        ref={ref}
        className={cn(variants.progressBarVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(variants.progressFillVariants({ variant, shine }))}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';

export { CircularProgress } from './CircularProgress';
export { GradientBar } from './GradientBar';
