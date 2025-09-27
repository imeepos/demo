# Input 组件

一个基于原生 HTML input 元素构建的输入框组件，具有现代化的样式和完整的功能支持。

## 组件概述

### Input

```tsx
import { Input } from '@/components/ui/input';
```

基础输入框组件，支持所有原生 input 元素的属性和类型。

**Props:**

- `className?`: 额外的 CSS 类名
- `type?`: 输入框类型 (text, password, email, number 等)
- 继承自 `React.ComponentProps<'input'>` 的所有属性

**默认样式特性:**

- 高度: 40px (h-10)
- 宽度: 100% (w-full)
- 圆角: 中等 (rounded-md)
- 边框: 输入框边框色
- 背景: 背景色
- 内边距: 水平 12px，垂直 8px (px-3 py-2)
- 字体大小: 基础大小，在 md 屏幕以上为小号
- 聚焦状态: 环形高亮效果
- 禁用状态: 鼠标指针禁用，透明度降低
- 文件选择器样式: 自定义文件选择按钮样式
- 占位符: 静音前景色

## 基础用法

```tsx
import { Input } from '@/components/ui/input';

export function InputDemo() {
  return <Input type="email" placeholder="输入邮箱" />;
}
```

## 不同类型的输入框

```tsx
{
  /* 文本输入 */
}
<Input type="text" placeholder="输入文本" />;

{
  /* 密码输入 */
}
<Input type="password" placeholder="输入密码" />;

{
  /* 邮箱输入 */
}
<Input type="email" placeholder="输入邮箱" />;

{
  /* 数字输入 */
}
<Input type="number" placeholder="输入数字" />;

{
  /* 搜索输入 */
}
<Input type="search" placeholder="搜索..." />;

{
  /* 电话输入 */
}
<Input type="tel" placeholder="输入电话号码" />;

{
  /* URL输入 */
}
<Input type="url" placeholder="输入网址" />;

{
  /* 日期输入 */
}
<Input type="date" />;

{
  /* 文件选择 */
}
<Input type="file" />;
```

## 受控组件

```tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="受控输入框"
    />
  );
}
```

## 与表单组件搭配使用

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">邮箱</Label>
      <Input type="email" id="email" placeholder="邮箱" />
    </div>
  );
}

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="邮箱" />
      <Button type="submit">订阅</Button>
    </div>
  );
}
```

## 在 React Hook Form 中使用

```tsx
import { useForm } from 'react-hook-form';
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

export function FormExample() {
  const form = useForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>用户名</FormLabel>
            <FormControl>
              <Input placeholder="输入用户名" {...field} />
            </FormControl>
            <FormDescription>这是您的用户名</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
```

## 禁用状态

```tsx
<Input disabled placeholder="禁用的输入框" />
```

## 自定义样式

```tsx
{/* 自定义类名 */}
<Input
  className="border-red-500 focus:border-red-600"
  placeholder="自定义边框颜色"
/>

{/* 不同尺寸 */}
<Input className="h-8 text-sm" placeholder="小尺寸" />
<Input className="h-12 text-lg" placeholder="大尺寸" />
```

## 文件上传示例

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FileInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">图片</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
```

## 搜索框示例

```tsx
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="搜索..." className="pl-8" />
    </div>
  );
}
```

## 输入框组合

```tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function InputGroup() {
  return (
    <div className="flex w-full max-w-sm items-center">
      <Input className="rounded-r-none border-r-0" placeholder="用户名" />
      <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md">
        @example.com
      </div>
    </div>
  );
}
```

## Ref 转发

```tsx
import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function InputWithRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center space-x-2">
      <Input ref={inputRef} placeholder="可聚焦的输入框" />
      <Button onClick={focusInput}>聚焦</Button>
    </div>
  );
}
```

## 特性

- **完全类型安全**: 支持 TypeScript 类型推断
- **Ref 转发**: 支持 React.forwardRef
- **原生属性**: 支持所有原生 input 元素属性
- **响应式设计**: 自适应不同屏幕尺寸
- **可访问性**: 支持键盘导航和屏幕阅读器
- **可定制**: 通过 className 轻松定制样式
- **文件上传**: 优化的文件选择器样式

## 依赖项

- `../../lib/utils`: 工具函数 (cn)
