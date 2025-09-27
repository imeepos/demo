# TimelineMarker - 时间轴标记组件

## 📋 组件概述

TimelineMarker 是专为时间轴展示设计的标记组件，提供事件节点可视化、时间戳和描述信息展示。支持不同事件类型和交互功能，帮助用户理解事件发展轨迹。

## 🛠️ 技术实现

### TypeScript 接口定义

```typescript
interface TimelineMarkerProps {
  event: TimelineEvent;
  position?: 'left' | 'right' | 'center';
  showTime?: boolean;
  onClick?: (event: TimelineEvent) => void;
  className?: string;
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  title: string;
  description?: string;
  type: 'info' | 'warning' | 'success' | 'error';
  icon?: string;
}
```

### 关键实现逻辑

```typescript
const TimelineMarker = forwardRef<HTMLDivElement, TimelineMarkerProps>(
  ({
    event,
    position = 'left',
    showTime = true,
    onClick,
    className,
    ...props
  }, ref) => {
    const typeConfigs = {
      info: { color: 'bg-blue-500', icon: 'ℹ️' },
      warning: { color: 'bg-yellow-500', icon: '⚠️' },
      success: { color: 'bg-green-500', icon: '✅' },
      error: { color: 'bg-red-500', icon: '❌' }
    };

    const config = typeConfigs[event.type];

    return (
      <div
        className={cn(
          "flex items-start space-x-3",
          position === 'right' && "flex-row-reverse space-x-reverse",
          className
        )}
        onClick={() => onClick?.(event)}
        ref={ref}
        {...props}
      >
        {/* 时间轴节点 */}
        <div className="relative">
          <div className={cn(
            "w-3 h-3 rounded-full border-2 border-white shadow",
            config.color
          )} />
          <div className="absolute top-3 left-1/2 w-0.5 h-6 bg-gray-200 transform -translate-x-1/2" />
        </div>

        {/* 事件内容 */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border rounded-lg p-3 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span>{event.icon || config.icon}</span>
                <h4 className="font-medium text-sm">{event.title}</h4>
              </div>

              {showTime && (
                <time className="text-xs text-muted-foreground">
                  {event.timestamp.toLocaleTimeString()}
                </time>
              )}
            </div>

            {event.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
```

## 📝 使用示例

```typescript
const timelineEvents = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T10:30:00'),
    title: '负面舆情出现',
    description: '某品牌相关负面信息开始传播',
    type: 'warning'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T14:20:00'),
    title: '官方回应发布',
    description: '品牌方发布正式声明回应争议',
    type: 'info'
  }
];

<div className="space-y-4">
  {timelineEvents.map(event => (
    <TimelineMarker
      key={event.id}
      event={event}
      onClick={(event) => viewEventDetails(event.id)}
    />
  ))}
</div>
```
