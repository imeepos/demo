# Table 组件文档

Table 组件是一套完整的表格组件，用于展示结构化数据。

## 组件导出

```typescript
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
```

## 基本用法

```tsx
<Table>
  <TableCaption>用户列表</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>姓名</TableHead>
      <TableHead>邮箱</TableHead>
      <TableHead>角色</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>张三</TableCell>
      <TableCell>zhangsan@example.com</TableCell>
      <TableCell>管理员</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>李四</TableCell>
      <TableCell>lisi@example.com</TableCell>
      <TableCell>用户</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 组件说明

- **Table**: 表格根组件，提供响应式滚动容器
- **TableHeader**: 表头区域
- **TableBody**: 表格主体内容
- **TableFooter**: 表格底部（可选）
- **TableRow**: 表格行
- **TableHead**: 表头单元格
- **TableCell**: 数据单元格
- **TableCaption**: 表格标题（可选）

## 使用示例

### 完整的数据表格

```tsx
const users = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: '活跃',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: '活跃',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: '禁用',
  },
];

function UserTable() {
  return (
    <Table>
      <TableCaption>用户管理列表</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>姓名</TableHead>
          <TableHead>邮箱</TableHead>
          <TableHead>角色</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === '活跃'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <button className="text-blue-600 hover:underline">编辑</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 带统计的表格

```tsx
const salesData = [
  { product: '产品 A', sales: 150, revenue: 15000 },
  { product: '产品 B', sales: 200, revenue: 25000 },
  { product: '产品 C', sales: 120, revenue: 18000 },
];

function SalesTable() {
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Table>
      <TableCaption>2024年产品销售统计</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>产品名称</TableHead>
          <TableHead className="text-right">销售数量</TableHead>
          <TableHead className="text-right">销售收入</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {salesData.map(item => (
          <TableRow key={item.product}>
            <TableCell className="font-medium">{item.product}</TableCell>
            <TableCell className="text-right">{item.sales}</TableCell>
            <TableCell className="text-right">
              ¥{item.revenue.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">总计</TableCell>
          <TableCell className="text-right font-medium">{totalSales}</TableCell>
          <TableCell className="text-right font-medium">
            ¥{totalRevenue.toLocaleString()}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### 可选择的表格

```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows(prev =>
      prev.length === users.length ? [] : users.map(u => u.id)
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <input
              type="checkbox"
              checked={selectedRows.length === users.length}
              onChange={toggleAll}
            />
          </TableHead>
          <TableHead>姓名</TableHead>
          <TableHead>邮箱</TableHead>
          <TableHead>状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow
            key={user.id}
            className={selectedRows.includes(user.id) ? 'bg-muted/50' : ''}
          >
            <TableCell>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => toggleRow(user.id)}
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 空状态表格

```tsx
function EmptyTable() {
  const data: any[] = [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>姓名</TableHead>
          <TableHead>邮箱</TableHead>
          <TableHead>状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              暂无数据
            </TableCell>
          </TableRow>
        ) : (
          data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
```

### 响应式表格

```tsx
function ResponsiveTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>产品</TableHead>
            <TableHead className="hidden md:table-cell">分类</TableHead>
            <TableHead className="hidden sm:table-cell">价格</TableHead>
            <TableHead>库存</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div>
                <div className="font-medium">iPhone 15</div>
                <div className="text-sm text-muted-foreground md:hidden">
                  智能手机 · ¥5999
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">智能手机</TableCell>
            <TableCell className="hidden sm:table-cell">¥5999</TableCell>
            <TableCell>100</TableCell>
            <TableCell className="text-right">
              <button className="text-blue-600 hover:underline">编辑</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
```

## 样式自定义

所有组件都支持 `className` 属性进行样式自定义：

```tsx
<Table className="border-2 border-red-200">
  <TableRow className="hover:bg-blue-50">
    <TableCell className="font-bold text-red-600">自定义样式</TableCell>
  </TableRow>
</Table>
```

## 特性

- 响应式设计，自动处理溢出滚动
- 支持斑马纹效果
- 提供悬停状态样式
- 支持选中状态
- 完全可自定义的样式系统
