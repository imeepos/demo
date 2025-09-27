# Popover 组件

基于 Radix UI 构建的弹出框组件，用于显示临时内容，如工具提示、菜单或表单。

## 组件列表

### Popover

```tsx
import { Popover } from '@/components/ui/popover';
```

弹出框的根容器组件，等同于 `PopoverPrimitive.Root`。

**Props:**

- 继承自 `@radix-ui/react-popover` Root 组件的所有属性
- `open?`: 控制弹出框的打开状态
- `defaultOpen?`: 默认打开状态
- `onOpenChange?`: 打开状态变化回调
- `modal?`: 是否为模态弹出框

### PopoverTrigger

```tsx
import { PopoverTrigger } from '@/components/ui/popover';
```

触发弹出框显示的元素，等同于 `PopoverPrimitive.Trigger`。

**Props:**

- 继承自 `@radix-ui/react-popover` Trigger 组件的所有属性
- `asChild?`: 是否将子元素作为触发器

### PopoverContent

```tsx
import { PopoverContent } from '@/components/ui/popover';
```

弹出框的内容容器。

**Props:**

- `className?`: 额外的 CSS 类名
- `align?`: 对齐方式，默认为 "center"
- `sideOffset?`: 与触发器的距离，默认为 4
- 继承自 `@radix-ui/react-popover` Content 组件的所有属性

**默认样式:**

- 宽度: 288px (w-72)
- 圆角: 中等 (rounded-md)
- 边框: 默认边框
- 背景: popover 背景色
- 内边距: 16px (p-4)
- 文字: popover 前景色
- 阴影: 中等阴影
- 动画: 渐入渐出和缩放效果
- 响应位置: 根据方向自动调整入场动画

## 基础用法

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">打开弹出框</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>这是一个弹出框的内容。</p>
      </PopoverContent>
    </Popover>
  );
}
```

## 表单弹出框

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PopoverForm() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">设置</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">尺寸</h4>
            <p className="text-sm text-muted-foreground">设置元素的尺寸。</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">宽度</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">最大宽度</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">高度</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">最大高度</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## 日期选择器弹出框

```tsx
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>选择日期</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
```

## 颜色选择器

```tsx
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function ColorPicker() {
  const [color, setColor] = useState('#ff0000');

  const colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
    '#000000',
    '#ffffff',
    '#808080',
    '#800000',
    '#008000',
    '#000080',
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          <div
            className="w-4 h-4 rounded-sm border mr-2"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-6 gap-2">
          {colors.map(c => (
            <button
              key={c}
              className="w-8 h-8 rounded-sm border border-gray-300 hover:scale-105 transition-transform"
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <div className="mt-4">
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-full h-8 rounded border"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## 用户资料卡片

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function UserProfilePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@username" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Sofia Chen</h4>
              <Badge variant="secondary">Pro</Badge>
            </div>
            <p className="text-sm text-muted-foreground">@sofia_chen</p>
            <p className="text-sm">
              Product Designer at Acme Inc. Passionate about creating intuitive
              user experiences.
            </p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                关注
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                消息
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## 受控弹出框

```tsx
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function ControlledPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{open ? '关闭弹出框' : '打开弹出框'}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <p>这是一个受控的弹出框。</p>
          <Button size="sm" onClick={() => setOpen(false)} className="w-full">
            关闭
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## 自定义位置和对齐

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function CustomPositionPopover() {
  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">顶部</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p>这个弹出框显示在顶部。</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">右侧</Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="start">
          <p>这个弹出框显示在右侧。</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">左侧</Button>
        </PopoverTrigger>
        <PopoverContent side="left" align="end">
          <p>这个弹出框显示在左侧。</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

## 嵌套弹出框

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function NestedPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">主弹出框</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <p>这是主弹出框的内容。</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">
                嵌套弹出框
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <p>这是嵌套的弹出框内容。</p>
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## 带箭头的弹出框

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function PopoverWithArrow() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">带箭头</Button>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-popover border-l border-t rotate-45"></div>
        </div>
        <p>这个弹出框有一个指向触发器的箭头。</p>
      </PopoverContent>
    </Popover>
  );
}
```

## 特性

- **灵活定位**: 支持多种对齐方式和位置设置
- **动画效果**: 流畅的打开和关闭动画
- **键盘导航**: 完整的键盘操作支持
- **可访问性**: 基于 Radix UI 的完整无障碍访问支持
- **Portal 渲染**: 自动渲染到 body 元素，避免层级问题
- **边界检测**: 自动调整位置以适应屏幕边界
- **受控/非受控**: 支持受控和非受控使用方式

## 依赖项

- `@radix-ui/react-popover`: Popover 原语组件
- `@/lib/utils`: 工具函数 (cn)
