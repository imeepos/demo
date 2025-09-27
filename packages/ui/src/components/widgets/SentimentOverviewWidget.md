# SentimentOverviewWidget - 舆情概览组件

## 📋 组件概述

SentimentOverviewWidget 是舆情管理系统的核心数据展示组件，提供舆情数据的整体概览和关键指标展示。通过可视化图表和统计数据，帮助用户快速了解舆情态势。

### 核心业务场景

- 舆情数据总览展示
- 情感分布统计分析
- 关键指标趋势监控
- 数据对比和变化追踪

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Card: 主要容器和分区展示
- Badge: 情感标识和状态标签
- Progress: 数据比例和进度展示
- Skeleton: 加载状态骨架屏
- Separator: 内容区域分隔
- Button: 操作和交互按钮
- Tooltip: 数据详情悬浮提示
```

### 视觉一致性要求

- 清晰的数据层级和视觉引导
- 统一的情感色彩编码系统
- 简洁的图表和指标展示
- 响应式布局适配不同屏幕

### 交互行为规范

- 悬浮显示详细数据
- 点击切换数据维度
- 支持数据刷新操作
- 平滑的加载状态过渡

## 🔧 核心用途

### 主要功能

1. **情感分布**: 正面、负面、中性情感比例展示
2. **数量统计**: 总量、增长率等关键数值
3. **趋势指示**: 上升、下降、平稳状态展示
4. **时间对比**: 同比、环比数据对比

### 适用业务场景

- 政府舆情监管概览
- 企业品牌健康度监控
- 媒体影响力分析
- 危机事件态势评估

### 用户交互流程

1. 查看整体舆情数量
2. 分析情感分布比例
3. 观察趋势变化指标
4. 点击查看详细数据

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
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
```

### TypeScript 接口定义

```typescript
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
```

### 关键实现逻辑

```typescript
const SentimentOverviewWidget = forwardRef<HTMLDivElement, SentimentOverviewWidgetProps>(
  ({
    data,
    isLoading = false,
    className,
    onRefresh,
    onDataClick,
    showTrend = true,
    showComparison = true,
    comparisonPeriod = 'day',
    ...props
  }, ref) => {
    // 计算百分比
    const getPercentage = (value: number, total: number) => {
      return total > 0 ? Math.round((value / total) * 100) : 0;
    };

    // 格式化数字显示
    const formatNumber = (num: number) => {
      if (num >= 10000) {
        return `${(num / 10000).toFixed(1)}万`;
      }
      return num.toLocaleString();
    };

    // 获取趋势颜色
    const getTrendColor = (direction: TrendData['direction']) => {
      switch (direction) {
        case 'up': return 'text-green-600';
        case 'down': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    // 加载状态
    if (isLoading) {
      return (
        <Card className={cn("w-full", className)} ref={ref} {...props}>
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
        <Card className={cn("w-full", className)} ref={ref} {...props}>
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
      <Card className={cn("w-full", className)} ref={ref} {...props}>
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
                          "text-xs",
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
                      <p>较{data.trend.period}变化{data.trend.percentage}%</p>
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
          {/* 总量统计 */}
          <div
            className="text-center cursor-pointer hover:bg-muted/50 rounded-md p-3 transition-colors"
            onClick={() => onDataClick?.('total')}
          >
            <div className="text-3xl font-bold">{formatNumber(data.total)}</div>
            <div className="text-sm text-muted-foreground">总舆情量</div>
          </div>

          <Separator />

          {/* 情感分布 */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">情感分布</h4>

            {/* 正面情感 */}
            <div
              className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
              onClick={() => onDataClick?.('positive')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    正面
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {positivePercentage}%
                  </span>
                </div>
                <span className="font-semibold">{formatNumber(data.positive)}</span>
              </div>
              <Progress value={positivePercentage} className="h-2" />
            </div>

            {/* 负面情感 */}
            <div
              className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
              onClick={() => onDataClick?.('negative')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    负面
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {negativePercentage}%
                  </span>
                </div>
                <span className="font-semibold">{formatNumber(data.negative)}</span>
              </div>
              <Progress value={negativePercentage} className="h-2 bg-red-100" />
            </div>

            {/* 中性情感 */}
            <div
              className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
              onClick={() => onDataClick?.('neutral')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    中性
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {neutralPercentage}%
                  </span>
                </div>
                <span className="font-semibold">{formatNumber(data.neutral)}</span>
              </div>
              <Progress value={neutralPercentage} className="h-2 bg-gray-100" />
            </div>
          </div>

          {/* 对比数据 */}
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
                    <div className={cn(
                      "font-medium",
                      data.comparison.change.total > 0 ? "text-green-600" :
                      data.comparison.change.total < 0 ? "text-red-600" : "text-gray-600"
                    )}>
                      {data.comparison.change.total > 0 ? '+' : ''}
                      {formatNumber(data.comparison.change.total)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-muted-foreground">负面变化</div>
                    <div className={cn(
                      "font-medium",
                      data.comparison.change.negative > 0 ? "text-red-600" :
                      data.comparison.change.negative < 0 ? "text-green-600" : "text-gray-600"
                    )}>
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

SentimentOverviewWidget.displayName = "SentimentOverviewWidget";
```

### 样式和动画规范

```css
/* 悬浮效果 */
.sentiment-item:hover {
  @apply bg-muted/50 transition-colors duration-200;
}

/* 进度条动画 */
.progress-bar {
  @apply transition-all duration-500 ease-in-out;
}

/* 数字变化动画 */
@keyframes number-change {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.number-animate {
  animation: number-change 0.3s ease-out;
}

/* 趋势指示器 */
.trend-up {
  @apply text-green-600;
}

.trend-down {
  @apply text-red-600;
}

.trend-stable {
  @apply text-gray-600;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { SentimentOverviewWidget } from "@/components/widgets";

function Dashboard() {
  const sentimentData = {
    total: 15680,
    positive: 8920,
    negative: 3450,
    neutral: 3310,
    trend: {
      direction: 'up' as const,
      percentage: 12.5,
      period: '昨日'
    },
    lastUpdated: new Date()
  };

  const handleDataClick = (type: SentimentType) => {
    console.log('点击了:', type);
    // 跳转到详细页面
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SentimentOverviewWidget
        data={sentimentData}
        onDataClick={handleDataClick}
        onRefresh={() => fetchLatestData()}
      />
    </div>
  );
}
```

### 高级配置示例

```typescript
function AdvancedDashboard() {
  const [data, setData] = useState<SentimentOverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSentimentData().then(setData).finally(() => setIsLoading(false));
  }, []);

  return (
    <SentimentOverviewWidget
      data={data}
      isLoading={isLoading}
      showTrend={true}
      showComparison={true}
      comparisonPeriod="week"
      onDataClick={(type) => {
        // 导航到详细页面
        router.push(`/sentiment/${type}`);
      }}
      onRefresh={async () => {
        setIsLoading(true);
        const newData = await fetchSentimentData();
        setData(newData);
        setIsLoading(false);
      }}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性             | 类型                          | 默认值 | 描述             |
| ---------------- | ----------------------------- | ------ | ---------------- |
| data             | SentimentOverviewData         | -      | 舆情概览数据     |
| isLoading        | boolean                       | false  | 加载状态         |
| onRefresh        | () => void                    | -      | 刷新数据回调     |
| onDataClick      | (type: SentimentType) => void | -      | 数据点击回调     |
| showTrend        | boolean                       | true   | 是否显示趋势指标 |
| showComparison   | boolean                       | true   | 是否显示对比数据 |
| comparisonPeriod | 'day' \| 'week' \| 'month'    | 'day'  | 对比周期         |

### 事件回调

- `onDataClick`: 点击数据区域时触发，参数为数据类型
- `onRefresh`: 点击刷新按钮时触发

### ref 转发支持

组件支持 forwardRef，可以获取最外层 Card 元素的引用。

## 🎨 最佳实践

### 设计建议

1. 数据为空时显示友好的空状态
2. 大数值使用千分位分隔符格式化
3. 颜色使用要符合用户认知（绿色正面，红色负面）
4. 提供清晰的交互反馈

### 性能优化

1. 使用 React.memo 避免不必要的重渲染
2. 数字变化使用动画缓解视觉跳跃
3. 大数据量时考虑数据分页
4. 合理使用防抖处理频繁刷新
