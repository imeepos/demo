'use client';

/**
 * 趋势分析图表组件
 * 专为舆情趋势分析设计的图表组件，提供多维度的时间序列数据可视化
 * 支持情感趋势、数量变化、热度分析等多种图表类型
 */

import * as React from 'react';
import { useState, forwardRef } from 'react';

import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Calendar } from '../ui/calendar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import {
  type TrendAnalysisChartProps,
  type ChartType,
  type TimeRange,
  type ChartExportFormat,
  type TrendData,
  type DataSource,
} from '../layouts/types';

// 趋势分析图表主组件
const TrendAnalysisChart = forwardRef<HTMLDivElement, TrendAnalysisChartProps>(
  (
    {
      children,
      data = [],
      chartType = 'line',
      timeRange = '7d',
      dataSources = [],
      isLoading = false,
      className,
      onChartTypeChange,
      onTimeRangeChange,
      onDataSourceChange,
      onExport,
      showPrediction = false,
      showAnomalies = true,
      height = 400,
      ...props
    },
    ref
  ) => {
    // 状态管理
    const [selectedTimeRange, setSelectedTimeRange] =
      useState<TimeRange>(timeRange);
    const [selectedChartType, setSelectedChartType] =
      useState<ChartType>(chartType);
    const [enabledSources, setEnabledSources] = useState<string[]>(
      dataSources.filter(s => s.enabled).map(s => s.id)
    );
    const [customDateRange, setCustomDateRange] = useState<{
      start: Date;
      end: Date;
    } | null>(null);

    // 时间范围选项
    const timeRangeOptions = [
      { value: '1h', label: '最近1小时' },
      { value: '6h', label: '最近6小时' },
      { value: '24h', label: '最近24小时' },
      { value: '7d', label: '最近7天' },
      { value: '30d', label: '最近30天' },
      { value: '90d', label: '最近90天' },
      { value: 'custom', label: '自定义' },
    ];

    // 图表类型选项
    const chartTypeOptions = [
      { value: 'line', label: '折线图', icon: '📈' },
      { value: 'area', label: '面积图', icon: '📊' },
      { value: 'bar', label: '柱状图', icon: '📊' },
      { value: 'heatmap', label: '热力图', icon: '🔥' },
      { value: 'scatter', label: '散点图', icon: '⚪' },
    ];

    // 处理时间范围变化
    const handleTimeRangeChange = (newRange: TimeRange) => {
      setSelectedTimeRange(newRange);
      if (newRange !== 'custom') {
        setCustomDateRange(null);
      }
      onTimeRangeChange?.(newRange);
    };

    // 处理图表类型变化
    const handleChartTypeChange = (newType: string) => {
      const chartType = newType as ChartType;
      setSelectedChartType(chartType);
      onChartTypeChange?.(chartType);
    };

    // 处理数据源切换
    const handleDataSourceToggle = (sourceId: string) => {
      const newEnabledSources = enabledSources.includes(sourceId)
        ? enabledSources.filter(id => id !== sourceId)
        : [...enabledSources, sourceId];

      setEnabledSources(newEnabledSources);
      onDataSourceChange?.(newEnabledSources);
    };

    // 渲染图表内容
    const renderChart = () => {
      // 加载状态显示骨架屏
      if (isLoading) {
        return (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        );
      }

      // 无数据状态
      if (!data.length) {
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p>暂无趋势数据</p>
              <p className="text-sm">请选择不同的时间范围或数据源</p>
            </div>
          </div>
        );
      }

      // 图表渲染区域（占位符 - 实际实现时集成具体图表库）
      return (
        <div className="relative" style={{ height: `${height}px` }}>
          {/* 图表占位符 - 实际实现时替换为真实图表 */}
          <div className="w-full h-full border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-2xl mb-2">
                {
                  chartTypeOptions.find(opt => opt.value === selectedChartType)
                    ?.icon
                }
              </div>
              <p>
                {
                  chartTypeOptions.find(opt => opt.value === selectedChartType)
                    ?.label
                }
              </p>
              <p className="text-sm">{data.length} 个数据点</p>
            </div>
          </div>

          {/* 异常点标注 */}
          {showAnomalies && data.some(d => d.metadata?.anomalies?.length) && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="text-xs">
                发现异常
              </Badge>
            </div>
          )}

          {/* 事件标记 */}
          {data.some(d => d.metadata?.events?.length) && (
            <div className="absolute bottom-2 left-2 flex space-x-1">
              {data
                .flatMap(d => d.metadata?.events || [])
                .slice(0, 3)
                .map((event, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant={
                            event.type === 'crisis' ? 'destructive' : 'outline'
                          }
                          className="text-xs cursor-help"
                        >
                          {event.title}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm">{event.description}</p>
                          <p className="text-xs text-muted-foreground">
                            影响程度: {event.impact}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <Card className={cn('w-full', className)} ref={ref} {...props}>
        {/* 图表头部：标题和导出操作 */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">趋势分析</CardTitle>
            <div className="flex items-center space-x-2">
              {/* 导出按钮 */}
              {onExport && (
                <Select
                  onValueChange={format =>
                    onExport(format as ChartExportFormat)
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="导出" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* 控制面板：时间范围选择 */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 时间范围选择 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">时间:</span>
              <Select
                value={selectedTimeRange}
                onValueChange={handleTimeRangeChange}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRangeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 自定义时间选择 */}
              {selectedTimeRange === 'custom' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      选择日期
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={
                        customDateRange
                          ? {
                              from: customDateRange.start,
                              to: customDateRange.end,
                            }
                          : undefined
                      }
                      onSelect={range => {
                        if (range?.from && range?.to) {
                          setCustomDateRange({
                            start: range.from,
                            end: range.to,
                          });
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 图表类型和数据源控制 */}
          <Tabs
            value={selectedChartType}
            onValueChange={value => handleChartTypeChange(value)}
          >
            <div className="flex items-center justify-between">
              {/* 图表类型选择器 */}
              <TabsList>
                {chartTypeOptions.map(option => (
                  <TabsTrigger
                    key={option.value}
                    value={option.value}
                    className="text-xs"
                  >
                    {option.icon} {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* 数据源图例和控制 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">数据源:</span>
                {dataSources.map(source => (
                  <Button
                    key={source.id}
                    variant={
                      enabledSources.includes(source.id) ? 'default' : 'outline'
                    }
                    size="sm"
                    className="h-6 px-2 text-xs"
                    style={{
                      backgroundColor: enabledSources.includes(source.id)
                        ? source.color
                        : undefined,
                      borderColor: source.color,
                    }}
                    onClick={() => handleDataSourceToggle(source.id)}
                  >
                    {source.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 图表内容区域 */}
            <div className="mt-4">
              {chartTypeOptions.map(option => (
                <TabsContent
                  key={option.value}
                  value={option.value}
                  className="mt-0"
                >
                  {renderChart()}
                </TabsContent>
              ))}
            </div>
          </Tabs>

          {/* 统计信息展示 */}
          {!isLoading && data.length > 0 && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold">{data.length}</div>
                <div className="text-sm text-muted-foreground">数据点</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {data.flatMap(d => d.metadata?.events || []).length}
                </div>
                <div className="text-sm text-muted-foreground">事件标记</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {data.flatMap(d => d.metadata?.anomalies || []).length}
                </div>
                <div className="text-sm text-muted-foreground">异常检测</div>
              </div>
            </div>
          )}
        </CardContent>

        {children}
      </Card>
    );
  }
);

TrendAnalysisChart.displayName = 'TrendAnalysisChart';

export { TrendAnalysisChart };
export type { TrendAnalysisChartProps };
