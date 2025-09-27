# Skeleton 组件文档

Skeleton 组件用于在内容加载时显示占位符，提供更好的用户体验。

## 组件导出

```typescript
import { Skeleton } from '@/components/ui/skeleton';
```

## 基本用法

```tsx
<Skeleton className="h-4 w-[250px]" />
```

## 组件说明

Skeleton 组件是一个简单的占位符组件，具有脉冲动画效果。它接受所有标准的 HTML div 属性。

## 属性

继承所有 `React.HTMLAttributes<HTMLDivElement>` 属性：

| 属性      | 类型   | 描述           |
| --------- | ------ | -------------- |
| className | string | 自定义样式类名 |

## 使用示例

### 基本骨架屏

```tsx
<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

### 卡片骨架屏

```tsx
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

### 文章列表骨架屏

```tsx
<div className="space-y-4">
  {Array.from({ length: 3 }).map((_, i) => (
    <div key={i} className="space-y-2">
      <Skeleton className="h-6 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ))}
</div>
```

### 图片骨架屏

```tsx
<div className="space-y-3">
  <Skeleton className="h-[200px] w-full rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

### 表格骨架屏

```tsx
<div className="space-y-2">
  <div className="grid grid-cols-3 gap-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="grid grid-cols-3 gap-4">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  ))}
</div>
```

## 样式自定义

默认样式包括：

- `animate-pulse`: 脉冲动画
- `rounded-md`: 中等圆角
- `bg-muted`: 静音背景色

可以通过 `className` 属性覆盖或添加自定义样式：

```tsx
<Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
```
