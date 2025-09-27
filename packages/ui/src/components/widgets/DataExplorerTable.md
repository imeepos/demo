# DataExplorerTable - 数据探索表格组件

## 📋 组件概述

DataExplorerTable 是专为舆情数据分析设计的智能表格组件，提供数据排序、筛选、搜索、导出等功能。支持大数据量展示、列自定义、行操作等高级特性，帮助用户高效探索和分析数据。

### 核心业务场景

- 舆情数据表格展示
- 多维度数据筛选分析
- 数据导出和批量操作
- 详细信息快速查看

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Table: 表格主体容器
- Input: 搜索和筛选输入框
- Select: 下拉选择筛选器
- Checkbox: 行选择和全选控制
- Pagination: 表格分页组件
- Context Menu: 右键操作菜单
- Button: 操作和导出按钮
- Badge: 状态和标签显示
```

### 视觉一致性要求

- 清晰的表格行列对齐
- 统一的排序和筛选图标
- 一致的操作按钮样式
- 响应式表格布局

### 交互行为规范

- 列标题点击排序
- 行悬浮高亮显示
- 右键菜单快捷操作
- 筛选条件实时生效

## 🔧 核心用途

### 主要功能

1. **数据展示**: 结构化数据的表格展示
2. **智能筛选**: 多列条件筛选和搜索
3. **数据排序**: 支持多列排序组合
4. **批量操作**: 行选择和批量处理

### 适用业务场景

- 舆情数据分析
- 媒体内容管理
- 报告数据查看
- 监测结果展示

### 用户交互流程

1. 查看表格数据概览
2. 使用筛选条件细化数据
3. 排序查看特定维度数据
4. 选择行进行批量操作
5. 导出筛选后的数据

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
```

### TypeScript 接口定义

```typescript
interface DataExplorerTableProps {
  data?: TableData[];
  columns: ColumnConfig[];
  selectedRows?: string[];
  onRowSelect?: (rowIds: string[]) => void;
  onRowAction?: (rowId: string, action: string) => void;
  onBatchAction?: (rowIds: string[], action: string) => void;
  onSort?: (columnId: string, direction: SortDirection) => void;
  onFilter?: (filters: FilterConfig[]) => void;
  onExport?: (format: ExportFormat, data: TableData[]) => void;
  className?: string;
  pageSize?: number;
  showPagination?: boolean;
  showFilters?: boolean;
  showExport?: boolean;
  enableContextMenu?: boolean;
  enableRowSelection?: boolean;
  virtualScroll?: boolean;
  height?: number;
}

interface TableData {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  id: string;
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'select' | 'badge' | 'link' | 'custom';
  render?: (value: any, row: TableData) => React.ReactNode;
  filterOptions?: FilterOption[];
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  hidden?: boolean;
}

interface FilterConfig {
  columnId: string;
  operator: FilterOperator;
  value: any;
}

interface FilterOption {
  label: string;
  value: any;
}

type SortDirection = 'asc' | 'desc' | null;
type FilterOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'between';
type ExportFormat = 'csv' | 'excel' | 'json' | 'pdf';
```

### 关键实现逻辑

```typescript
const DataExplorerTable = forwardRef<HTMLDivElement, DataExplorerTableProps>(
  ({
    data = [],
    columns,
    selectedRows = [],
    onRowSelect,
    onRowAction,
    onBatchAction,
    onSort,
    onFilter,
    onExport,
    className,
    pageSize = 20,
    showPagination = true,
    showFilters = true,
    showExport = true,
    enableContextMenu = true,
    enableRowSelection = true,
    virtualScroll = false,
    height = 600,
    ...props
  }, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{columnId: string, direction: SortDirection}>({
      columnId: '',
      direction: null
    });
    const [filters, setFilters] = useState<FilterConfig[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
      columns.filter(col => !col.hidden).map(col => col.id)
    );

    // 数据处理
    const processedData = useMemo(() => {
      let result = [...data];

      // 搜索过滤
      if (searchTerm) {
        result = result.filter(row =>
          Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      // 列筛选
      filters.forEach(filter => {
        const column = columns.find(col => col.id === filter.columnId);
        if (column) {
          result = result.filter(row => {
            const value = row[column.key];
            switch (filter.operator) {
              case 'equals':
                return value === filter.value;
              case 'contains':
                return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
              case 'startsWith':
                return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
              case 'greaterThan':
                return Number(value) > Number(filter.value);
              case 'lessThan':
                return Number(value) < Number(filter.value);
              default:
                return true;
            }
          });
        }
      });

      // 排序
      if (sortConfig.columnId && sortConfig.direction) {
        const column = columns.find(col => col.id === sortConfig.columnId);
        if (column) {
          result.sort((a, b) => {
            const aValue = a[column.key];
            const bValue = b[column.key];

            let comparison = 0;
            if (column.type === 'number') {
              comparison = Number(aValue) - Number(bValue);
            } else if (column.type === 'date') {
              comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
            } else {
              comparison = String(aValue).localeCompare(String(bValue));
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
          });
        }
      }

      return result;
    }, [data, searchTerm, filters, sortConfig, columns]);

    // 分页数据
    const totalPages = Math.ceil(processedData.length / pageSize);
    const paginatedData = showPagination
      ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : processedData;

    // 处理排序
    const handleSort = (columnId: string) => {
      const column = columns.find(col => col.id === columnId);
      if (!column?.sortable) return;

      let newDirection: SortDirection = 'asc';
      if (sortConfig.columnId === columnId) {
        if (sortConfig.direction === 'asc') {
          newDirection = 'desc';
        } else if (sortConfig.direction === 'desc') {
          newDirection = null;
        }
      }

      setSortConfig({ columnId: newDirection ? columnId : '', direction: newDirection });
      onSort?.(columnId, newDirection);
    };

    // 处理筛选
    const handleFilter = (columnId: string, operator: FilterOperator, value: any) => {
      const newFilters = filters.filter(f => f.columnId !== columnId);
      if (value !== '' && value !== null && value !== undefined) {
        newFilters.push({ columnId, operator, value });
      }
      setFilters(newFilters);
      onFilter?.(newFilters);
    };

    // 处理行选择
    const handleRowSelect = (rowId: string, checked: boolean) => {
      if (checked) {
        onRowSelect?.([...selectedRows, rowId]);
      } else {
        onRowSelect?.(selectedRows.filter(id => id !== rowId));
      }
    };

    // 处理全选
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allIds = paginatedData.map(row => row.id);
        onRowSelect?.(allIds);
      } else {
        onRowSelect?.([]);
      }
    };

    // 渲染单元格内容
    const renderCellContent = (value: any, row: TableData, column: ColumnConfig) => {
      if (column.render) {
        return column.render(value, row);
      }

      switch (column.type) {
        case 'badge':
          return <Badge variant="outline">{value}</Badge>;
        case 'link':
          return <a href={value} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{value}</a>;
        case 'date':
          return new Date(value).toLocaleDateString();
        case 'number':
          return typeof value === 'number' ? value.toLocaleString() : value;
        default:
          return String(value);
      }
    };

    // 渲染表头筛选
    const renderColumnFilter = (column: ColumnConfig) => {
      if (!column.filterable) return null;

      const currentFilter = filters.find(f => f.columnId === column.id);

      if (column.filterOptions) {
        return (
          <Select
            value={currentFilter?.value || ''}
            onValueChange={(value) => handleFilter(column.id, 'equals', value)}
          >
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全部</SelectItem>
              {column.filterOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }

      return (
        <Input
          placeholder={`筛选${column.title}`}
          value={currentFilter?.value || ''}
          onChange={(e) => handleFilter(column.id, 'contains', e.target.value)}
          className="h-8"
        />
      );
    };

    // 渲染上下文菜单
    const renderContextMenu = (row: TableData, children: React.ReactNode) => {
      if (!enableContextMenu) return children;

      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            {children}
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => onRowAction?.(row.id, 'view')}>
              查看详情
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onRowAction?.(row.id, 'edit')}>
              编辑
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onRowAction?.(row.id, 'copy')}>
              复制
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onRowAction?.(row.id, 'delete')}>
              删除
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    };

    const visibleColumnConfigs = columns.filter(col => visibleColumns.includes(col.id));

    return (
      <Card className={cn("w-full", className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">数据探索</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {processedData.length} 条记录
              </Badge>
              {selectedRows.length > 0 && (
                <Badge variant="default">
                  已选 {selectedRows.length}
                </Badge>
              )}
            </div>
          </div>

          {/* 工具栏 */}
          <div className="flex items-center justify-between gap-4">
            {/* 搜索框 */}
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="搜索数据..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* 列显示控制 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    列设置
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {columns.map(column => (
                    <DropdownMenuItem
                      key={column.id}
                      onClick={() => {
                        if (visibleColumns.includes(column.id)) {
                          setVisibleColumns(visibleColumns.filter(id => id !== column.id));
                        } else {
                          setVisibleColumns([...visibleColumns, column.id]);
                        }
                      }}
                    >
                      <Checkbox
                        checked={visibleColumns.includes(column.id)}
                        className="mr-2"
                      />
                      {column.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 批量操作 */}
              {selectedRows.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      批量操作 ({selectedRows.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onBatchAction?.(selectedRows, 'export')}>
                      导出选中
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onBatchAction?.(selectedRows, 'delete')}>
                      删除选中
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onBatchAction?.(selectedRows, 'archive')}>
                      归档选中
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* 导出按钮 */}
              {showExport && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      导出
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onExport?.('csv', processedData)}>
                      导出 CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport?.('excel', processedData)}>
                      导出 Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport?.('json', processedData)}>
                      导出 JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className={cn("overflow-auto", virtualScroll && `h-[${height}px]`)}>
            <Table>
              <TableHeader>
                {/* 列标题行 */}
                <TableRow>
                  {enableRowSelection && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {visibleColumnConfigs.map(column => (
                    <TableHead
                      key={column.id}
                      className={cn(
                        "cursor-pointer select-none",
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                      style={{ width: column.width }}
                      onClick={() => handleSort(column.id)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.title}</span>
                        {column.sortable && (
                          <span className="text-muted-foreground">
                            {sortConfig.columnId === column.id ? (
                              sortConfig.direction === 'asc' ? '↑' :
                              sortConfig.direction === 'desc' ? '↓' : '↕'
                            ) : '↕'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>

                {/* 筛选行 */}
                {showFilters && (
                  <TableRow>
                    {enableRowSelection && <TableHead />}
                    {visibleColumnConfigs.map(column => (
                      <TableHead key={`${column.id}-filter`}>
                        {renderColumnFilter(column)}
                      </TableHead>
                    ))}
                  </TableRow>
                )}
              </TableHeader>

              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map(row => {
                    const isSelected = selectedRows.includes(row.id);
                    return renderContextMenu(
                      row,
                      <TableRow
                        key={row.id}
                        className={cn(
                          "cursor-pointer",
                          isSelected && "bg-muted/50"
                        )}
                        onClick={() => onRowAction?.(row.id, 'select')}
                      >
                        {enableRowSelection && (
                          <TableCell>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleRowSelect(row.id, !!checked)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                        )}
                        {visibleColumnConfigs.map(column => (
                          <TableCell
                            key={column.id}
                            className={cn(
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right'
                            )}
                          >
                            {renderCellContent(row[column.key], row, column)}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumnConfigs.length + (enableRowSelection ? 1 : 0)}
                      className="text-center py-8"
                    >
                      <div className="text-muted-foreground">
                        <div className="text-4xl mb-2">📊</div>
                        <p>暂无数据</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* 分页 */}
          {showPagination && totalPages > 1 && (
            <div className="p-4 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="text-sm text-muted-foreground text-center mt-2">
                显示第 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, processedData.length)} 项，
                共 {processedData.length} 项
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

DataExplorerTable.displayName = "DataExplorerTable";
```

### 样式和动画规范

```css
/* 表格行悬浮效果 */
.table-row:hover {
  @apply bg-muted/50 transition-colors duration-150;
}

/* 选中行样式 */
.table-row-selected {
  @apply bg-primary/10 border-primary/20;
}

/* 排序指示器 */
.sort-indicator {
  @apply transition-all duration-200 ease-in-out;
}

/* 筛选输入框动画 */
.filter-input:focus {
  @apply ring-2 ring-primary ring-offset-2 transition-all duration-200;
}

/* 表格加载动画 */
.table-loading {
  @apply animate-pulse;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { DataExplorerTable } from "@/components/widgets";

function DataAnalysis() {
  const columns: ColumnConfig[] = [
    {
      id: 'title',
      key: 'title',
      title: '标题',
      sortable: true,
      filterable: true,
      type: 'text'
    },
    {
      id: 'sentiment',
      key: 'sentiment',
      title: '情感',
      sortable: true,
      filterable: true,
      type: 'badge',
      filterOptions: [
        { label: '正面', value: 'positive' },
        { label: '负面', value: 'negative' },
        { label: '中性', value: 'neutral' }
      ]
    },
    {
      id: 'timestamp',
      key: 'timestamp',
      title: '时间',
      sortable: true,
      type: 'date'
    },
    {
      id: 'engagement',
      key: 'engagement',
      title: '互动量',
      sortable: true,
      type: 'number',
      align: 'right'
    }
  ];

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleExport = (format: ExportFormat, data: TableData[]) => {
    // 导出数据逻辑
    console.log(`导出 ${format} 格式，共 ${data.length} 条数据`);
  };

  return (
    <DataExplorerTable
      data={sentimentData}
      columns={columns}
      selectedRows={selectedRows}
      onRowSelect={setSelectedRows}
      onExport={handleExport}
      pageSize={20}
      showFilters={true}
      enableContextMenu={true}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性               | 类型                                                 | 默认值 | 描述             |
| ------------------ | ---------------------------------------------------- | ------ | ---------------- |
| data               | TableData[]                                          | []     | 表格数据         |
| columns            | ColumnConfig[]                                       | -      | 列配置           |
| selectedRows       | string[]                                             | []     | 已选择的行ID     |
| onRowSelect        | (rowIds: string[]) => void                           | -      | 行选择回调       |
| onRowAction        | (rowId: string, action: string) => void              | -      | 行操作回调       |
| onBatchAction      | (rowIds: string[], action: string) => void           | -      | 批量操作回调     |
| onSort             | (columnId: string, direction: SortDirection) => void | -      | 排序回调         |
| onFilter           | (filters: FilterConfig[]) => void                    | -      | 筛选回调         |
| onExport           | (format: ExportFormat, data: TableData[]) => void    | -      | 导出回调         |
| pageSize           | number                                               | 20     | 每页显示数量     |
| showPagination     | boolean                                              | true   | 是否显示分页     |
| showFilters        | boolean                                              | true   | 是否显示筛选     |
| enableContextMenu  | boolean                                              | true   | 是否启用右键菜单 |
| enableRowSelection | boolean                                              | true   | 是否启用行选择   |

### 事件回调

- `onRowSelect`: 行选择变化时触发
- `onRowAction`: 执行行操作时触发
- `onBatchAction`: 执行批量操作时触发
- `onSort`: 排序变化时触发
- `onFilter`: 筛选条件变化时触发
- `onExport`: 导出操作时触发

## 🎨 最佳实践

### 设计建议

1. 合理设置列宽避免内容截断
2. 筛选选项要符合用户认知
3. 排序指示器要清晰可见
4. 右键菜单功能要实用

### 性能优化

1. 大数据量使用虚拟滚动
2. 筛选和排序使用防抖
3. 列配置使用缓存
4. 分页数据按需加载
