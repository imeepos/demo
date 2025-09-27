'use client';

import * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface SentimentOverviewWidgetProps {
  data?: SentimentOverviewData;
  isLoading?: boolean;
  className?: string;
  onRefresh?: () => void;
  onDataClick?: (type: SentimentType) => void;
  showTrend?: boolean;
  showComparison?: boolean;
  comparisonPeriod?: 'day' | 'week' | 'month';
}

interface SentimentOverviewData {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  trend: TrendData;
  comparison?: ComparisonData;
  lastUpdated: Date;
}

interface TrendData {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  period: string;
}

interface ComparisonData {
  period: string;
  previous: {
    total: number;
    positive: number;
    negative: number;
    neutral: number;
  };
  change: {
    total: number;
    positive: number;
    negative: number;
    neutral: number;
  };
}

type SentimentType = 'positive' | 'negative' | 'neutral' | 'total';

const SentimentOverviewWidget = forwardRef<
  HTMLDivElement,
  SentimentOverviewWidgetProps
>(
  (
    {
      data,
      isLoading = false,
      className,
      onRefresh,
      onDataClick,
      showTrend = true,
      showComparison = true,
      comparisonPeriod = 'day',
      ...props
    },
    ref
  ) => {
    const getPercentage = (value: number, total: number) => {
      return total > 0 ? Math.round((value / total) * 100) : 0;
    };

    const formatNumber = (num: number) => {
      if (num >= 10000) {
        return `${(num / 10000).toFixed(1)}万`;
      }
      return num.toLocaleString();
    };

    const getTrendColor = (direction: TrendData['direction']) => {
      switch (direction) {
        case 'up':
          return 'text-green-600';
        case 'down':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };

    if (isLoading) {
      return (
        <Card className={cn('w-full', className)} ref={ref} {...props}>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (!data) {
      return (
        <Card className={cn('w-full', className)} ref={ref} {...props}>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">暂无数据</p>
          </CardContent>
        </Card>
      );
    }

    const positivePercentage = getPercentage(data.positive, data.total);
    const negativePercentage = getPercentage(data.negative, data.total);
    const neutralPercentage = getPercentage(data.neutral, data.total);

    return (
      <Card className={cn('w-full', className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">舆情概览</CardTitle>
            <div className="flex items-center space-x-2">
              {showTrend && data.trend && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs',
                          getTrendColor(data.trend.direction)
                        )}
                      >
                        {data.trend.direction === 'up' && '↗'}
                        {data.trend.direction === 'down' && '↘'}
                        {data.trend.direction === 'stable' && '→'}
                        {data.trend.percentage}%
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        较{data.trend.period}变化{data.trend.percentage}%
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {onRefresh && (
                <Button variant="ghost" size="sm" onClick={onRefresh}>
                  ⟳
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            最后更新: {data.lastUpdated.toLocaleString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div
            className="text-center cursor-pointer hover:bg-muted/50 rounded-md p-3 transition-colors"
            onClick={() => onDataClick?.('total')}
          >
            <div className="text-3xl font-bold">{formatNumber(data.total)}</div>
            <div className="text-sm text-muted-foreground">总舆情量</div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-sm">情感分布</h4>

            <div
              className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
              onClick={() => onDataClick?.('positive')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    正面
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {positivePercentage}%
                  </span>
                </div>
                <span className="font-semibold">
                  {formatNumber(data.positive)}
                </span>
              </div>
              <Progress value={positivePercentage} className="h-2" />
            </div>

            <div
              className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
              onClick={() => onDataClick?.('negative')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    负面
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {negativePercentage}%
                  </span>
                </div>
                <span className="font-semibold">
                  {formatNumber(data.negative)}
                </span>
              </div>
              <Progress value={negativePercentage} className="h-2 bg-red-100" />
            </div>

            <div
              className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
              onClick={() => onDataClick?.('neutral')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-700 border-gray-200"
                  >
                    中性
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {neutralPercentage}%
                  </span>
                </div>
                <span className="font-semibold">
                  {formatNumber(data.neutral)}
                </span>
              </div>
              <Progress value={neutralPercentage} className="h-2 bg-gray-100" />
            </div>
          </div>

          {showComparison && data.comparison && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium text-sm">
                  较{data.comparison.period}对比
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">总量变化</div>
                    <div
                      className={cn(
                        'font-medium',
                        data.comparison.change.total > 0
                          ? 'text-green-600'
                          : data.comparison.change.total < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                      )}
                    >
                      {data.comparison.change.total > 0 ? '+' : ''}
                      {formatNumber(data.comparison.change.total)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-muted-foreground">负面变化</div>
                    <div
                      className={cn(
                        'font-medium',
                        data.comparison.change.negative > 0
                          ? 'text-red-600'
                          : data.comparison.change.negative < 0
                            ? 'text-green-600'
                            : 'text-gray-600'
                      )}
                    >
                      {data.comparison.change.negative > 0 ? '+' : ''}
                      {formatNumber(data.comparison.change.negative)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }
);

SentimentOverviewWidget.displayName = 'SentimentOverviewWidget';

export { SentimentOverviewWidget };
export type {
  SentimentOverviewWidgetProps,
  SentimentOverviewData,
  TrendData,
  ComparisonData,
  SentimentType,
};
