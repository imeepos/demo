'use client';

import React, { forwardRef, useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
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

const AlertManagementWidget = forwardRef<
  HTMLDivElement,
  AlertManagementWidgetProps
>(
  (
    {
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
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState<FilterOption>(filterBy);
    const [expandedAlerts, setExpandedAlerts] = useState<Set<string>>(
      new Set()
    );
    const [processingAlerts, setProcessingAlerts] = useState<Set<string>>(
      new Set()
    );

    const filteredAlerts = useMemo(() => {
      let filtered = alerts;

      if (currentFilter !== 'all') {
        filtered = filtered.filter(alert => {
          switch (currentFilter) {
            case 'new':
              return alert.status === 'new';
            case 'processing':
              return ['acknowledged', 'processing'].includes(alert.status);
            case 'resolved':
              return ['resolved', 'closed'].includes(alert.status);
            case 'critical':
              return alert.level === 'critical';
            default:
              return true;
          }
        });
      }

      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'timestamp':
            return (
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          case 'level': {
            const levelOrder = { critical: 4, error: 3, warning: 2, info: 1 };
            return levelOrder[b.level] - levelOrder[a.level];
          }
          case 'priority': {
            const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          default:
            return 0;
        }
      });

      return filtered;
    }, [alerts, currentFilter, sortBy]);

    const totalPages = Math.ceil(filteredAlerts.length / pageSize);
    const paginatedAlerts = filteredAlerts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    const getAlertLevelVariant = (level: AlertLevel) => {
      switch (level) {
        case 'critical':
          return 'destructive';
        case 'error':
          return 'destructive';
        case 'warning':
          return 'default';
        case 'info':
          return 'secondary';
        default:
          return 'outline';
      }
    };

    const getStatusColor = (status: AlertStatus) => {
      switch (status) {
        case 'new':
          return 'bg-blue-100 text-blue-800';
        case 'acknowledged':
          return 'bg-yellow-100 text-yellow-800';
        case 'processing':
          return 'bg-orange-100 text-orange-800';
        case 'resolved':
          return 'bg-green-100 text-green-800';
        case 'closed':
          return 'bg-gray-100 text-gray-800';
        case 'escalated':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allIds = paginatedAlerts.map(alert => alert.id);
        onAlertSelect?.(allIds);
      } else {
        onAlertSelect?.([]);
      }
    };

    const handleSelectAlert = (alertId: string, checked: boolean) => {
      if (checked) {
        onAlertSelect?.([...selectedAlerts, alertId]);
      } else {
        onAlertSelect?.(selectedAlerts.filter(id => id !== alertId));
      }
    };

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

    const renderAlertItem = (alert: AlertItem) => {
      const isSelected = selectedAlerts.includes(alert.id);
      const isExpanded = expandedAlerts.has(alert.id);
      const isProcessing = processingAlerts.has(alert.id);

      return (
        <Card
          key={alert.id}
          className={cn(
            'mb-3 transition-all duration-200',
            isSelected && 'ring-2 ring-primary',
            alert.level === 'critical' && 'border-red-500'
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={checked =>
                    handleSelectAlert(alert.id, !!checked)
                  }
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant={getAlertLevelVariant(alert.level)}>
                      {alert.level.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <Badge variant="outline">{alert.priority}</Badge>
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
                    {alert.location && (
                      <span>地区: {alert.location.region}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isProcessing && (
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={alert.processing?.progress || 0}
                      className="w-16 h-2"
                    />
                    <span className="text-xs text-muted-foreground">
                      处理中
                    </span>
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
                        onClick={() =>
                          handleAlertAction(alert.id, 'acknowledge')
                        }
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

          <Collapsible open={isExpanded}>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">关键词</h4>
                    <div className="flex flex-wrap gap-1">
                      {alert.keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
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
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
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
      <Card className={cn('w-full', className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">预警管理</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">总计: {filteredAlerts.length}</Badge>
              {selectedAlerts.length > 0 && (
                <Badge variant="default">已选: {selectedAlerts.length}</Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {showStatusFilter && (
              <Tabs
                value={currentFilter}
                onValueChange={value => setCurrentFilter(value as FilterOption)}
              >
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
                    onClick={() =>
                      onBatchAction?.(selectedAlerts, 'acknowledge')
                    }
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

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
          )}
        </CardContent>
      </Card>
    );
  }
);

AlertManagementWidget.displayName = 'AlertManagementWidget';

export { AlertManagementWidget };
export type {
  AlertManagementWidgetProps,
  AlertItem,
  AlertLevel,
  AlertStatus,
  AlertAction,
  BatchAction,
};
