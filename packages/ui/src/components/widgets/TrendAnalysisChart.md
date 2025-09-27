# TrendAnalysisChart - 趋势分析图表组件

## 📋 组件概述

TrendAnalysisChart 是专为舆情趋势分析设计的图表组件，提供多维度的时间序列数据可视化。支持情感趋势、数量变化、热度分析等多种图表类型，帮助用户直观了解舆情发展态势。

### 核心业务场景

- 舆情趋势时间序列分析
- 多维度数据对比展示
- 热点事件发展轨迹
- 预测趋势和异常检测

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Card: 图表容器和标题区域
- Tabs: 多图表类型切换
- Select: 时间范围和数据源选择
- Calendar: 自定义时间选择器
- Tooltip: 数据点详情悬浮显示
- Button: 导出和操作按钮
- Badge: 图例和状态标识
- Skeleton: 图表加载骨架屏
```

### 视觉一致性要求

- 清晰的图表配色方案
- 统一的交互和悬浮效果
- 响应式图表适配不同屏幕
- 简洁的图例和标注设计

### 交互行为规范

- 图表缩放和平移支持
- 数据点悬浮详情显示
- 时间范围快速切换
- 图表类型无缝切换

## 🔧 核心用途

### 主要功能

1. **趋势分析**: 展示舆情数量和情感的时间变化
2. **对比分析**: 多个数据源或时间段的对比
3. **异常检测**: 标识异常波动和突发事件
4. **预测展示**: 基于历史数据的趋势预测

### 适用业务场景

- 政府舆情态势分析
- 企业品牌影响力追踪
- 媒体事件发展监控
- 危机公关效果评估

### 用户交互流程

1. 选择图表类型和数据维度
2. 设置时间范围和数据源
3. 查看趋势图表和关键指标
4. 交互探索异常点和详细数据
5. 导出图表和数据报告

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
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
```

### TypeScript 接口定义

```typescript
interface TrendAnalysisChartProps {
  data?: TrendData[];
  chartType?: ChartType;
  timeRange?: TimeRange;
  dataSources?: DataSource[];
  isLoading?: boolean;
  className?: string;
  onChartTypeChange?: (type: ChartType) => void;
  onTimeRangeChange?: (range: TimeRange) => void;
  onDataSourceChange?: (sources: string[]) => void;
  onExport?: (format: ExportFormat) => void;
  showPrediction?: boolean;
  showAnomalies?: boolean;
  height?: number;
}

interface TrendData {
  timestamp: Date;
  values: Record<string, number>;
  metadata?: {
    events?: EventMarker[];
    anomalies?: AnomalyPoint[];
  };
}

interface EventMarker {
  id: string;
  timestamp: Date;
  title: string;
  description?: string;
  type: 'positive' | 'negative' | 'neutral' | 'crisis';
  impact: 'high' | 'medium' | 'low';
}

interface AnomalyPoint {
  timestamp: Date;
  value: number;
  expectedValue: number;
  deviation: number;
  severity: 'high' | 'medium' | 'low';
}

type ChartType = 'line' | 'area' | 'bar' | 'heatmap' | 'scatter';
type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d' | '90d' | 'custom';
type ExportFormat = 'png' | 'svg' | 'pdf' | 'csv' | 'excel';

interface DataSource {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
  type: 'sentiment' | 'volume' | 'engagement' | 'reach';
}
```

### 关键实现逻辑

```typescript
const TrendAnalysisChart = forwardRef<HTMLDivElement, TrendAnalysisChartProps>(
  ({
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
  }, ref) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRange);
    const [selectedChartType, setSelectedChartType] = useState<ChartType>(chartType);
    const [enabledSources, setEnabledSources] = useState<string[]>(
      dataSources.filter(s => s.enabled).map(s => s.id)
    );
    const [customDateRange, setCustomDateRange] = useState<{start: Date, end: Date} | null>(null);

    // 时间范围选项
    const timeRangeOptions = [
      { value: '1h', label: '最近1小时' },
      { value: '6h', label: '最近6小时' },
      { value: '24h', label: '最近24小时' },
      { value: '7d', label: '最近7天' },
      { value: '30d', label: '最近30天' },
      { value: '90d', label: '最近90天' },
      { value: 'custom', label: '自定义' }
    ];

    // 图表类型选项
    const chartTypeOptions = [
      { value: 'line', label: '折线图', icon: '📈' },
      { value: 'area', label: '面积图', icon: '📊' },
      { value: 'bar', label: '柱状图', icon: '📊' },
      { value: 'heatmap', label: '热力图', icon: '🔥' },
      { value: 'scatter', label: '散点图', icon: '⚪' }
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
    const handleChartTypeChange = (newType: ChartType) => {
      setSelectedChartType(newType);
      onChartTypeChange?.(newType);
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

      // 这里应该集成具体的图表库（如 Recharts, Chart.js 等）
      return (
        <div className="relative" style={{ height: `${height}px` }}>
          {/* 图表占位符 - 实际实现时替换为真实图表 */}
          <div className="w-full h-full border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-2xl mb-2">
                {chartTypeOptions.find(opt => opt.value === selectedChartType)?.icon}
              </div>
              <p>{chartTypeOptions.find(opt => opt.value === selectedChartType)?.label}</p>
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
              {data.flatMap(d => d.metadata?.events || []).slice(0, 3).map((event, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant={event.type === 'crisis' ? 'destructive' : 'outline'}
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
      <Card className={cn("w-full", className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">趋势分析</CardTitle>
            <div className="flex items-center space-x-2">
              {/* 导出按钮 */}
              {onExport && (
                <Select onValueChange={(format) => onExport(format as ExportFormat)}>
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

          {/* 控制面板 */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 时间范围选择 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">时间:</span>
              <Select value={selectedTimeRange} onValueChange={handleTimeRangeChange}>
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
                      selected={customDateRange ? {
                        from: customDateRange.start,
                        to: customDateRange.end
                      } : undefined}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setCustomDateRange({ start: range.from, end: range.to });
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
          <Tabs value={selectedChartType} onValueChange={handleChartTypeChange}>
            <div className="flex items-center justify-between">
              <TabsList>
                {chartTypeOptions.map(option => (
                  <TabsTrigger key={option.value} value={option.value} className="text-xs">
                    {option.icon} {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* 数据源图例 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">数据源:</span>
                {dataSources.map(source => (
                  <Button
                    key={source.id}
                    variant={enabledSources.includes(source.id) ? "default" : "outline"}
                    size="sm"
                    className="h-6 px-2 text-xs"
                    style={{
                      backgroundColor: enabledSources.includes(source.id) ? source.color : undefined,
                      borderColor: source.color
                    }}
                    onClick={() => handleDataSourceToggle(source.id)}
                  >
                    {source.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 图表内容 */}
            <div className="mt-4">
              {chartTypeOptions.map(option => (
                <TabsContent key={option.value} value={option.value} className="mt-0">
                  {renderChart()}
                </TabsContent>
              ))}
            </div>
          </Tabs>

          {/* 统计信息 */}
          {!isLoading && data.length > 0 && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {data.length}
                </div>
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
      </Card>
    );
  }
);

TrendAnalysisChart.displayName = "TrendAnalysisChart";
```

### 样式和动画规范

```css
/* 图表切换动画 */
.chart-transition {
  @apply transition-all duration-300 ease-in-out;
}

/* 数据源按钮状态 */
.data-source-active {
  @apply transform scale-105 shadow-md;
}

/* 异常点标识 */
.anomaly-point {
  @apply animate-pulse;
}

/* 事件标记悬浮 */
.event-marker:hover {
  @apply scale-110 transition-transform duration-200;
}

/* 图表加载动画 */
@keyframes chart-loading {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.chart-skeleton {
  animation: chart-loading 2s infinite;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { TrendAnalysisChart } from "@/components/widgets";

function TrendPage() {
  const trendData = [
    {
      timestamp: new Date('2024-01-01'),
      values: { positive: 120, negative: 45, neutral: 80 },
    },
    {
      timestamp: new Date('2024-01-02'),
      values: { positive: 150, negative: 38, neutral: 90 },
      metadata: {
        events: [{
          id: '1',
          timestamp: new Date('2024-01-02'),
          title: '正面新闻发布',
          type: 'positive',
          impact: 'medium'
        }]
      }
    }
  ];

  const dataSources = [
    { id: 'positive', name: '正面', color: '#22c55e', enabled: true, type: 'sentiment' },
    { id: 'negative', name: '负面', color: '#ef4444', enabled: true, type: 'sentiment' },
    { id: 'neutral', name: '中性', color: '#6b7280', enabled: false, type: 'sentiment' }
  ];

  return (
    <TrendAnalysisChart
      data={trendData}
      dataSources={dataSources}
      chartType="line"
      timeRange="7d"
      showAnomalies={true}
      height={400}
      onExport={(format) => exportChart(format)}
    />
  );
}
```

### 高级配置示例

```typescript
function AdvancedTrendAnalysis() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTimeRangeChange = async (range: TimeRange) => {
    setIsLoading(true);
    const data = await fetchTrendData(range);
    setChartData(data);
    setIsLoading(false);
  };

  return (
    <TrendAnalysisChart
      data={chartData}
      isLoading={isLoading}
      chartType="area"
      showPrediction={true}
      showAnomalies={true}
      onTimeRangeChange={handleTimeRangeChange}
      onChartTypeChange={(type) => console.log('图表类型:', type)}
      onDataSourceChange={(sources) => console.log('数据源:', sources)}
      onExport={async (format) => {
        await exportTrendChart(chartData, format);
      }}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性               | 类型                           | 默认值 | 描述             |
| ------------------ | ------------------------------ | ------ | ---------------- |
| data               | TrendData[]                    | []     | 趋势数据数组     |
| chartType          | ChartType                      | 'line' | 图表类型         |
| timeRange          | TimeRange                      | '7d'   | 时间范围         |
| dataSources        | DataSource[]                   | []     | 数据源配置       |
| isLoading          | boolean                        | false  | 加载状态         |
| onChartTypeChange  | (type: ChartType) => void      | -      | 图表类型变化回调 |
| onTimeRangeChange  | (range: TimeRange) => void     | -      | 时间范围变化回调 |
| onDataSourceChange | (sources: string[]) => void    | -      | 数据源变化回调   |
| onExport           | (format: ExportFormat) => void | -      | 导出回调         |
| showPrediction     | boolean                        | false  | 是否显示预测数据 |
| showAnomalies      | boolean                        | true   | 是否显示异常检测 |
| height             | number                         | 400    | 图表高度         |

### 事件回调

- `onChartTypeChange`: 图表类型切换时触发
- `onTimeRangeChange`: 时间范围变化时触发
- `onDataSourceChange`: 数据源选择变化时触发
- `onExport`: 导出操作时触发

## 🎨 最佳实践

### 设计建议

1. 图表配色使用语义化颜色系统
2. 异常点和事件标记要醒目但不干扰主体
3. 提供多种图表类型满足不同分析需求
4. 时间轴标签要清晰易读

### 性能优化

1. 大数据量时使用数据抽样和虚拟化
2. 图表切换使用平滑过渡动画
3. 异步加载和缓存图表数据
4. 合理设置图表重绘频率
