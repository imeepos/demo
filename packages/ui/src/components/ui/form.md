# Form 组件

基于 React Hook Form 和 Radix UI 构建的表单组件集合，提供了完整的表单构建和验证功能。

## 组件列表

### Form

```tsx
import { Form } from '@/components/ui/form';
```

表单提供者组件，等同于 `FormProvider`，用于向表单子组件提供表单上下文。

**使用方法:**

```tsx
<Form {...methods}>{/* 表单内容 */}</Form>
```

### FormField

```tsx
import { FormField } from '@/components/ui/form';
```

表单字段控制器，包装了 React Hook Form 的 Controller 组件。

**Props:**

- 继承自 `ControllerProps<TFieldValues, TName>`
- `name`: 字段名称

**使用方法:**

```tsx
<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>用户名</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

### FormItem

```tsx
import { FormItem } from '@/components/ui/form';
```

表单项容器组件，为表单字段提供布局和上下文。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.HTMLAttributes<HTMLDivElement>`

**使用方法:**

```tsx
<FormItem>
  <FormLabel>标签</FormLabel>
  <FormControl>
    <Input />
  </FormControl>
  <FormDescription>描述信息</FormDescription>
  <FormMessage />
</FormItem>
```

### FormLabel

```tsx
import { FormLabel } from '@/components/ui/form';
```

表单标签组件，自动关联表单字段并根据验证状态显示样式。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 Radix UI Label 组件属性

**特性:**

- 自动设置 `htmlFor` 属性
- 错误状态时显示为红色文本

**使用方法:**

```tsx
<FormLabel>字段标签</FormLabel>
```

### FormControl

```tsx
import { FormControl } from '@/components/ui/form';
```

表单控件包装器，为输入组件提供必要的可访问性属性。

**Props:**

- 继承自 Radix UI Slot 组件属性

**特性:**

- 自动设置 `id` 和 `aria-describedby` 属性
- 错误状态时设置 `aria-invalid`

**使用方法:**

```tsx
<FormControl>
  <Input />
</FormControl>
```

### FormDescription

```tsx
import { FormDescription } from '@/components/ui/form';
```

表单字段描述组件，提供字段的帮助信息。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.HTMLAttributes<HTMLParagraphElement>`

**使用方法:**

```tsx
<FormDescription>这是一个帮助描述</FormDescription>
```

### FormMessage

```tsx
import { FormMessage } from '@/components/ui/form';
```

表单错误信息组件，显示验证错误或自定义消息。

**Props:**

- `className?`: 额外的 CSS 类名
- `children?`: 自定义消息内容
- 继承自 `React.HTMLAttributes<HTMLParagraphElement>`

**特性:**

- 自动显示验证错误信息
- 支持自定义消息内容
- 无消息时自动隐藏

**使用方法:**

```tsx
{
  /* 显示验证错误 */
}
<FormMessage />;

{
  /* 显示自定义消息 */
}
<FormMessage>自定义错误信息</FormMessage>;
```

## useFormField Hook

```tsx
import { useFormField } from '@/components/ui/form';
```

获取当前表单字段的状态和属性的 Hook。

**返回值:**

- `id`: 字段 ID
- `name`: 字段名称
- `formItemId`: 表单项 ID
- `formDescriptionId`: 描述 ID
- `formMessageId`: 消息 ID
- `error`: 错误状态
- `isDirty`: 是否已修改
- `isTouched`: 是否已触摸
- `isValidating`: 是否正在验证
- `invalid`: 是否无效

**使用方法:**

```tsx
function CustomFormComponent() {
  const { error, formItemId } = useFormField();

  return (
    <div>
      <input id={formItemId} />
      {error && <span>{error.message}</span>}
    </div>
  );
}
```

## 完整示例

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  username: z.string().min(2, '用户名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
});

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormDescription>这是您的公开显示名称。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="请输入邮箱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">提交</Button>
      </form>
    </Form>
  );
}
```

## 依赖项

- `react-hook-form`: 表单状态管理和验证
- `@radix-ui/react-label`: 标签组件
- `@radix-ui/react-slot`: 插槽组件
- `@/lib/utils`: 工具函数 (cn)
- `@/components/ui/label`: Label 组件
