# Button 组件

一个功能全面的按钮组件，基于 Radix UI 和 class-variance-authority 构建，支持多种样式变体和尺寸。

## 功能特性

- 🎨 8 种内置按钮样式变体
- 📏 4 种尺寸选项
- 🔄 支持作为其他组件的渲染容器
- ♿ 完整的无障碍功能支持
- 🎭 焦点状态和禁用状态样式

## 样式变体

### variant 属性

- `default` - 主要按钮样式，带背景色和hover效果
- `destructive` - 危险操作按钮，红色主题
- `outline` - 轮廓按钮，带边框无背景
- `secondary` - 次要按钮样式
- `ghost` - 幽灵按钮，仅在hover时显示背景
- `link` - 链接样式按钮，带下划线

### size 属性

- `default` - 默认尺寸 (h-10 px-4 py-2)
- `sm` - 小尺寸 (h-9 px-3)
- `lg` - 大尺寸 (h-11 px-8)
- `icon` - 图标按钮 (h-10 w-10)

## 使用示例

```tsx
import { Button } from "@/components/ui/button"

// 基础用法
<Button>点击我</Button>

// 不同变体
<Button variant="destructive">删除</Button>
<Button variant="outline">取消</Button>
<Button variant="ghost">更多</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="lg">大按钮</Button>
<Button size="icon">🔍</Button>

// 作为其他组件容器
<Button asChild>
  <a href="/home">链接按钮</a>
</Button>

// 自定义样式
<Button className="bg-blue-500 hover:bg-blue-600">
  自定义样式
</Button>
```

## API 接口

```tsx
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

### Props

| 属性      | 类型                                                                          | 默认值      | 描述                                             |
| --------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| variant   | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | 按钮样式变体                                     |
| size      | `"default" \| "sm" \| "lg" \| "icon"`                                         | `"default"` | 按钮尺寸                                         |
| asChild   | `boolean`                                                                     | `false`     | 当为true时，将样式应用到子元素上而不是button元素 |
| className | `string`                                                                      | -           | 自定义CSS类名                                    |

所有标准的HTML button属性都被支持。

## 样式定制

组件使用 `buttonVariants` 函数生成样式，你可以在导入时使用这个函数来创建自定义按钮：

```tsx
import { buttonVariants } from '@/components/ui/button';

const customButtonClass = buttonVariants({
  variant: 'outline',
  size: 'lg',
});
```

## 注意事项

- 当 `asChild=true` 时，组件会使用 Radix UI 的 Slot 组件来将样式应用到直接子元素上
- SVG 图标会自动设置为 16x16 像素大小
- 禁用状态会自动禁用指针事件并降低透明度
- 组件包含完整的焦点管理和键盘导航支持
