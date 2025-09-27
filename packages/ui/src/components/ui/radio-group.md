# RadioGroup 组件

基于 Radix UI 构建的单选按钮组组件，用于在一组选项中选择单个值。

## 组件列表

### RadioGroup

```tsx
import { RadioGroup } from '@/components/ui/radio-group';
```

单选按钮组的根容器组件。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `@radix-ui/react-radio-group` Root 组件的所有属性

**常用属性:**

- `value?`: 当前选中的值
- `defaultValue?`: 默认选中的值
- `onValueChange?`: 值变化回调函数
- `disabled?`: 是否禁用整个组
- `orientation?`: 布局方向 ("horizontal" | "vertical")
- `loop?`: 是否循环键盘导航

**默认样式:**

- 布局: 网格布局 (grid)
- 间距: 8px 间隔 (gap-2)

### RadioGroupItem

```tsx
import { RadioGroupItem } from '@/components/ui/radio-group';
```

单个单选按钮项。

**Props:**

- `className?`: 额外的 CSS 类名
- `value`: 选项的值 (必需)
- 继承自 `@radix-ui/react-radio-group` Item 组件的所有属性

**默认样式:**

- 尺寸: 16px × 16px (h-4 w-4)
- 形状: 圆形 (rounded-full)
- 边框: 主要色边框 (border-primary)
- 文字: 主要色 (text-primary)
- 背景: 环形偏移背景
- 聚焦: 环形高亮效果
- 禁用: 鼠标指针禁用，透明度降低

**指示器:**

- 圆形填充图标
- 居中显示
- 尺寸: 10px × 10px (h-2.5 w-2.5)
- 颜色: 当前文字色填充

## 基础用法

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">默认</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">舒适</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">紧凑</Label>
      </div>
    </RadioGroup>
  );
}
```

## 受控组件

```tsx
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function ControlledRadioGroup() {
  const [size, setSize] = useState('medium');

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">选择尺寸</h3>
        <p className="text-sm text-muted-foreground">选择您偏好的界面尺寸</p>
      </div>

      <RadioGroup value={size} onValueChange={setSize}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="small" id="size-small" />
          <Label htmlFor="size-small">小</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="size-medium" />
          <Label htmlFor="size-medium">中</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="large" id="size-large" />
          <Label htmlFor="size-large">大</Label>
        </div>
      </RadioGroup>

      <p className="text-sm">当前选择: {size}</p>
    </div>
  );
}
```

## 水平布局

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function HorizontalRadioGroup() {
  return (
    <RadioGroup
      defaultValue="card"
      orientation="horizontal"
      className="flex space-x-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="payment-card" />
        <Label htmlFor="payment-card">银行卡</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="paypal" id="payment-paypal" />
        <Label htmlFor="payment-paypal">PayPal</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="apple" id="payment-apple" />
        <Label htmlFor="payment-apple">Apple Pay</Label>
      </div>
    </RadioGroup>
  );
}
```

## 带描述的选项

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function RadioGroupWithDescription() {
  return (
    <RadioGroup defaultValue="pro">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="free" id="plan-free" className="mt-1" />
          <div className="space-y-1 flex-1">
            <Label htmlFor="plan-free" className="text-base font-medium">
              免费版
            </Label>
            <p className="text-sm text-muted-foreground">
              基础功能，适合个人使用。包含基本的项目管理工具。
            </p>
            <p className="text-sm font-medium">免费</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <RadioGroupItem value="pro" id="plan-pro" className="mt-1" />
          <div className="space-y-1 flex-1">
            <Label htmlFor="plan-pro" className="text-base font-medium">
              专业版
            </Label>
            <p className="text-sm text-muted-foreground">
              完整功能，适合团队使用。包含高级分析和协作工具。
            </p>
            <p className="text-sm font-medium">¥99/月</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <RadioGroupItem
            value="enterprise"
            id="plan-enterprise"
            className="mt-1"
          />
          <div className="space-y-1 flex-1">
            <Label htmlFor="plan-enterprise" className="text-base font-medium">
              企业版
            </Label>
            <p className="text-sm text-muted-foreground">
              定制功能，适合大型企业。包含专属支持和安全功能。
            </p>
            <p className="text-sm font-medium">联系销售</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
}
```

## 在表单中使用

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: '请选择通知类型',
  }),
});

export function RadioGroupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>通知设置</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="all" />
                    <Label className="font-normal">所有新消息</Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="mentions" />
                    <Label className="font-normal">仅直接消息和提及</Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="none" />
                    <Label className="font-normal">无通知</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">保存设置</Button>
      </form>
    </Form>
  );
}
```

## 禁用状态

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function DisabledRadioGroup() {
  return (
    <div className="space-y-6">
      {/* 禁用整个组 */}
      <div>
        <h3 className="text-base font-medium mb-3">禁用的单选组</h3>
        <RadioGroup defaultValue="option1" disabled>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="disabled-1" />
            <Label htmlFor="disabled-1">选项 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="disabled-2" />
            <Label htmlFor="disabled-2">选项 2</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 禁用特定选项 */}
      <div>
        <h3 className="text-base font-medium mb-3">部分禁用的选项</h3>
        <RadioGroup defaultValue="available1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available1" id="partial-1" />
            <Label htmlFor="partial-1">可用选项 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled" id="partial-2" disabled />
            <Label htmlFor="partial-2" className="opacity-50">
              禁用的选项
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available2" id="partial-3" />
            <Label htmlFor="partial-3">可用选项 2</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
```

## 带图标的选项

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

export function RadioGroupWithIcons() {
  return (
    <RadioGroup defaultValue="desktop">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative p-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="mobile" id="device-mobile" />
            <Label
              htmlFor="device-mobile"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Smartphone className="h-5 w-5" />
              <div>
                <div className="font-medium">移动设备</div>
                <div className="text-sm text-muted-foreground">
                  手机和小屏设备
                </div>
              </div>
            </Label>
          </div>
        </Card>

        <Card className="relative p-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="tablet" id="device-tablet" />
            <Label
              htmlFor="device-tablet"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Tablet className="h-5 w-5" />
              <div>
                <div className="font-medium">平板设备</div>
                <div className="text-sm text-muted-foreground">
                  iPad 和平板电脑
                </div>
              </div>
            </Label>
          </div>
        </Card>

        <Card className="relative p-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="desktop" id="device-desktop" />
            <Label
              htmlFor="device-desktop"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Monitor className="h-5 w-5" />
              <div>
                <div className="font-medium">桌面设备</div>
                <div className="text-sm text-muted-foreground">
                  PC 和笔记本电脑
                </div>
              </div>
            </Label>
          </div>
        </Card>
      </div>
    </RadioGroup>
  );
}
```

## 自定义样式

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function CustomRadioGroup() {
  return (
    <div className="space-y-6">
      {/* 大尺寸 */}
      <div>
        <h3 className="text-base font-medium mb-3">大尺寸</h3>
        <RadioGroup defaultValue="large1">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="large1" id="large-1" className="h-6 w-6" />
            <Label htmlFor="large-1" className="text-lg">
              大选项 1
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="large2" id="large-2" className="h-6 w-6" />
            <Label htmlFor="large-2" className="text-lg">
              大选项 2
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* 自定义颜色 */}
      <div>
        <h3 className="text-base font-medium mb-3">自定义颜色</h3>
        <RadioGroup defaultValue="blue">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="blue"
              id="color-blue"
              className="border-blue-500 text-blue-500"
            />
            <Label htmlFor="color-blue">蓝色主题</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="green"
              id="color-green"
              className="border-green-500 text-green-500"
            />
            <Label htmlFor="color-green">绿色主题</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="red"
              id="color-red"
              className="border-red-500 text-red-500"
            />
            <Label htmlFor="color-red">红色主题</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
```

## 动态选项

```tsx
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DynamicRadioGroup() {
  const [options, setOptions] = useState([
    { id: '1', label: '选项 1', value: 'option1' },
    { id: '2', label: '选项 2', value: 'option2' },
  ]);
  const [newOption, setNewOption] = useState('');
  const [selectedValue, setSelectedValue] = useState('option1');

  const addOption = () => {
    if (newOption.trim()) {
      const newId = (options.length + 1).toString();
      const newValue = `option${newId}`;
      setOptions([
        ...options,
        {
          id: newId,
          label: newOption,
          value: newValue,
        },
      ]);
      setNewOption('');
    }
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-3">动态选项组</h3>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          {options.map(option => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
              {options.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                >
                  删除
                </Button>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex space-x-2">
        <Input
          value={newOption}
          onChange={e => setNewOption(e.target.value)}
          placeholder="新选项"
          onKeyPress={e => e.key === 'Enter' && addOption()}
        />
        <Button onClick={addOption}>添加</Button>
      </div>

      <p className="text-sm text-muted-foreground">当前选择: {selectedValue}</p>
    </div>
  );
}
```

## 特性

- **单选功能**: 在一组选项中只能选择一个值
- **键盘导航**: 支持方向键和空格键操作
- **可访问性**: 基于 Radix UI 的完整无障碍访问支持
- **受控/非受控**: 支持受控和非受控使用方式
- **自定义样式**: 支持自定义尺寸、颜色和样式
- **禁用状态**: 支持整体或单个选项的禁用
- **TypeScript**: 完整的类型支持

## 依赖项

- `@radix-ui/react-radio-group`: RadioGroup 原语组件
- `lucide-react`: 图标组件 (Circle)
- `@/lib/utils`: 工具函数 (cn)
