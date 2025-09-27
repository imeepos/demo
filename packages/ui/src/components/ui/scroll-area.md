# ScrollArea 组件

基于 `@radix-ui/react-scroll-area` 构建的自定义滚动区域组件，提供美观的滚动条样式。

## 组件导出

### ScrollArea

主滚动容器组件，包装内容并提供自定义滚动条。

**Props:**

- 继承 `@radix-ui/react-scroll-area` 的 `Root` 所有属性
- `className?: string` - 额外的CSS类名
- `children: React.ReactNode` - 滚动区域内的内容

**默认样式:**

- `relative overflow-hidden` - 相对定位，隐藏默认滚动条

**内部结构:**

- `ScrollAreaPrimitive.Viewport` - 视口区域，应用圆角继承
- `ScrollBar` - 垂直滚动条（默认）
- `ScrollAreaPrimitive.Corner` - 滚动条角落

### ScrollBar

滚动条组件，可单独使用或作为 ScrollArea 的一部分。

**Props:**

- 继承 `@radix-ui/react-scroll-area` 的 `ScrollAreaScrollbar` 所有属性
- `className?: string` - 额外的CSS类名
- `orientation?: "vertical" | "horizontal"` - 滚动条方向，默认 "vertical"

**样式特性:**

- 垂直滚动条: `h-full w-2.5` - 宽度 2.5，左边框透明
- 水平滚动条: `h-2.5 flex-col` - 高度 2.5，顶边框透明
- 滚动条拇指: `rounded-full bg-border` - 圆角背景色

## 使用示例

### 基础滚动区域

```jsx
import { ScrollArea } from '@/components/ui/scroll-area';

export function BasicScrollArea() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="text-sm">
            滚动项目 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### 水平滚动

```jsx
export function HorizontalScrollArea() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="shrink-0 w-32 h-20 bg-muted rounded-md">
            卡片 {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
```

### 固定高度内容区

```jsx
export function FixedHeightScrollArea() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-16 bg-background border-b">头部区域</header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              长内容项目 {i + 1}
              <p className="text-muted-foreground">这里是详细内容...</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

### 自定义滚动条样式

```jsx
export function CustomScrollArea() {
  return (
    <ScrollArea className="h-80 w-64 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">标签列表</h4>
        <div className="space-y-2">
          {[
            'React',
            'Vue',
            'Angular',
            'Svelte',
            'Next.js',
            'Nuxt.js',
            'Gatsby',
          ].map(tag => (
            <div key={tag} className="text-sm p-2 bg-muted rounded">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar className="w-3" />
    </ScrollArea>
  );
}
```

### 双向滚动

```jsx
export function BidirectionalScrollArea() {
  return (
    <ScrollArea className="h-72 w-96 rounded-md border">
      <div className="w-[800px] h-[600px] p-4">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
```

### 聊天消息列表

```jsx
export function ChatScrollArea() {
  return (
    <ScrollArea className="h-96 w-80 rounded-lg border bg-background">
      <div className="p-4 space-y-3">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.isOwn
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## 注意事项

1. **尺寸设置:** ScrollArea 需要明确的高度或宽度限制才能正常工作
2. **方向控制:** 默认只显示垂直滚动条，水平滚动需要额外添加 ScrollBar 组件
3. **内容溢出:** 确保内容实际超出容器尺寸才会显示滚动条
4. **样式继承:** 视口区域会继承容器的圆角样式
5. **无障碍访问:** 组件内置键盘导航和屏幕阅读器支持

## 依赖

- `@radix-ui/react-scroll-area`
- `../../lib/utils` (cn 函数)
