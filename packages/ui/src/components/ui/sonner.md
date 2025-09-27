# Toaster 组件文档

Toaster 组件是基于 Sonner 库的 Toast 通知组件，与主题系统集成。

## 组件导出

```typescript
import { Toaster } from '@/components/ui/sonner';
```

## 基本用法

```tsx
import { toast } from 'sonner';

// 在应用根组件中添加 Toaster
function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <Toaster />
    </div>
  );
}

// 在其他组件中使用 toast
function MyComponent() {
  return <button onClick={() => toast('Hello World!')}>显示通知</button>;
}
```

## 组件说明

Toaster 组件是 Sonner 的包装器，自动与 `next-themes` 的主题系统集成，提供一致的样式体验。

## 属性

继承所有 Sonner `Toaster` 组件的属性。

## Toast 使用方法

使用 `toast` 函数来显示通知：

### 基本通知

```tsx
import { toast } from 'sonner';

// 普通消息
toast('保存成功');

// 成功消息
toast.success('操作成功完成');

// 错误消息
toast.error('操作失败');

// 警告消息
toast.warning('请注意');

// 信息消息
toast.info('新消息');
```

### 带描述的通知

```tsx
toast('文件上传成功', {
  description: '您的文件已经成功上传到服务器',
});
```

### 带操作按钮的通知

```tsx
toast('确认删除', {
  description: '此操作不可撤销',
  action: {
    label: '确定',
    onClick: () => console.log('确认删除'),
  },
});
```

### 可关闭的通知

```tsx
toast('这是一个可关闭的通知', {
  description: '点击关闭按钮可以手动关闭',
  action: {
    label: '关闭',
    onClick: () => toast.dismiss(),
  },
});
```

### 持久通知

```tsx
// 不自动消失的通知
toast('重要通知', {
  duration: Infinity,
});

// 自定义持续时间
toast('5秒后消失', {
  duration: 5000,
});
```

### Promise 通知

```tsx
const myPromise = () => fetch('/api/data');

toast.promise(myPromise, {
  loading: '加载中...',
  success: data => {
    return `加载成功`;
  },
  error: '加载失败',
});
```

### 自定义位置

```tsx
// 在根组件中配置位置
<Toaster position="top-center" />
<Toaster position="bottom-right" />
<Toaster position="top-left" />
```

## 使用示例

### 表单提交通知

```tsx
function ContactForm() {
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // 显示加载状态
      const promise = fetch('/api/contact', {
        method: 'POST',
        body: new FormData(e.target),
      });

      toast.promise(promise, {
        loading: '发送中...',
        success: '消息发送成功！',
        error: '发送失败，请重试',
      });

      await promise;
    } catch (error) {
      // Promise toast 会自动处理错误
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button type="submit">发送消息</button>
    </form>
  );
}
```

### 文件上传进度

```tsx
function FileUpload() {
  const uploadFile = async file => {
    const uploadPromise = new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(new Error('上传失败'));
          }
        })
        .catch(reject);
    });

    toast.promise(uploadPromise, {
      loading: '上传中...',
      success: data => `文件上传成功: ${data.filename}`,
      error: '文件上传失败',
    });
  };

  return <input type="file" onChange={e => uploadFile(e.target.files[0])} />;
}
```

## 主题支持

组件自动支持明暗主题切换，无需额外配置。主题样式通过 CSS 变量定义，与设计系统保持一致。
