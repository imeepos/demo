# SentimentIndicator - 情感指示器组件

## 📋 组件概述

SentimentIndicator 是专为舆情情感展示设计的指示器组件，提供直观的情感倾向可视化。支持多种展示样式和交互效果，帮助用户快速识别和理解情感分布。

### 核心业务场景

- 舆情情感倾向标识
- 内容情感分类展示
- 情感数据快速识别
- 情感趋势对比显示

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Badge: 情感标识主体容器
- Tooltip: 详细信息悬浮提示
- Progress: 情感置信度显示
- Avatar: 情感图标展示
```

### 视觉一致性要求

- 明确的情感色彩编码系统
- 统一的图标和文字搭配
- 一致的悬浮提示样式
- 响应式尺寸适配

### 交互行为规范

- 悬浮显示详细信息
- 点击触发相关操作
- 支持键盘导航
- 平滑的状态变化

## 🔧 核心用途

### 主要功能

1. **情感标识**: 清晰标识正面、负面、中性情感
2. **置信度展示**: 显示情感分析的准确度
3. **交互提示**: 提供详细的情感分析信息
4. **批量展示**: 支持情感列表和统计展示

### 适用业务场景

- 舆情数据列表
- 内容情感分析
- 用户反馈展示
- 评论情感标注

### 用户交互流程

1. 查看情感指示器颜色和图标
2. 悬浮查看详细情感信息
3. 点击筛选同类情感内容
4. 对比不同内容的情感分布

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
```

### TypeScript 接口定义

```typescript
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
```

### 关键实现逻辑

```typescript
const SentimentIndicator = forwardRef<HTMLDivElement, SentimentIndicatorProps>(
  ({
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
  }, ref) => {
    // 情感配置映射
    const sentimentConfigs: Record<SentimentType, SentimentConfig> = {
      positive: {
        type: 'positive',
        label: '正面',
        color: '#22c55e',
        icon: '😊',
        description: '积极、正面的情感倾向',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200'
      },
      negative: {
        type: 'negative',
        label: '负面',
        color: '#ef4444',
        icon: '😞',
        description: '消极、负面的情感倾向',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200'
      },
      neutral: {
        type: 'neutral',
        label: '中性',
        color: '#6b7280',
        icon: '😐',
        description: '中性、客观的情感倾向',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200'
      },
      mixed: {
        type: 'mixed',
        label: '复合',
        color: '#f59e0b',
        icon: '🤔',
        description: '包含多种情感的复合倾向',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200'
      },
      unknown: {
        type: 'unknown',
        label: '未知',
        color: '#9ca3af',
        icon: '❓',
        description: '无法确定的情感倾向',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-500',
        borderColor: 'border-gray-200'
      }
    };

    const config = sentimentConfigs[sentiment];

    // 尺寸配置
    const sizeConfigs = {
      xs: {
        badge: 'text-xs px-1.5 py-0.5',
        icon: 'text-xs',
        progress: 'h-1'
      },
      sm: {
        badge: 'text-xs px-2 py-1',
        icon: 'text-sm',
        progress: 'h-1.5'
      },
      md: {
        badge: 'text-sm px-2.5 py-1',
        icon: 'text-base',
        progress: 'h-2'
      },
      lg: {
        badge: 'text-base px-3 py-1.5',
        icon: 'text-lg',
        progress: 'h-2.5'
      },
      xl: {
        badge: 'text-lg px-4 py-2',
        icon: 'text-xl',
        progress: 'h-3'
      }
    };

    const sizeConfig = sizeConfigs[size];

    // 变体样式
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

    // 处理点击事件
    const handleClick = () => {
      if (!disabled && onClick) {
        onClick(sentiment);
      }
    };

    // 处理悬浮事件
    const handleMouseEnter = () => {
      if (!disabled && onHover) {
        onHover(sentiment);
      }
    };

    // 格式化分数显示
    const formatScore = (value?: number) => {
      if (value === undefined) return '';
      return (value * 100).toFixed(1) + '%';
    };

    // 获取置信度颜色
    const getConfidenceColor = (confidence?: number) => {
      if (!confidence) return 'bg-gray-200';
      if (confidence >= 0.8) return 'bg-green-500';
      if (confidence >= 0.6) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    // 渲染内容
    const renderContent = () => (
      <div
        className={cn(
          "inline-flex items-center space-x-1 rounded-full transition-all duration-200",
          sizeConfig.badge,
          getVariantClasses(),
          onClick && !disabled && "cursor-pointer hover:scale-105",
          disabled && "opacity-50 cursor-not-allowed",
          animated && "transition-all duration-200 ease-in-out",
          className
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        ref={ref}
        {...props}
      >
        {/* 情感图标 */}
        {showIcon && (
          <span className={cn("shrink-0", sizeConfig.icon)}>
            {config.icon}
          </span>
        )}

        {/* 情感标签 */}
        <span className="font-medium">{config.label}</span>

        {/* 分数显示 */}
        {showScore && score !== undefined && (
          <span className="text-xs opacity-80">
            {formatScore(score)}
          </span>
        )}
      </div>
    );

    // 渲染工具提示内容
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
                className={cn("h-1.5", getConfidenceColor(confidence))}
              />
            </div>
          )}
        </div>
      );
    };

    // 如果有工具提示，包装在 Tooltip 中
    if (tooltip !== undefined || score !== undefined || confidence !== undefined) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {renderContent()}
            </TooltipTrigger>
            <TooltipContent>
              {renderTooltipContent()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return renderContent();
  }
);

SentimentIndicator.displayName = "SentimentIndicator";
```

### 样式和动画规范

```css
/* 悬浮缩放效果 */
.sentiment-hover:hover {
  @apply transform scale-105 transition-transform duration-200;
}

/* 情感渐变动画 */
.sentiment-gradient {
  @apply bg-gradient-to-r animate-gradient-x;
}

@keyframes gradient-x {
  0%,
  100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

/* 脉冲动画（用于实时更新） */
.sentiment-pulse {
  @apply animate-pulse;
}

/* 情感指示器组合显示 */
.sentiment-group {
  @apply flex items-center space-x-2;
}

/* 禁用状态 */
.sentiment-disabled {
  @apply opacity-50 cursor-not-allowed;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { SentimentIndicator } from "@/components/elements";

function SentimentDisplay() {
  return (
    <div className="space-y-4">
      {/* 基本情感指示器 */}
      <SentimentIndicator sentiment="positive" />
      <SentimentIndicator sentiment="negative" />
      <SentimentIndicator sentiment="neutral" />

      {/* 带分数的指示器 */}
      <SentimentIndicator
        sentiment="positive"
        score={0.85}
        showScore={true}
        confidence={0.92}
      />

      {/* 不同尺寸 */}
      <div className="flex items-center space-x-2">
        <SentimentIndicator sentiment="positive" size="xs" />
        <SentimentIndicator sentiment="positive" size="sm" />
        <SentimentIndicator sentiment="positive" size="md" />
        <SentimentIndicator sentiment="positive" size="lg" />
        <SentimentIndicator sentiment="positive" size="xl" />
      </div>

      {/* 不同变体 */}
      <div className="space-y-2">
        <SentimentIndicator sentiment="positive" variant="default" />
        <SentimentIndicator sentiment="positive" variant="subtle" />
        <SentimentIndicator sentiment="positive" variant="outline" />
        <SentimentIndicator sentiment="positive" variant="solid" />
        <SentimentIndicator sentiment="positive" variant="gradient" />
      </div>
    </div>
  );
}
```

### 高级配置示例

```typescript
function AdvancedSentimentDisplay() {
  const handleSentimentClick = (sentiment: SentimentType) => {
    console.log('点击情感:', sentiment);
    // 筛选同类情感内容
    filterBySentiment(sentiment);
  };

  const customTooltip = (
    <div>
      <h4>情感分析详情</h4>
      <p>基于深度学习模型分析</p>
      <p>准确率: 95.2%</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* 可点击的情感指示器 */}
      <SentimentIndicator
        sentiment="positive"
        score={0.89}
        confidence={0.95}
        onClick={handleSentimentClick}
        showScore={true}
        animated={true}
      />

      {/* 自定义工具提示 */}
      <SentimentIndicator
        sentiment="negative"
        tooltip={customTooltip}
        variant="gradient"
        size="lg"
      />

      {/* 情感组合展示 */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-muted-foreground">文章情感:</span>
        <SentimentIndicator
          sentiment="mixed"
          showIcon={true}
          onClick={handleSentimentClick}
        />
        <span className="text-xs text-muted-foreground">
          (复合情感，包含正面和负面)
        </span>
      </div>
    </div>
  );
}
```

### 列表中的应用示例

```typescript
function SentimentList({ items }: { items: SentimentItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex-1">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.content}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <SentimentIndicator
              sentiment={item.sentiment}
              score={item.score}
              confidence={item.confidence}
              size="sm"
              onClick={(sentiment) => filterBySentiment(sentiment)}
            />

            <span className="text-xs text-muted-foreground">
              {item.timestamp.toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 📖 API 文档

### Props 接口

| 属性       | 类型                               | 默认值    | 描述           |
| ---------- | ---------------------------------- | --------- | -------------- |
| sentiment  | SentimentType                      | -         | 情感类型       |
| score      | number                             | -         | 情感分数 (0-1) |
| confidence | number                             | -         | 置信度 (0-1)   |
| showScore  | boolean                            | false     | 是否显示分数   |
| showIcon   | boolean                            | true      | 是否显示图标   |
| size       | SentimentSize                      | 'md'      | 组件尺寸       |
| variant    | SentimentVariant                   | 'default' | 显示变体       |
| onClick    | (sentiment: SentimentType) => void | -         | 点击回调       |
| onHover    | (sentiment: SentimentType) => void | -         | 悬浮回调       |
| tooltip    | string \| ReactNode                | -         | 自定义工具提示 |
| disabled   | boolean                            | false     | 是否禁用       |
| animated   | boolean                            | true      | 是否启用动画   |

### 事件回调

- `onClick`: 点击情感指示器时触发
- `onHover`: 鼠标悬浮时触发

### ref 转发支持

组件支持 forwardRef，可以获取最外层 div 元素的引用。

## 🎨 最佳实践

### 设计建议

1. 情感颜色要符合用户认知习惯
2. 图标和文字要保持一致性
3. 工具提示信息要简洁有用
4. 尺寸选择要适合使用场景

### 性能优化

1. 使用 CSS 变量减少样式计算
2. 避免在大列表中使用复杂动画
3. 合理使用 memo 避免不必要的重渲染
4. 工具提示内容使用懒加载
