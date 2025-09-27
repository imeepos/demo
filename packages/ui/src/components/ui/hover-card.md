# HoverCard 组件

基于 Radix UI 构建的悬停卡片组件，当用户悬停在触发元素上时显示浮动内容。

## 组件列表

### HoverCard

```tsx
import { HoverCard } from '@/components/ui/hover-card';
```

悬停卡片的根组件，等同于 `HoverCardPrimitive.Root`。

**Props:**

- 继承自 `@radix-ui/react-hover-card` Root 组件的所有属性
- `open?`: 控制是否打开
- `defaultOpen?`: 默认打开状态
- `onOpenChange?`: 打开状态变化回调
- `openDelay?`: 打开延迟时间（毫秒）
- `closeDelay?`: 关闭延迟时间（毫秒）

**使用方法:**

```tsx
<HoverCard>
  <HoverCardTrigger>悬停触发器</HoverCardTrigger>
  <HoverCardContent>悬停内容</HoverCardContent>
</HoverCard>
```

### HoverCardTrigger

```tsx
import { HoverCardTrigger } from '@/components/ui/hover-card';
```

触发悬停卡片显示的元素，等同于 `HoverCardPrimitive.Trigger`。

**Props:**

- 继承自 `@radix-ui/react-hover-card` Trigger 组件的所有属性
- `asChild?`: 是否将子元素作为触发器

**使用方法:**

```tsx
<HoverCardTrigger asChild>
  <Button variant="link">@nextjs</Button>
</HoverCardTrigger>
```

### HoverCardContent

```tsx
import { HoverCardContent } from '@/components/ui/hover-card';
```

悬停卡片的内容容器。

**Props:**

- `className?`: 额外的 CSS 类名
- `align?`: 对齐方式，默认为 "center"
- `sideOffset?`: 与触发器的距离，默认为 4
- 继承自 `@radix-ui/react-hover-card` Content 组件的所有属性

**默认样式:**

- 宽度: 256px (w-64)
- 圆角: 中等 (rounded-md)
- 边框: 默认边框
- 背景: popover 背景色
- 内边距: 16px (p-4)
- 阴影: 中等阴影
- 动画: 渐入渐出和缩放效果

**使用方法:**

```tsx
<HoverCardContent>
  <div className="flex justify-between space-x-4">
    <Avatar>
      <AvatarImage src="https://github.com/vercel.png" />
      <AvatarFallback>VC</AvatarFallback>
    </Avatar>
    <div className="space-y-1">
      <h4 className="text-sm font-semibold">@nextjs</h4>
      <p className="text-sm">
        The React Framework – created and maintained by @vercel.
      </p>
    </div>
  </div>
</HoverCardContent>
```

## 完整示例

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays } from 'lucide-react';

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## 自定义对齐和偏移

```tsx
<HoverCard>
  <HoverCardTrigger>触发器</HoverCardTrigger>
  <HoverCardContent align="start" sideOffset={10} className="w-96">
    自定义对齐和偏移的内容
  </HoverCardContent>
</HoverCard>
```

## 控制打开状态

```tsx
const [open, setOpen] = useState(false)

<HoverCard open={open} onOpenChange={setOpen}>
  <HoverCardTrigger>受控触发器</HoverCardTrigger>
  <HoverCardContent>
    受控内容
  </HoverCardContent>
</HoverCard>
```

## 设置延迟时间

```tsx
<HoverCard openDelay={500} closeDelay={300}>
  <HoverCardTrigger>延迟触发器</HoverCardTrigger>
  <HoverCardContent>延迟显示的内容</HoverCardContent>
</HoverCard>
```

## 特性

- **可访问性**: 完全支持键盘导航和屏幕阅读器
- **动画**: 内置渐入渐出和缩放动画效果
- **灵活定位**: 支持多种对齐方式和偏移设置
- **延迟控制**: 可自定义打开和关闭延迟时间
- **响应式**: 自动调整位置以适应屏幕边界

## 依赖项

- `@radix-ui/react-hover-card`: 悬停卡片原语组件
- `../../lib/utils`: 工具函数 (cn)
