'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type StatusType =
  | 'online'
  | 'offline'
  | 'busy'
  | 'away'
  | 'error'
  | 'success'
  | 'warning'
  | 'loading';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      status,
      label,
      showLabel = false,
      size = 'md',
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const statusConfigs = {
      online: { color: 'bg-green-500', label: '在线' },
      offline: { color: 'bg-gray-400', label: '离线' },
      busy: { color: 'bg-red-500', label: '忙碌' },
      away: { color: 'bg-yellow-500', label: '离开' },
      error: { color: 'bg-red-600', label: '错误' },
      success: { color: 'bg-green-600', label: '成功' },
      warning: { color: 'bg-orange-500', label: '警告' },
      loading: { color: 'bg-blue-500', label: '加载中' },
    };

    const config = statusConfigs[status];

    const sizeClasses = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
    };

    return (
      <div
        className={cn('inline-flex items-center space-x-2', className)}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            'rounded-full',
            sizeClasses[size],
            config.color,
            animated &&
              (status === 'loading' || status === 'busy') &&
              'animate-pulse'
          )}
        />

        {showLabel && (
          <span className="text-sm text-muted-foreground">
            {label || config.label}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator, type StatusIndicatorProps, type StatusType };
