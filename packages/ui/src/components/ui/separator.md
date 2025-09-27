# Separator 组件

基于 `@radix-ui/react-separator` 构建的分割线组件，用于在界面中创建视觉分离。

## 组件导出

### Separator

分割线组件，可创建水平或垂直的分割线。

**Props:**

- 继承 `@radix-ui/react-separator` 的 `Root` 所有属性
- `className?: string` - 额外的CSS类名
- `orientation?: "horizontal" | "vertical"` - 分割线方向，默认 "horizontal"
- `decorative?: boolean` - 是否为装饰性元素，默认 `true`

**默认样式:**

- `shrink-0 bg-border` - 不收缩，使用边框色
- 水平方向: `h-[1px] w-full` - 1像素高度，全宽度
- 垂直方向: `h-full w-[1px]` - 全高度，1像素宽度

**无障碍性:**

- `decorative=true` 时，分割线对屏幕阅读器不可见
- `decorative=false` 时，分割线作为语义分隔符被识别

## 使用示例

### 基础水平分割线

```jsx
import { Separator } from '@/components/ui/separator';

export function BasicSeparator() {
  return (
    <div className="space-y-4">
      <div>第一部分内容</div>
      <Separator />
      <div>第二部分内容</div>
    </div>
  );
}
```

### 垂直分割线

```jsx
export function VerticalSeparator() {
  return (
    <div className="flex h-20 items-center space-x-4">
      <div>左侧内容</div>
      <Separator orientation="vertical" />
      <div>右侧内容</div>
    </div>
  );
}
```

### 导航菜单分割线

```jsx
export function NavigationSeparator() {
  return (
    <nav className="flex items-center space-x-4">
      <a href="/" className="text-sm font-medium">
        首页
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="/products" className="text-sm font-medium">
        产品
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="/about" className="text-sm font-medium">
        关于
      </a>
    </nav>
  );
}
```

### 卡片内容分割

```jsx
export function CardWithSeparator() {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">标题</h3>
        <p className="text-muted-foreground">描述信息</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>价格:</span>
          <span className="font-medium">¥99</span>
        </div>
        <div className="flex justify-between">
          <span>库存:</span>
          <span className="font-medium">50件</span>
        </div>
      </div>

      <Separator />

      <button className="w-full bg-primary text-primary-foreground rounded-md py-2">
        立即购买
      </button>
    </div>
  );
}
```

### 侧边栏布局

```jsx
export function SidebarLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-muted p-4">
        <h2 className="font-semibold mb-4">侧边栏</h2>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-background">
            菜单项 1
          </a>
          <a href="#" className="block p-2 rounded hover:bg-background">
            菜单项 2
          </a>
        </nav>
      </aside>

      <Separator orientation="vertical" />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">主内容区</h1>
        <p className="mt-4">这里是主要内容...</p>
      </main>
    </div>
  );
}
```

### 表单分组

```jsx
export function FormWithSeparators() {
  return (
    <form className="space-y-6 max-w-md">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">基本信息</h3>
        <div>
          <label className="block text-sm font-medium mb-2">姓名</label>
          <input className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">邮箱</label>
          <input type="email" className="w-full border rounded-md px-3 py-2" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">联系信息</h3>
        <div>
          <label className="block text-sm font-medium mb-2">电话</label>
          <input type="tel" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">地址</label>
          <textarea className="w-full border rounded-md px-3 py-2 h-20" />
        </div>
      </div>

      <Separator />

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground rounded-md py-2"
      >
        提交表单
      </button>
    </form>
  );
}
```

### 面包屑导航

```jsx
export function BreadcrumbSeparator() {
  const breadcrumbs = ['首页', '产品', '电子设备', '手机'];

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item}>
          <a
            href="#"
            className={`hover:underline ${
              index === breadcrumbs.length - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground'
            }`}
          >
            {item}
          </a>
          {index < breadcrumbs.length - 1 && (
            <Separator orientation="vertical" className="h-4" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
```

### 自定义样式分割线

```jsx
export function CustomSeparator() {
  return (
    <div className="space-y-6">
      <div>内容区域 1</div>

      {/* 粗分割线 */}
      <Separator className="h-[2px] bg-primary" />

      <div>内容区域 2</div>

      {/* 虚线分割线 */}
      <Separator className="border-t border-dashed border-muted-foreground bg-transparent h-0" />

      <div>内容区域 3</div>

      {/* 渐变分割线 */}
      <Separator className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div>内容区域 4</div>
    </div>
  );
}
```

## 注意事项

1. **方向设置:** 使用 `orientation` 属性控制分割线方向
2. **装饰性:** 大多数情况下使用 `decorative=true`（默认值）
3. **尺寸控制:** 可通过 `className` 自定义分割线的粗细和颜色
4. **布局配合:** 垂直分割线需要父容器有明确的高度
5. **语义化:** 仅在有语义分割需求时设置 `decorative=false`
6. **响应式:** 可结合响应式类名实现不同屏幕尺寸下的不同效果

## 样式自定义

```jsx
// 自定义颜色
<Separator className="bg-red-200" />

// 自定义粗细
<Separator className="h-0.5" />               // 更细
<Separator className="h-1" />                 // 更粗

// 自定义垂直分割线高度
<Separator orientation="vertical" className="h-8" />

// 虚线效果
<Separator className="border-t border-dashed bg-transparent h-0" />

// 渐变效果
<Separator className="bg-gradient-to-r from-blue-500 to-purple-500" />
```

## 依赖

- `@radix-ui/react-separator`
- `@/lib/utils` (cn 函数)
