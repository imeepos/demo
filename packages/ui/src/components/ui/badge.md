# Badge 组件文档

基于 class-variance-authority 的徽章组件，用于显示状态标签和标记信息。

## 组件结构

- `Badge`: 主要徽章组件，支持多种变体样式
- `BadgeProps`: TypeScript 接口定义
- `badgeVariants`: 样式变体配置

## 变体类型

- `default`: 默认主题样式，深色背景
- `secondary`: 次要样式，浅色背景
- `destructive`: 危险样式，红色主题
- `outline`: 轮廓样式，透明背景带边框

## 基本用法

```tsx
import { Badge } from '@/components/ui/badge';

<Badge>默认徽章</Badge>;
```

## 不同变体

```tsx
// 默认样式
<Badge>新功能</Badge>

// 次要样式
<Badge variant="secondary">次要</Badge>

// 危险样式
<Badge variant="destructive">错误</Badge>

// 轮廓样式
<Badge variant="outline">轮廓</Badge>
```

## 使用场景

### 状态标签

```tsx
<div className="flex space-x-2">
  <Badge variant="default">进行中</Badge>
  <Badge variant="secondary">待处理</Badge>
  <Badge variant="destructive">已取消</Badge>
</div>
```

### 数量提示

```tsx
<div className="flex items-center space-x-2">
  <span>消息</span>
  <Badge variant="destructive">3</Badge>
</div>
```

### 分类标签

```tsx
<div className="flex flex-wrap gap-2">
  <Badge variant="outline">React</Badge>
  <Badge variant="outline">TypeScript</Badge>
  <Badge variant="outline">Tailwind</Badge>
</div>
```

### 组合使用

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <span>任务标题</span>
    <Badge variant="secondary">待办</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span>紧急任务</span>
    <Badge variant="destructive">高优先级</Badge>
  </div>
</div>
```

## 样式特点

- 圆角设计：`rounded-full`
- 小尺寸文字：`text-xs`
- 内边距：`px-2.5 py-0.5`
- 字体加粗：`font-semibold`
- 焦点环效果：`focus:ring-2`
- 悬停效果：所有变体都有悬停时的透明度变化

## 自定义样式

```tsx
// 自定义颜色
<Badge className="bg-purple-500 text-white hover:bg-purple-600">
  自定义
</Badge>

// 大尺寸徽章
<Badge className="px-4 py-1 text-sm">
  大徽章
</Badge>

// 方形徽章
<Badge className="rounded-md">
  方形
</Badge>
```

## 响应式设计

```tsx
<Badge className="text-xs sm:text-sm">响应式文字</Badge>
```

## 交互状态

徽章组件支持焦点状态，可以与键盘导航配合使用：

```tsx
<Badge tabIndex={0}>可聚焦徽章</Badge>
```
