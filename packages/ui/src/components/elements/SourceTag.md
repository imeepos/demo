# SourceTag - 信息来源标签组件

## 📋 组件概述

SourceTag 是专为信息来源标识设计的标签组件，提供媒体图标、名称显示和详细信息悬浮卡片。支持多种媒体类型和交互功能，帮助用户快速识别信息来源。

## 🛠️ 技术实现

### TypeScript 接口定义

```typescript
interface SourceTagProps {
  source: SourceInfo;
  showIcon?: boolean;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (source: SourceInfo) => void;
  className?: string;
}

interface SourceInfo {
  id: string;
  name: string;
  type: 'news' | 'social' | 'forum' | 'video' | 'blog';
  url?: string;
  icon?: string;
  verified?: boolean;
  followers?: number;
}
```

### 关键实现逻辑

```typescript
const SourceTag = forwardRef<HTMLDivElement, SourceTagProps>(
  ({
    source,
    showIcon = true,
    showDetails = true,
    size = 'md',
    onClick,
    className,
    ...props
  }, ref) => {
    const sourceIcons = {
      news: '📰',
      social: '📱',
      forum: '💬',
      video: '📺',
      blog: '✍️'
    };

    const content = (
      <Badge
        variant="outline"
        className={cn(
          "inline-flex items-center space-x-1 cursor-pointer hover:bg-muted",
          className
        )}
        onClick={() => onClick?.(source)}
        ref={ref}
        {...props}
      >
        {showIcon && (
          <span>{source.icon || sourceIcons[source.type]}</span>
        )}
        <span>{source.name}</span>
        {source.verified && <span className="text-blue-500">✓</span>}
      </Badge>
    );

    if (showDetails) {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            {content}
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{source.icon || sourceIcons[source.type]}</span>
                <div>
                  <h4 className="font-medium">{source.name}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{source.type}</p>
                </div>
              </div>

              {source.followers && (
                <p className="text-sm">关注者: {source.followers.toLocaleString()}</p>
              )}

              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  访问来源
                </a>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    }

    return content;
  }
);
```

## 📝 使用示例

```typescript
const sourceInfo = {
  id: 'weibo-tech',
  name: '科技微博',
  type: 'social',
  verified: true,
  followers: 1250000,
  url: 'https://weibo.com/tech'
};

<SourceTag
  source={sourceInfo}
  onClick={(source) => filterBySource(source.id)}
/>
```
