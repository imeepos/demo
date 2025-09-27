# Avatar 组件文档

基于 Radix UI 的头像组件，支持图片显示和文字降级显示。

## 组件结构

- `Avatar`: 头像容器组件，默认圆形设计
- `AvatarImage`: 头像图片组件
- `AvatarFallback`: 头像降级显示组件，当图片加载失败时显示

## 基本用法

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="用户头像" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>;
```

## 使用场景

### 用户头像

```tsx
<Avatar>
  <AvatarImage src="https://github.com/username.png" alt="@username" />
  <AvatarFallback>用户</AvatarFallback>
</Avatar>
```

### 头像列表

```tsx
<div className="flex space-x-2">
  <Avatar>
    <AvatarImage src="/user1.jpg" alt="用户1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/user2.jpg" alt="用户2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/user3.jpg" alt="用户3" />
    <AvatarFallback>U3</AvatarFallback>
  </Avatar>
</div>
```

### 不同尺寸

```tsx
// 小尺寸
<Avatar className="h-8 w-8">
  <AvatarImage src="/small-avatar.jpg" />
  <AvatarFallback className="text-xs">S</AvatarFallback>
</Avatar>

// 默认尺寸 (h-10 w-10)
<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>M</AvatarFallback>
</Avatar>

// 大尺寸
<Avatar className="h-16 w-16">
  <AvatarImage src="/large-avatar.jpg" />
  <AvatarFallback className="text-lg">L</AvatarFallback>
</Avatar>
```

## 样式特点

- 默认尺寸：40x40px (`h-10 w-10`)
- 圆形边框：`rounded-full`
- 图片自适应：`aspect-square` 保持正方形比例
- 降级背景：浅灰色背景 (`bg-muted`)
- 内容居中：降级内容自动居中显示

## 降级策略

当图片加载失败或网络问题时，会自动显示 `AvatarFallback` 内容：

```tsx
<Avatar>
  <AvatarImage src="/non-existent-image.jpg" alt="不存在的图片" />
  <AvatarFallback>备用</AvatarFallback>
</Avatar>
```

## 自定义样式

```tsx
// 方形头像
<Avatar className="rounded-lg">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>方形</AvatarFallback>
</Avatar>

// 自定义颜色
<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback className="bg-blue-500 text-white">
    蓝色
  </AvatarFallback>
</Avatar>

// 边框样式
<Avatar className="border-2 border-blue-500">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>边框</AvatarFallback>
</Avatar>
```

## 可访问性

- 支持 alt 属性用于屏幕阅读器
- 自动处理图片加载状态
- 降级内容提供文字替代
- 遵循无障碍设计原则
