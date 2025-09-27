# StatusIndicator - 状态指示器组件

## 📋 组件概述

StatusIndicator 是专为状态展示设计的指示器组件，提供实时状态显示和动画效果。支持多种状态类型和视觉样式，帮助用户快速了解系统或数据状态。

## 🛠️ 技术实现

### TypeScript 接口定义

```typescript
interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

type StatusType =
  | 'online'
  | 'offline'
  | 'busy'
  | 'away'
  | 'error'
  | 'success'
  | 'warning'
  | 'loading';
```

### 关键实现逻辑

```typescript
const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({
    status,
    label,
    showLabel = false,
    size = 'md',
    animated = true,
    className,
    ...props
  }, ref) => {
    const statusConfigs = {
      online: { color: 'bg-green-500', label: '在线' },
      offline: { color: 'bg-gray-400', label: '离线' },
      busy: { color: 'bg-red-500', label: '忙碌' },
      away: { color: 'bg-yellow-500', label: '离开' },
      error: { color: 'bg-red-600', label: '错误' },
      success: { color: 'bg-green-600', label: '成功' },
      warning: { color: 'bg-orange-500', label: '警告' },
      loading: { color: 'bg-blue-500', label: '加载中' }
    };

    const config = statusConfigs[status];

    const sizeClasses = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4'
    };

    return (
      <div
        className={cn("inline-flex items-center space-x-2", className)}
        ref={ref}
        {...props}
      >
        <div className={cn(
          "rounded-full",
          sizeClasses[size],
          config.color,
          animated && (status === 'loading' || status === 'busy') && "animate-pulse"
        )} />

        {showLabel && (
          <span className="text-sm text-muted-foreground">
            {label || config.label}
          </span>
        )}
      </div>
    );
  }
);
```

## 📝 使用示例

```typescript
// 基本状态指示器
<StatusIndicator status="online" />
<StatusIndicator status="error" showLabel />

// 自定义标签
<StatusIndicator
  status="loading"
  label="数据同步中..."
  showLabel
  size="lg"
/>

// 状态列表
const statuses = ['online', 'busy', 'away', 'offline'];
<div className="space-y-2">
  {statuses.map(status => (
    <StatusIndicator
      key={status}
      status={status}
      showLabel
      animated
    />
  ))}
</div>
```
