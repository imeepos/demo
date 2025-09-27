# Textarea 组件文档

Textarea 组件是多行文本输入组件，基于原生 HTML textarea 元素。

## 组件导出

```typescript
import { Textarea } from '@/components/ui/textarea';
```

## 基本用法

```tsx
<Textarea placeholder="请输入您的消息..." />
```

## 组件说明

Textarea 组件是原生 textarea 元素的样式化版本，提供一致的外观和交互体验。

## 属性

继承所有原生 `textarea` 元素的属性：

| 属性         | 类型                                          | 默认值 | 描述         |
| ------------ | --------------------------------------------- | ------ | ------------ |
| placeholder  | string                                        | -      | 占位符文本   |
| value        | string                                        | -      | 受控值       |
| defaultValue | string                                        | -      | 默认值       |
| onChange     | (e: ChangeEvent<HTMLTextAreaElement>) => void | -      | 值变化回调   |
| rows         | number                                        | -      | 行数         |
| cols         | number                                        | -      | 列数         |
| disabled     | boolean                                       | false  | 是否禁用     |
| readOnly     | boolean                                       | false  | 是否只读     |
| required     | boolean                                       | false  | 是否必填     |
| maxLength    | number                                        | -      | 最大字符长度 |
| minLength    | number                                        | -      | 最小字符长度 |

## 使用示例

### 基本文本域

```tsx
function BasicTextarea() {
  const [value, setValue] = React.useState('');

  return (
    <Textarea
      placeholder="请输入您的反馈..."
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
```

### 带标签的文本域

```tsx
function LabeledTextarea() {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium">
        消息内容
      </label>
      <Textarea
        id="message"
        placeholder="请输入您想说的话..."
        className="min-h-[100px]"
      />
    </div>
  );
}
```

### 固定行数

```tsx
function FixedRowsTextarea() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">3行文本域</label>
        <Textarea rows={3} placeholder="固定3行高度..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">8行文本域</label>
        <Textarea rows={8} placeholder="固定8行高度..." />
      </div>
    </div>
  );
}
```

### 字符计数

```tsx
function CharacterCountTextarea() {
  const [value, setValue] = React.useState('');
  const maxLength = 500;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">产品描述</label>
      <Textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="请描述您的产品..."
        maxLength={maxLength}
        className="min-h-[120px]"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>最多 {maxLength} 个字符</span>
        <span
          className={value.length > maxLength * 0.9 ? 'text-orange-500' : ''}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
```

### 表单中的文本域

```tsx
function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交表单:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          姓名 *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={e =>
            setFormData(prev => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          邮箱 *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={e =>
            setFormData(prev => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          留言 *
        </label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={e =>
            setFormData(prev => ({ ...prev, message: e.target.value }))
          }
          placeholder="请输入您的留言..."
          required
          className="min-h-[100px]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90"
      >
        发送消息
      </button>
    </form>
  );
}
```

### 禁用和只读状态

```tsx
function DisabledTextarea() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">禁用状态</label>
        <Textarea
          disabled
          value="这是禁用状态的文本域"
          placeholder="禁用状态..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">只读状态</label>
        <Textarea
          readOnly
          value="这是只读状态的文本域，内容不能编辑"
          className="bg-muted"
        />
      </div>
    </div>
  );
}
```

### 错误状态

```tsx
function ErrorTextarea() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const validateMessage = (text: string) => {
    if (text.length < 10) {
      setError('消息至少需要10个字符');
    } else if (text.length > 100) {
      setError('消息不能超过100个字符');
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    validateMessage(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">反馈消息</label>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder="请输入您的反馈..."
        className={error ? 'border-red-500 focus:border-red-500' : ''}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

### 自动调整高度

```tsx
function AutoResizeTextarea() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  React.useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">自动调整高度</label>
      <Textarea
        ref={textareaRef}
        placeholder="输入内容时高度会自动调整..."
        onChange={adjustHeight}
        className="resize-none overflow-hidden"
        rows={1}
      />
    </div>
  );
}
```

## 样式自定义

Textarea 组件支持通过 `className` 属性自定义样式：

```tsx
<Textarea
  className="border-2 border-blue-300 focus:border-blue-500 rounded-lg"
  placeholder="自定义样式的文本域"
/>
```

## 默认样式

组件包含以下默认样式：

- 最小高度：80px
- 边框和焦点状态
- 响应式字体大小
- 禁用状态样式
- 占位符文本样式
