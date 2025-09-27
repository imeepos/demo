# Label 组件

基于 Radix UI 构建的标签组件，为表单元素提供可访问的标签文本。

## 组件概述

### Label

```tsx
import { Label } from '@/components/ui/label';
```

表单标签组件，基于 Radix UI Label 原语构建，提供了优秀的可访问性支持。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.ComponentProps<typeof LabelPrimitive.Root>` 的所有属性

**默认样式特性:**

- 布局: 弹性布局，垂直居中对齐 (flex items-center)
- 间距: 元素间 8px 间距 (gap-2)
- 字体: 小号字体，无行高，中等字重 (text-sm leading-none font-medium)
- 选择: 不可选择文本 (select-none)
- 禁用状态: 支持组和对等元素的禁用样式
- 数据属性: 包含 `data-slot="label"`

## 基础用法

```tsx
import { Label } from '@/components/ui/label';

export function LabelDemo() {
  return <Label htmlFor="email">邮箱地址</Label>;
}
```

## 与输入框搭配使用

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function LabelWithInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">邮箱</Label>
      <Input type="email" id="email" placeholder="邮箱" />
    </div>
  );
}
```

## 与复选框搭配使用

```tsx
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function LabelWithCheckbox() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        接受条款和条件
      </Label>
    </div>
  );
}
```

## 与单选按钮搭配使用

```tsx
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function LabelWithRadio() {
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

## 在表单中使用

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function FormWithLabels() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">姓名</Label>
        <Input id="name" placeholder="输入您的姓名" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" placeholder="输入您的邮箱" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">消息</Label>
        <Textarea id="message" placeholder="输入您的消息" />
      </div>

      <Button type="submit">提交</Button>
    </form>
  );
}
```

## 必填字段标识

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function RequiredLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="required-field">
        邮箱地址
        <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input id="required-field" type="email" required />
    </div>
  );
}
```

## 带帮助文本的标签

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function LabelWithHelp() {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="username">用户名</Label>
        <p className="text-sm text-muted-foreground">
          这将是您的公开显示名称。
        </p>
      </div>
      <Input id="username" placeholder="输入用户名" />
    </div>
  );
}
```

## 禁用状态

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function DisabledLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="disabled-input" className="opacity-50">
        禁用字段
      </Label>
      <Input id="disabled-input" disabled placeholder="禁用的输入框" />
    </div>
  );
}
```

## 自定义样式

```tsx
import { Label } from '@/components/ui/label';

export function CustomLabel() {
  return (
    <div className="space-y-4">
      {/* 大号标签 */}
      <Label className="text-lg font-bold">大号标签</Label>

      {/* 彩色标签 */}
      <Label className="text-blue-600">蓝色标签</Label>

      {/* 带图标的标签 */}
      <Label className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        邮箱地址
      </Label>
    </div>
  );
}
```

## 与 React Hook Form 搭配

```tsx
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function FormWithHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">
          邮箱
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: '邮箱是必填的' })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit">提交</Button>
    </form>
  );
}
```

## 无障碍访问

Label 组件提供了完整的无障碍访问支持：

- 通过 `htmlFor` 属性与表单控件关联
- 支持键盘导航
- 与屏幕阅读器兼容
- 自动处理禁用状态的样式

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function AccessibleForm() {
  return (
    <div className="space-y-2">
      <Label htmlFor="accessible-input">可访问的输入框</Label>
      <Input
        id="accessible-input"
        aria-describedby="input-description"
        placeholder="输入内容"
      />
      <p id="input-description" className="text-sm text-muted-foreground">
        这个输入框具有完整的无障碍访问支持
      </p>
    </div>
  );
}
```

## 特性

- **可访问性**: 基于 Radix UI 的完整无障碍访问支持
- **类型安全**: 完整的 TypeScript 支持
- **样式继承**: 支持组和对等元素的禁用状态样式
- **灵活布局**: 支持图标和其他元素的组合
- **数据属性**: 包含识别标识 `data-slot="label"`

## 依赖项

- `@radix-ui/react-label`: Label 原语组件
- `@/lib/utils`: 工具函数 (cn)
