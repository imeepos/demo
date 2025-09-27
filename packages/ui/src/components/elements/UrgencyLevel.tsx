'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '../ui/tooltip';

type UrgencyLevelType = 'very-low' | 'low' | 'medium' | 'high' | 'critical';

interface UrgencyLevelProps {
  level: UrgencyLevelType;
  showProgress?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'progress' | 'combined';
  animated?: boolean;
  onClick?: (level: UrgencyLevelType) => void;
  className?: string;
}

const UrgencyLevel = forwardRef<HTMLDivElement, UrgencyLevelProps>(
  (
    {
      level,
      showProgress = true,
      showLabel = true,
      size = 'md',
      variant = 'combined',
      animated = true,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const urgencyConfigs: Record<
      UrgencyLevelType,
      {
        label: string;
        value: number;
        color: string;
        progressColor: string;
        icon: string;
        description: string;
      }
    > = {
      'very-low': {
        label: '极低',
        value: 20,
        color: 'bg-green-500',
        progressColor: 'bg-green-500',
        icon: '🟢',
        description: '优先级极低，无需立即处理',
      },
      low: {
        label: '低',
        value: 40,
        color: 'bg-yellow-500',
        progressColor: 'bg-yellow-500',
        icon: '🟡',
        description: '优先级较低，可延后处理',
      },
      medium: {
        label: '中',
        value: 60,
        color: 'bg-orange-500',
        progressColor: 'bg-orange-500',
        icon: '🟠',
        description: '中等优先级，需要关注',
      },
      high: {
        label: '高',
        value: 80,
        color: 'bg-red-500',
        progressColor: 'bg-red-500',
        icon: '🔴',
        description: '高优先级，需要及时处理',
      },
      critical: {
        label: '极高',
        value: 100,
        color: 'bg-red-600',
        progressColor: 'bg-red-600',
        icon: '🚨',
        description: '紧急情况，需要立即处理',
      },
    };

    const config = urgencyConfigs[level];

    const sizeClasses = {
      sm: {
        progress: 'h-1',
        badge: 'text-xs px-2 py-0.5',
      },
      md: {
        progress: 'h-2',
        badge: 'text-xs px-2.5 py-0.5',
      },
      lg: {
        progress: 'h-3',
        badge: 'text-sm px-3 py-1',
      },
    };

    const renderBadge = () => (
      <Badge
        variant={level === 'critical' ? 'destructive' : 'secondary'}
        className={cn(
          sizeClasses[size].badge,
          animated && level === 'critical' && 'animate-pulse',
          onClick && 'cursor-pointer hover:opacity-80'
        )}
      >
        {config.icon} {config.label}
      </Badge>
    );

    const renderProgress = () => (
      <div className="flex-1 min-w-0">
        <Progress
          value={config.value}
          className={cn(sizeClasses[size].progress, 'w-full')}
        />
      </div>
    );

    const content = (
      <div
        className={cn(
          'inline-flex items-center gap-2',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={() => onClick?.(level)}
        ref={ref}
        {...props}
      >
        {(variant === 'badge' || variant === 'combined') &&
          showLabel &&
          renderBadge()}
        {(variant === 'progress' || variant === 'combined') &&
          showProgress &&
          renderProgress()}
      </div>
    );

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>
            <p>{config.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

UrgencyLevel.displayName = 'UrgencyLevel';

export {
  UrgencyLevel,
  type UrgencyLevelProps,
  type UrgencyLevel as UrgencyLevelType,
};
