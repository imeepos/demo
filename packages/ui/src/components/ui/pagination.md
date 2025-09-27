# Pagination 组件

一套完整的分页组件集合，用于构建功能完善的分页导航界面。

## 组件列表

### Pagination

```tsx
import { Pagination } from '@/components/ui/pagination';
```

分页容器的根组件。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.ComponentProps<"nav">` 的所有属性

**默认样式:**

- 语义化: `role="navigation"` 和 `aria-label="pagination"`
- 布局: 居中对齐，全宽，水平居中 (mx-auto flex w-full justify-center)

### PaginationContent

```tsx
import { PaginationContent } from '@/components/ui/pagination';
```

分页内容的列表容器。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.ComponentProps<"ul">` 的所有属性

**默认样式:**

- 布局: 弹性行布局，居中对齐
- 间距: 4px 间隔 (gap-1)

### PaginationItem

```tsx
import { PaginationItem } from '@/components/ui/pagination';
```

单个分页项的容器。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.ComponentProps<"li">` 的所有属性

### PaginationLink

```tsx
import { PaginationLink } from '@/components/ui/pagination';
```

分页链接组件，基于按钮样式构建。

**Props:**

- `className?`: 额外的 CSS 类名
- `isActive?`: 是否为当前活动页面
- `size?`: 尺寸，默认为 "icon"，继承自 ButtonProps
- 继承自 `React.ComponentProps<"a">` 的所有属性

**特性:**

- 活动状态: 使用 `aria-current="page"` 标识当前页面
- 样式变体: 活动时使用 "outline" 样式，非活动时使用 "ghost" 样式

### PaginationPrevious

```tsx
import { PaginationPrevious } from '@/components/ui/pagination';
```

上一页按钮组件。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `PaginationLink` 的所有属性

**特性:**

- 无障碍: `aria-label="Go to previous page"`
- 图标: 左箭头图标
- 文本: "Previous"
- 默认尺寸: "default"

### PaginationNext

```tsx
import { PaginationNext } from '@/components/ui/pagination';
```

下一页按钮组件。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `PaginationLink` 的所有属性

**特性:**

- 无障碍: `aria-label="Go to next page"`
- 图标: 右箭头图标
- 文本: "Next"
- 默认尺寸: "default"

### PaginationEllipsis

```tsx
import { PaginationEllipsis } from '@/components/ui/pagination';
```

省略号组件，表示省略的页面。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.ComponentProps<"span">` 的所有属性

**特性:**

- 图标: 水平省略号 (MoreHorizontal)
- 无障碍: `aria-hidden` 和屏幕阅读器文本 "More pages"
- 尺寸: 36px × 36px (h-9 w-9)

## 基础用法

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 完整分页示例

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function FullPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 可控制的分页

```tsx
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function ControlledPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 5; // 显示的页码数量
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={e => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault();
              handlePrevious();
            }}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault();
              handleNext();
            }}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 简化分页

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function SimplePagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm text-muted-foreground">
            第 2 页，共 10 页
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 与 React Hook 集成

```tsx
import { usePagination } from '@/hooks/use-pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function HookPagination() {
  const {
    currentPage,
    totalPages,
    pages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
  } = usePagination({
    total: 100,
    pageSize: 10,
    initialPage: 1,
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault();
              previousPage();
            }}
            className={!hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={e => {
                  e.preventDefault();
                  goToPage(page as number);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault();
              nextPage();
            }}
            className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 自定义样式

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function CustomPagination() {
  return (
    <Pagination className="my-8">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-full" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full w-10 h-10">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="rounded-full w-10 h-10 bg-primary text-primary-foreground"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full w-10 h-10">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-full" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 响应式分页

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function ResponsivePagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        {/* 桌面端显示更多页码 */}
        <PaginationItem className="hidden md:block">
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:block">
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden lg:block">
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden lg:block">
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## 特性

- **语义化HTML**: 使用正确的 nav 和 aria 属性
- **无障碍访问**: 完整的键盘导航和屏幕阅读器支持
- **灵活样式**: 基于按钮组件，支持所有按钮样式变体
- **响应式**: 支持移动端和桌面端的不同显示方式
- **可控制**: 支持受控和非受控使用方式
- **TypeScript**: 完整的类型支持

## 依赖项

- `lucide-react`: 图标组件 (ChevronLeft, ChevronRight, MoreHorizontal)
- `@/lib/utils`: 工具函数 (cn)
- `@/components/ui/button`: 按钮组件 (ButtonProps, buttonVariants)
