# Dialog 组件

一个功能完整的对话框组件集合，基于 Radix UI 构建，提供模态窗口、表单对话框等功能，支持完整的无障碍功能和键盘导航。

## 功能特性

- 🔒 模态和非模态对话框支持
- ♿ 完整的无障碍功能和焦点管理
- 🎭 流畅的打开/关闭动画效果
- 🎨 可完全自定义样式和布局
- ⌨️ 全面的键盘导航支持
- 📱 响应式设计，适配各种设备
- 🔧 模块化组件设计，灵活组合

## 组件结构

- `Dialog` - 根对话框容器
- `DialogTrigger` - 触发器按钮
- `DialogContent` - 对话框主内容区域
- `DialogHeader` - 对话框头部区域
- `DialogTitle` - 对话框标题
- `DialogDescription` - 对话框描述文本
- `DialogFooter` - 对话框底部操作区域
- `DialogClose` - 关闭按钮
- `DialogOverlay` - 背景遮罩层
- `DialogPortal` - 传送门容器

## 使用示例

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// 基础对话框
function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>打开对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认操作</DialogTitle>
          <DialogDescription>
            这个操作无法撤销。确定要继续吗？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 受控对话框
function ControlledDialog() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // 执行操作
    console.log('操作已确认');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>受控对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>受控模式</DialogTitle>
          <DialogDescription>
            这个对话框的开启/关闭状态由外部控制。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleConfirm}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 表单对话框
function FormDialog() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交表单:', formData);
    // 处理表单提交
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>新建联系人</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加联系人</DialogTitle>
          <DialogDescription>
            填写联系人信息，点击保存完成添加。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                姓名
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="col-span-3"
                placeholder="请输入姓名"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                邮箱
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="col-span-3"
                placeholder="请输入邮箱"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                备注
              </Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={e =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="col-span-3 min-h-20 px-3 py-2 border rounded-md"
                placeholder="可选备注信息"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button type="submit">保存联系人</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// 确认删除对话框
function DeleteConfirmDialog({
  itemName,
  onConfirm,
}: {
  itemName: string;
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          删除
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
          <DialogDescription>
            确定要删除 "{itemName}" 吗？此操作无法撤销。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            确认删除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 无关闭按钮的对话框
function NoCloseButtonDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    setLoading(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>启动处理</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>数据处理中</DialogTitle>
          <DialogDescription>正在处理您的数据，请稍候...</DialogDescription>
        </DialogHeader>
        <div className="py-6">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">处理中...</span>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-green-600">✓ 处理完成！</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleProcess} disabled={loading} className="w-full">
            {loading ? '处理中...' : '开始处理'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 全屏对话框（移动端友好）
function FullScreenDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>详细信息</Button>
      </DialogTrigger>
      <DialogContent className="max-w-none w-full h-full sm:max-w-lg sm:h-auto">
        <DialogHeader>
          <DialogTitle>详细信息</DialogTitle>
          <DialogDescription>
            在移动设备上以全屏显示，在桌面端以对话框显示。
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">章节 1</h3>
              <p className="text-sm text-muted-foreground">
                这里是详细的内容描述...
              </p>
            </div>
            <div>
              <h3 className="font-semibold">章节 2</h3>
              <p className="text-sm text-muted-foreground">更多内容...</p>
            </div>
            {/* 更多内容 */}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>关闭</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## API 接口

### Dialog Props

继承 Radix UI DialogPrimitive.Root 的所有属性：

| 属性         | 类型                      | 默认值  | 描述                       |
| ------------ | ------------------------- | ------- | -------------------------- |
| open         | `boolean`                 | -       | 对话框开启状态（受控模式） |
| defaultOpen  | `boolean`                 | `false` | 默认开启状态（非受控模式） |
| onOpenChange | `(open: boolean) => void` | -       | 状态改变时的回调函数       |
| modal        | `boolean`                 | `true`  | 是否为模态对话框           |

### DialogContent Props

| 属性            | 类型        | 默认值 | 描述                   |
| --------------- | ----------- | ------ | ---------------------- |
| showCloseButton | `boolean`   | `true` | 是否显示右上角关闭按钮 |
| className       | `string`    | -      | 自定义CSS类名          |
| children        | `ReactNode` | -      | 对话框内容             |

### DialogTrigger Props

| 属性     | 类型        | 默认值  | 描述               |
| -------- | ----------- | ------- | ------------------ |
| asChild  | `boolean`   | `false` | 是否作为子元素渲染 |
| children | `ReactNode` | -       | 触发器内容         |

### 其他组件 Props

所有其他组件都接受标准的HTML属性和className用于样式定制。

## 键盘导航

- `Escape` - 关闭对话框
- `Tab` - 在对话框内的可获得焦点元素间导航
- `Shift + Tab` - 反向导航
- `Enter/Space` - 激活按钮或链接

## 焦点管理

- 对话框打开时，焦点自动移动到第一个可获得焦点的元素
- 焦点被锁定在对话框内（模态模式下）
- 对话框关闭时，焦点返回到触发器元素

## 样式定制

### 默认样式类

```css
/* 对话框内容 */
.dialog-content {
  @apply bg-background fixed top-[50%] left-[50%] z-50 grid w-full 
         max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] 
         gap-4 rounded-lg border p-6 shadow-lg duration-200 
         sm:max-w-lg;
}

/* 背景遮罩 */
.dialog-overlay {
  @apply fixed inset-0 z-50 bg-black/50;
}

/* 动画类 */
.dialog-content[data-state='open'] {
  @apply animate-in fade-in-0 zoom-in-95;
}

.dialog-content[data-state='closed'] {
  @apply animate-out fade-out-0 zoom-out-95;
}
```

### 自定义样式示例

```tsx
// 自定义大小
<DialogContent className="max-w-4xl">
  大尺寸对话框
</DialogContent>

// 自定义背景
<DialogContent className="bg-gradient-to-r from-blue-50 to-purple-50">
  渐变背景对话框
</DialogContent>

// 自定义动画
<DialogContent className="data-[state=open]:animate-bounce">
  弹跳动画对话框
</DialogContent>
```

## 最佳实践

1. **清晰的标题**：使用描述性的DialogTitle
2. **合适的描述**：提供DialogDescription解释对话框用途
3. **明确的操作**：在DialogFooter中提供清晰的操作按钮
4. **表单验证**：在表单对话框中提供适当的验证反馈
5. **响应式设计**：确保在移动设备上有良好的体验
6. **焦点管理**：合理设置初始焦点和Tab顺序

## 常见用例

- **确认对话框** - 删除、保存等操作确认
- **表单对话框** - 创建、编辑数据的表单
- **信息展示** - 显示详细信息或帮助内容
- **多步骤流程** - 引导用户完成复杂操作
- **设置面板** - 应用设置和配置选项

## 注意事项

- 模态对话框会阻止用户与背景内容交互
- 避免在对话框中嵌套另一个对话框
- 确保对话框内容在小屏幕上可以滚动
- 重要操作建议添加确认步骤
- 考虑为长时间操作提供进度指示
