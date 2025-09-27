# TrendArrow - 趋势箭头组件

## 📋 组件概述

TrendArrow 是专为趋势展示设计的箭头指示器组件，提供上升、下降、平稳三种状态的直观展示。支持数值和百分比变化显示，帮助用户快速了解数据变化趋势。

## 🛠️ 技术实现

### TypeScript 接口定义

```typescript
interface TrendArrowProps {
  trend: TrendDirection;
  value?: number;
  percentage?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

type TrendDirection = 'up' | 'down' | 'stable';
```

### 关键实现逻辑

```typescript
const TrendArrow = forwardRef<HTMLDivElement, TrendArrowProps>(
  ({
    trend,
    value,
    percentage,
    showValue = true,
    size = 'md',
    animated = true,
    className,
    ...props
  }, ref) => {
    const trendConfigs = {
      up: { icon: '↗', color: 'text-green-600', bg: 'bg-green-50' },
      down: { icon: '↘', color: 'text-red-600', bg: 'bg-red-50' },
      stable: { icon: '→', color: 'text-gray-600', bg: 'bg-gray-50' }
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
      <Badge
        variant="outline"
        className={cn(
          "inline-flex items-center space-x-1",
          config.bg,
          config.color,
          animated && trend !== 'stable' && "animate-pulse",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className={cn(
          size === 'sm' && "text-sm",
          size === 'md' && "text-base",
          size === 'lg' && "text-lg"
        )}>
          {config.icon}
        </span>

        {showValue && (value !== undefined || percentage !== undefined) && (
          <span className="font-medium text-xs">
            {formatValue()}
          </span>
        )}
      </Badge>
    );
  }
);
```

## 📝 使用示例

```typescript
// 基本趋势箭头
<TrendArrow trend="up" percentage={12.5} />
<TrendArrow trend="down" value={-350} />
<TrendArrow trend="stable" />

// 不同尺寸
<TrendArrow trend="up" percentage={8.2} size="lg" />
```
