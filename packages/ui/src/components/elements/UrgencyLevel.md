# UrgencyLevel - 紧急程度组件

## 📋 组件概述

UrgencyLevel 是专为舆情紧急程度展示设计的指示器组件，提供五级紧急程度的直观展示。支持进度条形式和动态颜色渐变，帮助用户快速识别事件优先级。

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Badge: 紧急等级标识容器
- Progress: 紧急程度进度条
- Tooltip: 详细说明悬浮提示
```

## 🛠️ 技术实现

### TypeScript 接口定义

```typescript
interface UrgencyLevelProps {
  level: UrgencyLevel;
  showProgress?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'progress' | 'combined';
  animated?: boolean;
  onClick?: (level: UrgencyLevel) => void;
  className?: string;
}

type UrgencyLevel = 'very-low' | 'low' | 'medium' | 'high' | 'critical';
```

### 关键实现逻辑

```typescript
const UrgencyLevel = forwardRef<HTMLDivElement, UrgencyLevelProps>(
  ({
    level,
    showProgress = true,
    showLabel = true,
    size = 'md',
    variant = 'combined',
    animated = true,
    onClick,
    className,
    ...props
  }, ref) => {
    const urgencyConfigs = {
      'very-low': { label: '极低', value: 20, color: 'bg-green-500', icon: '🟢' },
      'low': { label: '低', value: 40, color: 'bg-yellow-500', icon: '🟡' },
      'medium': { label: '中', value: 60, color: 'bg-orange-500', icon: '🟠' },
      'high': { label: '高', value: 80, color: 'bg-red-500', icon: '🔴' },
      'critical': { label: '极高', value: 100, color: 'bg-red-600', icon: '🚨' }
    };

    const config = urgencyConfigs[level];

    return (
      <div
        className={cn("flex items-center space-x-2", className)}
        onClick={() => onClick?.(level)}
        ref={ref}
        {...props}
      >
        {showLabel && (
          <Badge
            variant={level === 'critical' ? 'destructive' : 'secondary'}
            className={cn(
              animated && level === 'critical' && "animate-pulse"
            )}
          >
            {config.icon} {config.label}
          </Badge>
        )}

        {showProgress && (
          <Progress
            value={config.value}
            className={cn(
              "flex-1",
              size === 'sm' && "h-1",
              size === 'md' && "h-2",
              size === 'lg' && "h-3"
            )}
          />
        )}
      </div>
    );
  }
);
```

## 📝 使用示例

```typescript
// 基本使用
<UrgencyLevel level="high" />

// 只显示进度条
<UrgencyLevel level="critical" showLabel={false} />

// 可点击的紧急程度
<UrgencyLevel
  level="medium"
  onClick={(level) => filterByUrgency(level)}
/>
```
