# AspectRatio 组件文档

基于 Radix UI 的宽高比控制组件，用于保持元素的固定宽高比例。

## 组件结构

- `AspectRatio`: 唯一组件，直接导出 Radix UI 的 Root 组件

## 基本用法

```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio';

<AspectRatio ratio={16 / 9}>
  <img
    src="/image.jpg"
    alt="示例图片"
    className="object-cover w-full h-full rounded-md"
  />
</AspectRatio>;
```

## 常见宽高比

```tsx
// 16:9 宽屏比例
<AspectRatio ratio={16 / 9}>
  <div className="bg-gray-200 w-full h-full" />
</AspectRatio>

// 4:3 传统比例
<AspectRatio ratio={4 / 3}>
  <div className="bg-blue-200 w-full h-full" />
</AspectRatio>

// 1:1 正方形
<AspectRatio ratio={1}>
  <div className="bg-green-200 w-full h-full" />
</AspectRatio>

// 3:2 照片比例
<AspectRatio ratio={3 / 2}>
  <div className="bg-red-200 w-full h-full" />
</AspectRatio>
```

## 使用场景

### 图片展示

```tsx
<div className="w-[300px]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/landscape.jpg"
      alt="风景照片"
      className="object-cover w-full h-full rounded-lg"
    />
  </AspectRatio>
</div>
```

### 视频容器

```tsx
<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="视频标题"
    className="w-full h-full"
    allowFullScreen
  />
</AspectRatio>
```

### 卡片内容

```tsx
<div className="max-w-sm">
  <AspectRatio ratio={4 / 3}>
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-full h-full rounded-lg flex items-center justify-center">
      <span className="text-white text-xl font-bold">内容区域</span>
    </div>
  </AspectRatio>
</div>
```

## 特点

- 自动响应式：容器宽度变化时，高度自动调整保持比例
- 简单易用：只需设置 ratio 属性
- 完全兼容：基于成熟的 Radix UI 组件
- 无额外样式：纯功能性组件，不附加任何视觉样式

## 注意事项

- 子元素通常需要设置 `w-full h-full` 来填满容器
- 适合与图片、视频等媒体内容配合使用
- ratio 值为数字，表示宽度与高度的比值
