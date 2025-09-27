# QuickActionButton - 快捷操作按钮组件

## 📋 组件概述

QuickActionButton 是专为快捷操作设计的按钮组件，提供主要操作和下拉次要操作的组合。支持权限控制、图标文字组合和多种样式变体，帮助用户高效完成常用操作。

## 🛠️ 技术实现

### TypeScript 接口定义

```typescript
interface QuickActionButtonProps {
  primaryAction: ActionConfig;
  secondaryActions?: ActionConfig[];
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

interface ActionConfig {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
}
```

### 关键实现逻辑

```typescript
const QuickActionButton = forwardRef<HTMLDivElement, QuickActionButtonProps>(
  ({
    primaryAction,
    secondaryActions = [],
    size = 'default',
    variant = 'default',
    disabled = false,
    loading = false,
    className,
    ...props
  }, ref) => {
    if (secondaryActions.length === 0) {
      // 单一操作按钮
      return (
        <Button
          variant={variant}
          size={size}
          disabled={disabled || primaryAction.disabled}
          onClick={primaryAction.onClick}
          className={cn("space-x-1", className)}
          ref={ref}
          {...props}
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : primaryAction.icon ? (
            <span>{primaryAction.icon}</span>
          ) : null}
          <span>{primaryAction.label}</span>
        </Button>
      );
    }

    // 组合操作按钮
    return (
      <div className={cn("flex", className)} ref={ref} {...props}>
        {/* 主要操作 */}
        <Button
          variant={variant}
          size={size}
          disabled={disabled || primaryAction.disabled}
          onClick={primaryAction.onClick}
          className="rounded-r-none border-r-0"
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : primaryAction.icon ? (
            <span className="mr-1">{primaryAction.icon}</span>
          ) : null}
          {primaryAction.label}
        </Button>

        {/* 下拉操作 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
              disabled={disabled}
              className="rounded-l-none px-2"
            >
              ⌄
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {secondaryActions.map((action) => (
              <DropdownMenuItem
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  action.destructive && "text-red-600 focus:text-red-600"
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
                {action.shortcut && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {action.shortcut}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);
```

## 📝 使用示例

```typescript
const primaryAction = {
  id: 'process',
  label: '处理',
  icon: '✅',
  onClick: () => processAlert()
};

const secondaryActions = [
  {
    id: 'assign',
    label: '分配',
    icon: '👤',
    onClick: () => assignAlert(),
    shortcut: 'Ctrl+A'
  },
  {
    id: 'escalate',
    label: '升级',
    icon: '⬆️',
    onClick: () => escalateAlert()
  },
  {
    id: 'delete',
    label: '删除',
    icon: '🗑️',
    onClick: () => deleteAlert(),
    destructive: true,
    shortcut: 'Del'
  }
];

<QuickActionButton
  primaryAction={primaryAction}
  secondaryActions={secondaryActions}
  size="sm"
/>
```
