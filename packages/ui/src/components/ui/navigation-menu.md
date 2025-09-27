# NavigationMenu 组件

基于 Radix UI 构建的导航菜单组件集合，提供了现代化的导航体验，支持下拉内容、指示器和响应式设计。

## 组件列表

### NavigationMenu

```tsx
import { NavigationMenu } from '@/components/ui/navigation-menu';
```

导航菜单的根容器组件。

**Props:**

- `className?`: 额外的 CSS 类名
- `children`: 子元素
- 继承自 `@radix-ui/react-navigation-menu` Root 组件的所有属性

**默认样式:**

- 相对定位: z-10
- 弹性布局: 最大宽度，居中对齐
- 自动包含 `NavigationMenuViewport`

### NavigationMenuList

```tsx
import { NavigationMenuList } from '@/components/ui/navigation-menu';
```

导航菜单项的列表容器。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `@radix-ui/react-navigation-menu` List 组件的所有属性

**默认样式:**

- 分组弹性布局
- 列表样式: 无
- 居中对齐
- 水平间距: 4px (space-x-1)

### NavigationMenuItem

```tsx
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
```

单个导航菜单项，等同于 `NavigationMenuPrimitive.Item`。

### NavigationMenuTrigger

```tsx
import { NavigationMenuTrigger } from '@/components/ui/navigation-menu';
```

导航菜单触发器按钮。

**Props:**

- `className?`: 额外的 CSS 类名
- `children`: 子元素
- 继承自 `@radix-ui/react-navigation-menu` Trigger 组件的所有属性

**特性:**

- 自动包含下拉箭头图标
- 打开状态时箭头旋转180度
- 使用 `navigationMenuTriggerStyle()` 样式函数

### NavigationMenuContent

```tsx
import { NavigationMenuContent } from '@/components/ui/navigation-menu';
```

导航菜单的下拉内容容器。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `@radix-ui/react-navigation-menu` Content 组件的所有属性

**默认样式:**

- 绝对定位（在中等屏幕以上）
- 动画效果: 渐入渐出和滑动效果
- 响应式宽度: 移动端全宽，桌面端自动宽度

### NavigationMenuLink

```tsx
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
```

导航菜单链接，等同于 `NavigationMenuPrimitive.Link`。

### NavigationMenuViewport

```tsx
import { NavigationMenuViewport } from '@/components/ui/navigation-menu';
```

导航菜单的视口容器，用于显示下拉内容。

**默认样式:**

- 绝对定位在顶部
- 居中显示
- 圆角边框和阴影
- 动画效果: 缩放进出
- 响应式尺寸

### NavigationMenuIndicator

```tsx
import { NavigationMenuIndicator } from '@/components/ui/navigation-menu';
```

导航菜单的指示器，显示当前激活项的小三角形。

**默认样式:**

- 位于顶部全宽
- 居中显示的旋转方形指示器
- 渐入渐出动画

## navigationMenuTriggerStyle 样式函数

```tsx
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
```

提供导航菜单触发器的标准样式，可以用于自定义触发器按钮。

**默认样式包含:**

- 高度: 40px (h-10)
- 内边距: 水平 16px，垂直 8px
- 字体: 小号，中等字重
- 悬停和聚焦效果
- 状态变化的过渡动画

## 基础用法

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>开始使用</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      使用 Radix UI 和 Tailwind CSS 构建的精美组件。
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="介绍">
                可重复使用的组件，使用 Radix UI 和 Tailwind CSS 构建。
              </ListItem>
              <ListItem href="/docs/installation" title="安装">
                如何安装依赖项并构建您的应用程序。
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="排版">
                样式和组件用于显示文本和强调重要部分。
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>组件</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map(component => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className={navigationMenuTriggerStyle()}
          >
            文档
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
```

## 简单的水平导航

```tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function SimpleNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            首页
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className={navigationMenuTriggerStyle()}
          >
            关于
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/services"
            className={navigationMenuTriggerStyle()}
          >
            服务
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={navigationMenuTriggerStyle()}
          >
            联系
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## 大型内容菜单

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function LargeContentMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>产品</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <div className="grid gap-1">
                <h3 className="font-medium leading-none">Web 开发</h3>
                <p className="text-sm text-muted-foreground">
                  现代化的 Web 应用程序开发服务
                </p>
                <NavigationMenuLink asChild>
                  <a href="/web-dev" className="text-sm underline">
                    了解更多 →
                  </a>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium leading-none">移动开发</h3>
                <p className="text-sm text-muted-foreground">
                  跨平台移动应用程序开发
                </p>
                <NavigationMenuLink asChild>
                  <a href="/mobile-dev" className="text-sm underline">
                    了解更多 →
                  </a>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium leading-none">UI/UX 设计</h3>
                <p className="text-sm text-muted-foreground">
                  用户界面和用户体验设计服务
                </p>
                <NavigationMenuLink asChild>
                  <a href="/design" className="text-sm underline">
                    了解更多 →
                  </a>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium leading-none">咨询服务</h3>
                <p className="text-sm text-muted-foreground">
                  技术咨询和战略规划
                </p>
                <NavigationMenuLink asChild>
                  <a href="/consulting" className="text-sm underline">
                    了解更多 →
                  </a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## 垂直导航菜单

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function VerticalNavigation() {
  return (
    <NavigationMenu orientation="vertical" className="justify-start">
      <NavigationMenuList className="flex-col items-start space-x-0 space-y-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-full justify-start">
            仪表板
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 p-2 w-48">
              <a
                href="/dashboard/overview"
                className="block px-2 py-1 text-sm hover:bg-accent rounded"
              >
                概览
              </a>
              <a
                href="/dashboard/analytics"
                className="block px-2 py-1 text-sm hover:bg-accent rounded"
              >
                分析
              </a>
              <a
                href="/dashboard/reports"
                className="block px-2 py-1 text-sm hover:bg-accent rounded"
              >
                报告
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-full justify-start">
            用户管理
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 p-2 w-48">
              <a
                href="/users"
                className="block px-2 py-1 text-sm hover:bg-accent rounded"
              >
                所有用户
              </a>
              <a
                href="/users/add"
                className="block px-2 py-1 text-sm hover:bg-accent rounded"
              >
                添加用户
              </a>
              <a
                href="/users/permissions"
                className="block px-2 py-1 text-sm hover:bg-accent rounded"
              >
                权限设置
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## 与 Next.js 集成

```tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '../../lib/utils';

export function NextNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === '/' && 'bg-accent text-accent-foreground'
              )}
            >
              首页
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === '/products' && 'bg-accent text-accent-foreground'
              )}
            >
              产品
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## 特性

- **响应式设计**: 自动适应移动和桌面端
- **动画效果**: 流畅的下拉和指示器动画
- **键盘导航**: 完整的键盘操作支持
- **可访问性**: 基于 Radix UI 的完整无障碍访问支持
- **灵活布局**: 支持复杂的下拉内容布局
- **样式函数**: 提供可重用的样式函数
- **指示器**: 视觉指示当前活动项

## 依赖项

- `@radix-ui/react-navigation-menu`: NavigationMenu 原语组件
- `class-variance-authority`: 样式变体管理 (cva)
- `lucide-react`: 图标组件 (ChevronDown)
- `../../lib/utils`: 工具函数 (cn)
