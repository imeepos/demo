import { forwardRef } from 'react';
import { Card, type CardProps } from '@sker/ui';
import { cn } from '@sker/ui';
import type {
  MetricCardVariants,
  MetricValueVariants,
} from '../../lib/dashboard-variants';

interface MetricCardProps extends Omit<CardProps, 'children'> {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  description?: string;
  loading?: boolean;
  animated?: boolean;
}

/**
 * 现代化指标卡片组件
 * 基于升级后的 Card 组件实现
 * 职责：展示单个核心指标数据，支持多种美观样式和动画效果
 */
export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      title,
      value,
      trend,
      trendValue,
      icon,
      description,
      loading = false,
      animated = true,
      variant = 'elevated',
      className,
      ...props
    },
    ref
  ) => {
    const getTrendConfig = (trend: 'up' | 'down' | 'neutral') => {
      switch (trend) {
        case 'up':
          return {
            icon: '↗️',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            label: '增长',
          };
        case 'down':
          return {
            icon: '↘️',
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            label: '下降',
          };
        case 'neutral':
        default:
          return {
            icon: '→',
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            label: '持平',
          };
      }
    };

    const trendConfig = trend ? getTrendConfig(trend) : null;

    if (loading) {
      return (
        <Card
          ref={ref}
          variant={variant}
          className={cn('p-6', className)}
          {...props}
        >
          <div className="animate-pulse space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </div>
            <div className="h-8 bg-muted rounded w-16"></div>
            <div className="h-3 bg-muted rounded w-12"></div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn(
          'p-6 group',
          animated && 'transition-all duration-300',
          className
        )}
        {...props}
      >
        {/* 头部：标题和图标 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </h3>
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
          )}
        </div>

        {/* 主要数值 */}
        <div className="mb-3">
          <div
            className={cn(
              'text-3xl font-bold text-foreground',
              animated &&
                'group-hover:scale-105 transition-transform origin-left'
            )}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors">
              {description}
            </p>
          )}
        </div>

        {/* 趋势指示器 */}
        {trend && trendValue && trendConfig && (
          <div
            className={cn(
              'flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium',
              trendConfig.bgColor,
              trendConfig.color,
              animated && 'group-hover:scale-105 transition-transform'
            )}
          >
            <span className="text-sm">{trendConfig.icon}</span>
            <span>{trendValue}</span>
            <span className="text-muted-foreground">vs 上期</span>
          </div>
        )}

        {/* 装饰性渐变条 */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 rounded-b-lg',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          )}
        />
      </Card>
    );
  }
);
MetricCard.displayName = 'MetricCard';
