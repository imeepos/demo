# AlertManagementWidget - 预警管理组件

## 📋 组件概述

AlertManagementWidget 是专为舆情预警管理设计的综合组件，提供预警信息展示、状态管理、批量操作等功能。支持多级预警分类、实时状态更新和处理流程跟踪。

### 核心业务场景

- 舆情预警信息管理
- 预警等级分类展示
- 批量处理和状态更新
- 预警处理流程跟踪

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Alert: 预警信息主体容器
- Badge: 预警等级和状态标识
- Button: 操作和处理按钮
- Dropdown Menu: 批量操作菜单
- Pagination: 预警列表分页
- Checkbox: 批量选择控制
- Tabs: 预警状态分类
- Progress: 处理进度显示
```

### 视觉一致性要求

- 明确的预警等级色彩编码
- 统一的操作按钮样式
- 清晰的状态变更反馈
- 响应式列表布局

### 交互行为规范

- 预警项的展开折叠
- 批量选择和操作
- 状态变更的实时反馈
- 处理历史的查看

## 🔧 核心用途

### 主要功能

1. **预警展示**: 多级预警信息的分类展示
2. **状态管理**: 预警状态的变更和跟踪
3. **批量操作**: 多个预警的批量处理
4. **流程跟踪**: 预警处理过程的记录

### 适用业务场景

- 政府舆情预警中心
- 企业危机管理系统
- 媒体监控预警
- 安全运营中心

### 用户交互流程

1. 查看预警列表和等级
2. 选择需要处理的预警
3. 执行处理操作或批量操作
4. 跟踪处理进度和结果
5. 查看处理历史记录

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
```

### TypeScript 接口定义

```typescript
interface AlertManagementWidgetProps {
  alerts?: AlertItem[];
  selectedAlerts?: string[];
  onAlertSelect?: (alertIds: string[]) => void;
  onAlertAction?: (alertId: string, action: AlertAction) => void;
  onBatchAction?: (alertIds: string[], action: BatchAction) => void;
  onAlertStatusChange?: (alertId: string, status: AlertStatus) => void;
  className?: string;
  showBatchActions?: boolean;
  showStatusFilter?: boolean;
  pageSize?: number;
  sortBy?: SortOption;
  filterBy?: FilterOption;
}

interface AlertItem {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  status: AlertStatus;
  source: {
    name: string;
    type: 'news' | 'social' | 'forum' | 'video';
    url?: string;
  };
  timestamp: Date;
  keywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  location?: {
    region: string;
    coordinates?: [number, number];
  };
  metrics: {
    engagement: number;
    reach: number;
    influence: number;
  };
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  attachments?: string[];
  processing?: {
    progress: number;
    currentStep: string;
    estimatedTime?: number;
  };
}

type AlertLevel = 'info' | 'warning' | 'error' | 'critical';
type AlertStatus =
  | 'new'
  | 'acknowledged'
  | 'processing'
  | 'resolved'
  | 'closed'
  | 'escalated';
type AlertAction =
  | 'acknowledge'
  | 'assign'
  | 'resolve'
  | 'escalate'
  | 'close'
  | 'archive';
type BatchAction = 'acknowledge' | 'resolve' | 'assign' | 'delete' | 'export';
type SortOption = 'timestamp' | 'level' | 'status' | 'priority';
type FilterOption = 'all' | 'new' | 'processing' | 'resolved' | 'critical';
```

### 关键实现逻辑

```typescript
const AlertManagementWidget = forwardRef<HTMLDivElement, AlertManagementWidgetProps>(
  ({
    alerts = [],
    selectedAlerts = [],
    onAlertSelect,
    onAlertAction,
    onBatchAction,
    onAlertStatusChange,
    className,
    showBatchActions = true,
    showStatusFilter = true,
    pageSize = 10,
    sortBy = 'timestamp',
    filterBy = 'all',
    ...props
  }, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState<FilterOption>(filterBy);
    const [expandedAlerts, setExpandedAlerts] = useState<Set<string>>(new Set());
    const [processingAlerts, setProcessingAlerts] = useState<Set<string>>(new Set());

    // 过滤和排序alerts
    const filteredAlerts = useMemo(() => {
      let filtered = alerts;

      // 状态过滤
      if (currentFilter !== 'all') {
        filtered = filtered.filter(alert => {
          switch (currentFilter) {
            case 'new': return alert.status === 'new';
            case 'processing': return ['acknowledged', 'processing'].includes(alert.status);
            case 'resolved': return ['resolved', 'closed'].includes(alert.status);
            case 'critical': return alert.level === 'critical';
            default: return true;
          }
        });
      }

      // 排序
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'timestamp':
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          case 'level':
            const levelOrder = { critical: 4, error: 3, warning: 2, info: 1 };
            return levelOrder[b.level] - levelOrder[a.level];
          case 'priority':
            const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          default:
            return 0;
        }
      });

      return filtered;
    }, [alerts, currentFilter, sortBy]);

    // 分页
    const totalPages = Math.ceil(filteredAlerts.length / pageSize);
    const paginatedAlerts = filteredAlerts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    // 获取预警等级样式
    const getAlertLevelVariant = (level: AlertLevel) => {
      switch (level) {
        case 'critical': return 'destructive';
        case 'error': return 'destructive';
        case 'warning': return 'default';
        case 'info': return 'secondary';
        default: return 'outline';
      }
    };

    // 获取状态颜色
    const getStatusColor = (status: AlertStatus) => {
      switch (status) {
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
        case 'processing': return 'bg-orange-100 text-orange-800';
        case 'resolved': return 'bg-green-100 text-green-800';
        case 'closed': return 'bg-gray-100 text-gray-800';
        case 'escalated': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    // 处理全选
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allIds = paginatedAlerts.map(alert => alert.id);
        onAlertSelect?.(allIds);
      } else {
        onAlertSelect?.([]);
      }
    };

    // 处理单个选择
    const handleSelectAlert = (alertId: string, checked: boolean) => {
      if (checked) {
        onAlertSelect?.([...selectedAlerts, alertId]);
      } else {
        onAlertSelect?.(selectedAlerts.filter(id => id !== alertId));
      }
    };

    // 处理预警操作
    const handleAlertAction = async (alertId: string, action: AlertAction) => {
      setProcessingAlerts(prev => new Set([...prev, alertId]));
      try {
        await onAlertAction?.(alertId, action);
      } finally {
        setProcessingAlerts(prev => {
          const newSet = new Set(prev);
          newSet.delete(alertId);
          return newSet;
        });
      }
    };

    // 切换展开状态
    const toggleExpanded = (alertId: string) => {
      setExpandedAlerts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(alertId)) {
          newSet.delete(alertId);
        } else {
          newSet.add(alertId);
        }
        return newSet;
      });
    };

    // 渲染预警项
    const renderAlertItem = (alert: AlertItem) => {
      const isSelected = selectedAlerts.includes(alert.id);
      const isExpanded = expandedAlerts.has(alert.id);
      const isProcessing = processingAlerts.has(alert.id);

      return (
        <Card key={alert.id} className={cn(
          "mb-3 transition-all duration-200",
          isSelected && "ring-2 ring-primary",
          alert.level === 'critical' && "border-red-500"
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => handleSelectAlert(alert.id, !!checked)}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant={getAlertLevelVariant(alert.level)}>
                      {alert.level.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <Badge variant="outline">
                      {alert.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {alert.timestamp.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="font-medium text-sm leading-5 mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {alert.description}
                  </p>

                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>来源: {alert.source.name}</span>
                    <span>影响力: {alert.metrics.influence}</span>
                    {alert.location && <span>地区: {alert.location.region}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isProcessing && (
                  <div className="flex items-center space-x-2">
                    <Progress value={alert.processing?.progress || 0} className="w-16 h-2" />
                    <span className="text-xs text-muted-foreground">处理中</span>
                  </div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {alert.status === 'new' && (
                      <DropdownMenuItem
                        onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                      >
                        确认预警
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleAlertAction(alert.id, 'assign')}
                    >
                      分配处理人
                    </DropdownMenuItem>
                    {!['resolved', 'closed'].includes(alert.status) && (
                      <DropdownMenuItem
                        onClick={() => handleAlertAction(alert.id, 'resolve')}
                      >
                        标记已解决
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleAlertAction(alert.id, 'escalate')}
                    >
                      升级预警
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAlertAction(alert.id, 'archive')}
                    >
                      归档
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(alert.id)}
                >
                  {isExpanded ? '⬆️' : '⬇️'}
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* 展开详情 */}
          <Collapsible open={isExpanded}>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">关键词</h4>
                    <div className="flex flex-wrap gap-1">
                      {alert.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">指标数据</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>互动量:</span>
                        <span>{alert.metrics.engagement.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>覆盖量:</span>
                        <span>{alert.metrics.reach.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {alert.assignee && (
                    <div>
                      <h4 className="font-medium mb-2">处理人</h4>
                      <div className="flex items-center space-x-2">
                        {alert.assignee.avatar && (
                          <img
                            src={alert.assignee.avatar}
                            alt={alert.assignee.name}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <span>{alert.assignee.name}</span>
                      </div>
                    </div>
                  )}

                  {alert.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">标签</h4>
                      <div className="flex flex-wrap gap-1">
                        {alert.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      );
    };

    return (
      <Card className={cn("w-full", className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">预警管理</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                总计: {filteredAlerts.length}
              </Badge>
              {selectedAlerts.length > 0 && (
                <Badge variant="default">
                  已选: {selectedAlerts.length}
                </Badge>
              )}
            </div>
          </div>

          {/* 过滤和批量操作 */}
          <div className="flex items-center justify-between">
            {showStatusFilter && (
              <Tabs value={currentFilter} onValueChange={(value) => setCurrentFilter(value as FilterOption)}>
                <TabsList>
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="new">新预警</TabsTrigger>
                  <TabsTrigger value="processing">处理中</TabsTrigger>
                  <TabsTrigger value="resolved">已解决</TabsTrigger>
                  <TabsTrigger value="critical">紧急</TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            {showBatchActions && selectedAlerts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    批量操作 ({selectedAlerts.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => onBatchAction?.(selectedAlerts, 'acknowledge')}
                  >
                    批量确认
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onBatchAction?.(selectedAlerts, 'resolve')}
                  >
                    批量解决
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onBatchAction?.(selectedAlerts, 'assign')}
                  >
                    批量分配
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onBatchAction?.(selectedAlerts, 'export')}
                  >
                    导出选中
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 全选控制 */}
          {paginatedAlerts.length > 0 && (
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Checkbox
                checked={selectedAlerts.length === paginatedAlerts.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">
                全选当前页 ({paginatedAlerts.length} 项)
              </span>
            </div>
          )}

          {/* 预警列表 */}
          <div className="space-y-3">
            {paginatedAlerts.length > 0 ? (
              paginatedAlerts.map(renderAlertItem)
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🚨</div>
                <p className="text-muted-foreground">暂无预警信息</p>
              </div>
            )}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
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
          )}
        </CardContent>
      </Card>
    );
  }
);

AlertManagementWidget.displayName = "AlertManagementWidget";
```

### 样式和动画规范

```css
/* 预警项悬浮效果 */
.alert-item:hover {
  @apply shadow-md transform scale-[1.01] transition-all duration-200;
}

/* 紧急预警动画 */
.alert-critical {
  @apply animate-pulse border-red-500;
}

/* 选中状态 */
.alert-selected {
  @apply ring-2 ring-primary ring-offset-2;
}

/* 状态变更动画 */
.status-change {
  @apply transition-all duration-300 ease-in-out;
}

/* 批量操作按钮 */
.batch-actions {
  @apply animate-fade-in;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { AlertManagementWidget } from "@/components/widgets";

function AlertCenter() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const handleAlertAction = async (alertId: string, action: AlertAction) => {
    // 处理单个预警操作
    await processAlert(alertId, action);
    // 刷新数据
    fetchAlerts();
  };

  const handleBatchAction = async (alertIds: string[], action: BatchAction) => {
    // 处理批量操作
    await processBatchAlerts(alertIds, action);
    setSelectedAlerts([]);
    fetchAlerts();
  };

  return (
    <AlertManagementWidget
      alerts={alerts}
      selectedAlerts={selectedAlerts}
      onAlertSelect={setSelectedAlerts}
      onAlertAction={handleAlertAction}
      onBatchAction={handleBatchAction}
      showBatchActions={true}
      showStatusFilter={true}
      pageSize={15}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性             | 类型                                              | 默认值 | 描述             |
| ---------------- | ------------------------------------------------- | ------ | ---------------- |
| alerts           | AlertItem[]                                       | []     | 预警列表数据     |
| selectedAlerts   | string[]                                          | []     | 已选择的预警ID   |
| onAlertSelect    | (alertIds: string[]) => void                      | -      | 预警选择回调     |
| onAlertAction    | (alertId: string, action: AlertAction) => void    | -      | 单个预警操作回调 |
| onBatchAction    | (alertIds: string[], action: BatchAction) => void | -      | 批量操作回调     |
| showBatchActions | boolean                                           | true   | 是否显示批量操作 |
| showStatusFilter | boolean                                           | true   | 是否显示状态筛选 |
| pageSize         | number                                            | 10     | 每页显示数量     |

### 事件回调

- `onAlertSelect`: 预警选择变化时触发
- `onAlertAction`: 执行单个预警操作时触发
- `onBatchAction`: 执行批量操作时触发

## 🎨 最佳实践

### 设计建议

1. 预警等级要有明确的视觉区分
2. 批量操作要有确认机制
3. 状态变更要有实时反馈
4. 处理流程要可追溯

### 性能优化

1. 大量预警使用虚拟滚动
2. 状态更新使用乐观更新
3. 批量操作使用队列处理
4. 合理使用防抖避免频繁操作
