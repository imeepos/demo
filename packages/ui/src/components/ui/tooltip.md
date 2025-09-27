# Tooltip 组件文档

Tooltip 组件是基于 Radix UI 的工具提示组件，用于显示元素的补充信息。

## 组件导出

```typescript
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
```

## 基本用法

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>悬停显示提示</TooltipTrigger>
    <TooltipContent>
      <p>这是一个工具提示</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## 组件说明

- **TooltipProvider**: 提供工具提示上下文，通常在应用根部使用
- **Tooltip**: 工具提示根组件
- **TooltipTrigger**: 触发器元素，悬停时显示提示
- **TooltipContent**: 提示内容组件

## 属性

### TooltipContent 属性

| 属性       | 类型                                   | 默认值 | 描述           |
| ---------- | -------------------------------------- | ------ | -------------- |
| sideOffset | number                                 | 4      | 与触发器的距离 |
| side       | "top" \| "right" \| "bottom" \| "left" | -      | 显示位置       |
| align      | "start" \| "center" \| "end"           | -      | 对齐方式       |

## 使用示例

### 基本工具提示

```tsx
function BasicTooltip() {
  return (
    <TooltipProvider>
      <div className="flex space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              悬停我
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>这是一个简单的工具提示</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help underline">带下划线的文本</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>点击查看更多信息</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### 不同位置的工具提示

```tsx
function PositionedTooltips() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-3 gap-4 p-8">
        <div></div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 border rounded">顶部</button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>顶部提示</p>
          </TooltipContent>
        </Tooltip>
        <div></div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 border rounded">左侧</button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>左侧提示</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex justify-center">
          <span className="px-4 py-2 border rounded">中心</span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 border rounded">右侧</button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>右侧提示</p>
          </TooltipContent>
        </Tooltip>

        <div></div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 border rounded">底部</button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>底部提示</p>
          </TooltipContent>
        </Tooltip>
        <div></div>
      </div>
    </TooltipProvider>
  );
}
```

### 图标按钮工具提示

```tsx
import { Heart, Share, Bookmark, MessageCircle } from 'lucide-react';

function IconTooltips() {
  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>点赞</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Share className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>分享</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bookmark className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>收藏</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MessageCircle className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>评论</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### 富文本工具提示

```tsx
function RichTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <h3 className="font-medium">产品信息</h3>
            <p className="text-sm text-muted-foreground">悬停查看详情</p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <h4 className="font-medium">MacBook Pro 16"</h4>
            <div className="text-sm">
              <p>• M2 Pro 芯片</p>
              <p>• 16GB 统一内存</p>
              <p>• 512GB SSD 存储</p>
              <p>• 16.2英寸 Liquid Retina XDR 显示屏</p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm font-medium">¥18,999</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### 表单字段提示

```tsx
function FormWithTooltips() {
  return (
    <TooltipProvider>
      <form className="space-y-4 max-w-md">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="password" className="text-sm font-medium">
              密码
            </label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground">
                  ℹ️
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p>密码要求：</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>至少8个字符</li>
                    <li>包含大小写字母</li>
                    <li>包含数字</li>
                    <li>包含特殊字符</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="请输入密码"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱
            </label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground">
                  ℹ️
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">我们将使用此邮箱发送重要通知</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="your@email.com"
          />
        </div>
      </form>
    </TooltipProvider>
  );
}
```

### 数据表格中的工具提示

```tsx
function DataTableWithTooltips() {
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
    { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' },
    { id: 3, name: '王五', email: 'wangwu@example.com', status: 'pending' },
  ];

  return (
    <TooltipProvider>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">姓名</th>
              <th className="px-4 py-2 text-left">邮箱</th>
              <th className="px-4 py-2 text-left">状态</th>
              <th className="px-4 py-2 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : user.status === 'inactive'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">
                        {user.status === 'active' && '用户处于活跃状态'}
                        {user.status === 'inactive' && '用户已被禁用'}
                        {user.status === 'pending' && '等待用户激活'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          ✏️
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>编辑用户</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          🗑️
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>删除用户</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
```

### 自定义延迟

```tsx
function DelayedTooltip() {
  return (
    <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 border rounded">延迟800ms显示</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>这个提示有800ms的延迟</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## 最佳实践

1. **Provider 位置**: 在应用根部设置 `TooltipProvider`
2. **内容简洁**: 保持工具提示内容简短明了
3. **触发器语义**: 使用 `asChild` 确保正确的语义结构
4. **键盘访问**: 工具提示支持 `Escape` 键关闭
5. **移动端考虑**: 在移动设备上工具提示行为可能不同

## 样式自定义

工具提示组件支持完全的样式自定义：

```tsx
<TooltipContent className="bg-blue-500 text-white border-blue-600">
  <p>自定义样式的工具提示</p>
</TooltipContent>
```
