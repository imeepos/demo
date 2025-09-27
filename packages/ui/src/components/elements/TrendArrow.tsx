'use client';

import { forwardRef } from 'react';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

type TrendDirection = 'up' | 'down' | 'stable';

interface TrendArrowProps {
  trend: TrendDirection;
  value?: number;
  percentage?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const TrendArrow = forwardRef<HTMLDivElement, TrendArrowProps>(
  (
    {
      trend,
      value,
      percentage,
      showValue = true,
      size = 'md',
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const trendConfigs = {
      up: { icon: '↗', color: 'text-green-600', bg: 'bg-green-50' },
      down: { icon: '↘', color: 'text-red-600', bg: 'bg-red-50' },
      stable: { icon: '→', color: 'text-gray-600', bg: 'bg-gray-50' },
    };

    const config = trendConfigs[trend];

    const formatValue = () => {
      if (percentage !== undefined) {
        return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
      }
      if (value !== undefined) {
        return `${value > 0 ? '+' : ''}${value.toLocaleString()}`;
      }
      return '';
    };

    return (
      <div ref={ref} {...props}>
        <Badge
          variant="outline"
          className={cn(
            'inline-flex items-center space-x-1',
            config.bg,
            config.color,
            animated && trend !== 'stable' && 'animate-pulse',
            className
          )}
        >
          <span
            className={cn(
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-base',
              size === 'lg' && 'text-lg'
            )}
          >
            {config.icon}
          </span>

          {showValue && (value !== undefined || percentage !== undefined) && (
            <span className="font-medium text-xs">{formatValue()}</span>
          )}
        </Badge>
      </div>
    );
  }
);

TrendArrow.displayName = 'TrendArrow';

export { TrendArrow, type TrendArrowProps, type TrendDirection };
