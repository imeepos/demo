# Slider 组件文档

Slider 组件是基于 Radix UI 的滑块组件，用于选择数值范围。

## 组件导出

```typescript
import { Slider } from '@/components/ui/slider';
```

## 基本用法

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

## 组件说明

Slider 组件基于 Radix UI 的 Slider 组件构建，提供了一致的样式和行为。

## 属性

继承所有 `SliderPrimitive.Root` 的属性：

| 属性          | 类型                       | 默认值       | 描述       |
| ------------- | -------------------------- | ------------ | ---------- |
| defaultValue  | number[]                   | -            | 默认值     |
| value         | number[]                   | -            | 受控值     |
| onValueChange | (value: number[]) => void  | -            | 值变化回调 |
| min           | number                     | 0            | 最小值     |
| max           | number                     | 100          | 最大值     |
| step          | number                     | 1            | 步长       |
| disabled      | boolean                    | false        | 是否禁用   |
| orientation   | "horizontal" \| "vertical" | "horizontal" | 方向       |

## 使用示例

### 基本滑块

```tsx
function BasicSlider() {
  const [value, setValue] = React.useState([50]);

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      max={100}
      step={1}
      className="w-[60%]"
    />
  );
}
```

### 范围滑块

```tsx
function RangeSlider() {
  const [value, setValue] = React.useState([20, 80]);

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      max={100}
      step={1}
      className="w-[60%]"
    />
  );
}
```

### 带刻度的滑块

```tsx
function StepSlider() {
  const [value, setValue] = React.useState([25]);

  return (
    <div className="space-y-4">
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={25}
        className="w-[60%]"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}
```

### 带标签的滑块

```tsx
function LabeledSlider() {
  const [value, setValue] = React.useState([50]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">音量: {value[0]}%</label>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        className="w-[60%]"
      />
    </div>
  );
}
```

### 禁用状态

```tsx
<Slider defaultValue={[33]} max={100} step={1} disabled className="w-[60%]" />
```

### 价格范围选择器

```tsx
function PriceRangeSlider() {
  const [priceRange, setPriceRange] = React.useState([100, 500]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <label className="text-sm font-medium">价格范围</label>
        <span className="text-sm text-muted-foreground">
          ¥{priceRange[0]} - ¥{priceRange[1]}
        </span>
      </div>
      <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        min={0}
        max={1000}
        step={10}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>¥0</span>
        <span>¥1000</span>
      </div>
    </div>
  );
}
```

## 样式自定义

组件包含以下部分的样式：

- **轨道** (Track): 滑块的背景轨道
- **范围** (Range): 已选择的范围显示
- **滑块** (Thumb): 可拖拽的滑块按钮

可以通过 `className` 属性自定义样式：

```tsx
<Slider
  defaultValue={[33]}
  max={100}
  step={1}
  className="w-full accent-blue-500"
/>
```
