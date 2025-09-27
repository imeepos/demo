# Card 组件

一个功能丰富的卡片组件集合，提供多种视觉效果和布局选项，适用于展示内容的容器组件。

## 功能特性

- 🎨 8种精美的卡片样式变体
- 📏 多种尺寸和内边距选项
- ✨ 动态hover效果和动画
- 🔧 模块化组件设计
- 🎭 支持禁用hover效果
- 📱 响应式设计

## 组件结构

- `Card` - 主卡片容器
- `CardHeader` - 卡片头部区域
- `CardTitle` - 卡片标题
- `CardDescription` - 卡片描述
- `CardContent` - 卡片主内容区域
- `CardFooter` - 卡片底部区域

## 样式变体

### variant 属性

- `default` - 默认样式，简洁阴影
- `elevated` - 悬浮效果，hover时向上移动
- `glass` - 玻璃拟态效果，半透明背景
- `gradient` - 渐变背景效果
- `floating` - 浮动效果，大幅度hover动画
- `glow` - 发光效果，hover时显示主色调光晕
- `outlined` - 强调边框，hover时边框变色
- `soft` - 柔和渐变，轻微的背景渐变

### size 属性

- `default` - 默认字体大小
- `sm` - 小字体
- `lg` - 大字体

### padding 属性

- `default` - 使用子组件默认内边距
- `none` - 移除所有内边距
- `sm` - 小内边距 (16px)
- `lg` - 大内边距 (32px)

## 使用示例

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

// 基础卡片
function BasicCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>卡片标题</CardTitle>
        <CardDescription>这是卡片的描述文字</CardDescription>
      </CardHeader>
      <CardContent>
        <p>这里是卡片的主要内容。</p>
      </CardContent>
      <CardFooter>
        <Button>操作按钮</Button>
      </CardFooter>
    </Card>
  );
}

// 不同样式变体
function StyledCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="elevated">
        <CardContent>悬浮卡片</CardContent>
      </Card>

      <Card variant="glass">
        <CardContent>玻璃拟态卡片</CardContent>
      </Card>

      <Card variant="glow">
        <CardContent>发光卡片</CardContent>
      </Card>

      <Card variant="gradient">
        <CardContent>渐变卡片</CardContent>
      </Card>
    </div>
  );
}

// 禁用hover效果
function StaticCard() {
  return (
    <Card variant="floating" hover={false}>
      <CardContent>静态卡片，无hover效果</CardContent>
    </Card>
  );
}

// 自定义内边距
function CustomPaddingCard() {
  return (
    <Card padding="lg">
      <CardHeader>
        <CardTitle>大内边距卡片</CardTitle>
      </CardHeader>
      <CardContent>内容区域有更大的内边距</CardContent>
    </Card>
  );
}

// 无内边距卡片（适用于图片等）
function ImageCard() {
  return (
    <Card padding="none">
      <img src="/image.jpg" className="w-full h-48 object-cover rounded-t-lg" />
      <CardContent className="p-4">
        <CardTitle>图片卡片</CardTitle>
        <CardDescription>图片占满整个卡片宽度</CardDescription>
      </CardContent>
    </Card>
  );
}
```

## API 接口

### Card Props

```tsx
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
}
```

| 属性      | 类型                                                                                               | 默认值      | 描述              |
| --------- | -------------------------------------------------------------------------------------------------- | ----------- | ----------------- |
| variant   | `"default" \| "elevated" \| "glass" \| "gradient" \| "floating" \| "glow" \| "outlined" \| "soft"` | `"default"` | 卡片样式变体      |
| size      | `"default" \| "sm" \| "lg"`                                                                        | `"default"` | 字体大小          |
| padding   | `"default" \| "none" \| "sm" \| "lg"`                                                              | `"default"` | 内边距大小        |
| hover     | `boolean`                                                                                          | `true`      | 是否启用hover效果 |
| className | `string`                                                                                           | -           | 自定义CSS类名     |

### 子组件 Props

所有子组件都接受标准的HTMLDivElement属性：

| 组件            | 默认样式                                             | 描述                 |
| --------------- | ---------------------------------------------------- | -------------------- |
| CardHeader      | `flex flex-col space-y-1.5 p-6`                      | 卡片头部，垂直布局   |
| CardTitle       | `text-2xl font-semibold leading-none tracking-tight` | 卡片标题，大字体加粗 |
| CardDescription | `text-sm text-muted-foreground`                      | 卡片描述，小字体灰色 |
| CardContent     | `p-6 pt-0`                                           | 卡片内容，与头部连接 |
| CardFooter      | `flex items-center p-6 pt-0`                         | 卡片底部，水平布局   |

## 样式定制

### 使用cardVariants函数

```tsx
import { cardVariants } from '@/components/ui/card';

const customCardClass = cardVariants({
  variant: 'glass',
  size: 'lg',
  padding: 'sm',
});
```

### 覆盖默认样式

```tsx
<Card variant="default" className="border-2 border-blue-500 shadow-blue-500/25">
  <CardContent>自定义边框和阴影</CardContent>
</Card>
```

## 动画效果详解

### Transform动画

- `elevated`: `hover:-translate-y-1` - 向上移动1个单位
- `floating`: `hover:-translate-y-2 hover:scale-[1.02]` - 向上移动2个单位并轻微放大
- `soft`: `hover:-translate-y-0.5` - 向上移动0.5个单位

### 阴影动画

- `default`: `shadow-sm hover:shadow-md` - 阴影增强
- `glow`: `hover:shadow-primary/25` - 主色调发光
- `glass`: `hover:shadow-xl` - 强化玻璃效果

### 颜色动画

- `glow`: `hover:border-primary/30` - 边框变为主色调
- `outlined`: `hover:border-primary/30` - 轮廓变色
- `glass`: `hover:bg-white/15` - 背景透明度变化

## 最佳实践

1. **选择合适的变体**：根据内容重要性和页面风格选择变体
2. **合理使用hover**：在需要交互的卡片上保持hover效果
3. **内容层次**：使用Title和Description建立清晰的信息层次
4. **响应式布局**：结合网格系统创建响应式卡片布局
5. **性能考虑**：对于大量卡片，考虑禁用复杂的hover动画

## 注意事项

- `padding="none"` 会影响所有子组件的内边距
- 玻璃拟态效果（glass）需要合适的背景才能显示效果
- 发光效果（glow）在深色背景下效果更佳
- hover动画使用了CSS transitions，在低性能设备上可能影响流畅性
