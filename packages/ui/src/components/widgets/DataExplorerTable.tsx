'use client';

import * as React from 'react';
import { forwardRef, useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
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

interface TableData {
  id: string;
  [key: string]: any;
}

interface FilterOption {
  label: string;
  value: any;
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

type SortDirection = 'asc' | 'desc' | null;
type FilterOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'between';
type TableExportFormat = 'csv' | 'excel' | 'json' | 'pdf';

interface DataExplorerTableProps {
  data?: TableData[];
  columns: ColumnConfig[];
  selectedRows?: string[];
  onRowSelect?: (rowIds: string[]) => void;
  onRowAction?: (rowId: string, action: string) => void;
  onBatchAction?: (rowIds: string[], action: string) => void;
  onSort?: (columnId: string, direction: SortDirection) => void;
  onFilter?: (filters: FilterConfig[]) => void;
  onExport?: (format: TableExportFormat, data: TableData[]) => void;
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

const DataExplorerTable = forwardRef<HTMLDivElement, DataExplorerTableProps>(
  (
    {
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
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{
      columnId: string;
      direction: SortDirection;
    }>({
      columnId: '',
      direction: null,
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
                return String(value)
                  .toLowerCase()
                  .includes(String(filter.value).toLowerCase());
              case 'startsWith':
                return String(value)
                  .toLowerCase()
                  .startsWith(String(filter.value).toLowerCase());
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
              comparison =
                new Date(aValue).getTime() - new Date(bValue).getTime();
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
      ? processedData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
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

      setSortConfig({
        columnId: newDirection ? columnId : '',
        direction: newDirection,
      });
      onSort?.(columnId, newDirection);
    };

    // 处理筛选
    const handleFilter = (
      columnId: string,
      operator: FilterOperator,
      value: any
    ) => {
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
    const renderCellContent = (
      value: any,
      row: TableData,
      column: ColumnConfig
    ) => {
      if (column.render) {
        return column.render(value, row);
      }

      switch (column.type) {
        case 'badge':
          return <Badge variant="outline">{value}</Badge>;
        case 'link':
          return (
            <a
              href={value}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          );
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
            onValueChange={value => handleFilter(column.id, 'equals', value)}
          >
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
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
          onChange={e => handleFilter(column.id, 'contains', e.target.value)}
          className="h-8"
        />
      );
    };

    // 渲染上下文菜单
    const renderContextMenu = (row: TableData, children: React.ReactNode) => {
      if (!enableContextMenu) return children;

      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
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

    const visibleColumnConfigs = columns.filter(col =>
      visibleColumns.includes(col.id)
    );

    return (
      <Card className={cn('w-full', className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">数据探索</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{processedData.length} 条记录</Badge>
              {selectedRows.length > 0 && (
                <Badge variant="default">已选 {selectedRows.length}</Badge>
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
                onChange={e => setSearchTerm(e.target.value)}
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
                          setVisibleColumns(
                            visibleColumns.filter(id => id !== column.id)
                          );
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
                    <DropdownMenuItem
                      onClick={() => onBatchAction?.(selectedRows, 'export')}
                    >
                      导出选中
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onBatchAction?.(selectedRows, 'delete')}
                    >
                      删除选中
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onBatchAction?.(selectedRows, 'archive')}
                    >
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
                    <DropdownMenuItem
                      onClick={() => onExport?.('csv', processedData)}
                    >
                      导出 CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onExport?.('excel', processedData)}
                    >
                      导出 Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onExport?.('json', processedData)}
                    >
                      导出 JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div
            className={cn('overflow-auto', virtualScroll && `h-[${height}px]`)}
          >
            <Table>
              <TableHeader>
                {/* 列标题行 */}
                <TableRow>
                  {enableRowSelection && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          paginatedData.length > 0 &&
                          selectedRows.length === paginatedData.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {visibleColumnConfigs.map(column => (
                    <TableHead
                      key={column.id}
                      className={cn(
                        'cursor-pointer select-none',
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
                            {sortConfig.columnId === column.id
                              ? sortConfig.direction === 'asc'
                                ? '↑'
                                : sortConfig.direction === 'desc'
                                  ? '↓'
                                  : '↕'
                              : '↕'}
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
                          'cursor-pointer',
                          isSelected && 'bg-muted/50'
                        )}
                        onClick={() => onRowAction?.(row.id, 'select')}
                      >
                        {enableRowSelection && (
                          <TableCell>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={checked =>
                                handleRowSelect(row.id, !!checked)
                              }
                              onClick={e => e.stopPropagation()}
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
                      colSpan={
                        visibleColumnConfigs.length +
                        (enableRowSelection ? 1 : 0)
                      }
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
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
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
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="text-sm text-muted-foreground text-center mt-2">
                显示第 {(currentPage - 1) * pageSize + 1} -{' '}
                {Math.min(currentPage * pageSize, processedData.length)} 项， 共{' '}
                {processedData.length} 项
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

DataExplorerTable.displayName = 'DataExplorerTable';

export { DataExplorerTable };
export type {
  DataExplorerTableProps,
  TableData,
  ColumnConfig,
  FilterConfig,
  FilterOption,
  SortDirection,
  FilterOperator,
  TableExportFormat,
};
