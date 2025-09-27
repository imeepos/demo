'use client';

import { forwardRef } from 'react';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Progress } from '../ui/progress';
import { cn } from '../../lib/utils';

type SentimentType = 'positive' | 'negative' | 'neutral' | 'mixed' | 'unknown';
type SentimentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SentimentVariant = 'default' | 'subtle' | 'outline' | 'solid' | 'gradient';

interface SentimentConfig {
  type: SentimentType;
  label: string;
  color: string;
  icon: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

interface SentimentIndicatorProps {
  sentiment: SentimentType;
  score?: number;
  confidence?: number;
  showScore?: boolean;
  showIcon?: boolean;
  size?: SentimentSize;
  variant?: SentimentVariant;
  className?: string;
  onClick?: (sentiment: SentimentType) => void;
  onHover?: (sentiment: SentimentType) => void;
  tooltip?: string | React.ReactNode;
  disabled?: boolean;
  animated?: boolean;
}

const SentimentIndicator = forwardRef<HTMLDivElement, SentimentIndicatorProps>(
  (
    {
      sentiment,
      score,
      confidence,
      showScore = false,
      showIcon = true,
      size = 'md',
      variant = 'default',
      className,
      onClick,
      onHover,
      tooltip,
      disabled = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const sentimentConfigs: Record<SentimentType, SentimentConfig> = {
      positive: {
        type: 'positive',
        label: '正面',
        color: '#22c55e',
        icon: '😊',
        description: '积极、正面的情感倾向',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
      },
      negative: {
        type: 'negative',
        label: '负面',
        color: '#ef4444',
        icon: '😞',
        description: '消极、负面的情感倾向',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
      },
      neutral: {
        type: 'neutral',
        label: '中性',
        color: '#6b7280',
        icon: '😐',
        description: '中性、客观的情感倾向',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
      },
      mixed: {
        type: 'mixed',
        label: '复合',
        color: '#f59e0b',
        icon: '🤔',
        description: '包含多种情感的复合倾向',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
      },
      unknown: {
        type: 'unknown',
        label: '未知',
        color: '#9ca3af',
        icon: '❓',
        description: '无法确定的情感倾向',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-500',
        borderColor: 'border-gray-200',
      },
    };

    const config = sentimentConfigs[sentiment];

    const sizeConfigs = {
      xs: {
        badge: 'text-xs px-1.5 py-0.5',
        icon: 'text-xs',
        progress: 'h-1',
      },
      sm: {
        badge: 'text-xs px-2 py-1',
        icon: 'text-sm',
        progress: 'h-1.5',
      },
      md: {
        badge: 'text-sm px-2.5 py-1',
        icon: 'text-base',
        progress: 'h-2',
      },
      lg: {
        badge: 'text-base px-3 py-1.5',
        icon: 'text-lg',
        progress: 'h-2.5',
      },
      xl: {
        badge: 'text-lg px-4 py-2',
        icon: 'text-xl',
        progress: 'h-3',
      },
    };

    const sizeConfig = sizeConfigs[size];

    const getVariantClasses = () => {
      switch (variant) {
        case 'subtle':
          return cn(
            config.bgColor,
            config.textColor,
            config.borderColor,
            'border'
          );
        case 'outline':
          return cn(
            'bg-transparent',
            config.textColor,
            config.borderColor,
            'border'
          );
        case 'solid':
          return cn(
            'text-white border-transparent',
            sentiment === 'positive' && 'bg-green-500',
            sentiment === 'negative' && 'bg-red-500',
            sentiment === 'neutral' && 'bg-gray-500',
            sentiment === 'mixed' && 'bg-amber-500',
            sentiment === 'unknown' && 'bg-gray-400'
          );
        case 'gradient':
          return cn(
            'text-white border-transparent bg-gradient-to-r',
            sentiment === 'positive' && 'from-green-400 to-green-600',
            sentiment === 'negative' && 'from-red-400 to-red-600',
            sentiment === 'neutral' && 'from-gray-400 to-gray-600',
            sentiment === 'mixed' && 'from-amber-400 to-amber-600',
            sentiment === 'unknown' && 'from-gray-300 to-gray-500'
          );
        default:
          return cn(
            config.bgColor,
            config.textColor,
            config.borderColor,
            'border'
          );
      }
    };

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick(sentiment);
      }
    };

    const handleMouseEnter = () => {
      if (!disabled && onHover) {
        onHover(sentiment);
      }
    };

    const formatScore = (value?: number) => {
      if (value === undefined) return '';
      return (value * 100).toFixed(1) + '%';
    };

    const getConfidenceColor = (confidence?: number) => {
      if (!confidence) return 'bg-gray-200';
      if (confidence >= 0.8) return 'bg-green-500';
      if (confidence >= 0.6) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const renderContent = () => (
      <div
        className={cn(
          'inline-flex items-center space-x-1 rounded-full transition-all duration-200',
          sizeConfig.badge,
          getVariantClasses(),
          onClick && !disabled && 'cursor-pointer hover:scale-105',
          disabled && 'opacity-50 cursor-not-allowed',
          animated && 'transition-all duration-200 ease-in-out',
          className
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        ref={ref}
        {...props}
      >
        {showIcon && (
          <span className={cn('shrink-0', sizeConfig.icon)}>{config.icon}</span>
        )}

        <span className="font-medium">{config.label}</span>

        {showScore && score !== undefined && (
          <span className="text-xs opacity-80">{formatScore(score)}</span>
        )}
      </div>
    );

    const renderTooltipContent = () => {
      if (tooltip) {
        return typeof tooltip === 'string' ? <p>{tooltip}</p> : tooltip;
      }

      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-base">{config.icon}</span>
            <span className="font-medium">{config.label}</span>
          </div>

          <p className="text-sm">{config.description}</p>

          {score !== undefined && (
            <div className="text-sm">
              <span className="text-muted-foreground">情感分数: </span>
              <span className="font-medium">{formatScore(score)}</span>
            </div>
          )}

          {confidence !== undefined && (
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-muted-foreground">置信度: </span>
                <span className="font-medium">{formatScore(confidence)}</span>
              </div>
              <Progress
                value={confidence * 100}
                className={cn('h-1.5', getConfidenceColor(confidence))}
              />
            </div>
          )}
        </div>
      );
    };

    if (
      tooltip !== undefined ||
      score !== undefined ||
      confidence !== undefined
    ) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{renderContent()}</TooltipTrigger>
            <TooltipContent>{renderTooltipContent()}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return renderContent();
  }
);

SentimentIndicator.displayName = 'SentimentIndicator';

export {
  SentimentIndicator,
  type SentimentIndicatorProps,
  type SentimentType,
  type SentimentSize,
  type SentimentVariant,
};
