import { useState } from 'react';
import { Activity, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Skeleton,
} from '@sker/ui';
import { cn } from '@sker/ui';
import { useQueryAgentExecutionFindExecutions } from '../../hooks/agentExecution';
import { AgentExecutionActions } from './AgentExecutionActions';
import { AgentExecutionDetail } from './AgentExecutionDetail';

interface AgentExecutionTableProps {
  searchQuery: string;
  selectedAgent: string;
  selectedStatus: string;
  dateRange: [Date?, Date?];
}

export function AgentExecutionTable({
  searchQuery,
  selectedAgent,
  selectedStatus,
  dateRange,
}: AgentExecutionTableProps) {
  const [viewingExecution, setViewingExecution] = useState<any>(null);

  const queryParams = Object.fromEntries(
    Object.entries({
      agentId: selectedAgent ? Number(selectedAgent) : undefined,
      status:
        selectedStatus &&
        ['pending', 'completed', 'failed', 'running'].includes(selectedStatus)
          ? (selectedStatus as 'pending' | 'completed' | 'failed' | 'running')
          : undefined,
      startDate: dateRange[0]?.toISOString(),
      endDate: dateRange[1]?.toISOString(),
      inputKeyword: searchQuery || undefined,
    }).filter(([, value]) => value !== undefined)
  );

  const {
    data: executions,
    isLoading,
    error,
  } = useQueryAgentExecutionFindExecutions({
    url: '/api/executions',
    query: queryParams,
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      running: {
        variant: 'default',
        label: '运行中',
        className: 'bg-blue-100 text-blue-800',
      },
      success: {
        variant: 'default',
        label: '成功',
        className: 'bg-green-100 text-green-800',
      },
      failed: {
        variant: 'destructive',
        label: '失败',
        className: 'bg-red-100 text-red-800',
      },
      cancelled: {
        variant: 'secondary',
        label: '已取消',
        className: 'bg-gray-100 text-gray-800',
      },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || {
      variant: 'outline' as const,
      label: '未知',
      className: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatDuration = (startTime: string, endTime?: string) => {
    if (!endTime) return '-';
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.round((end.getTime() - start.getTime()) / 1000);

    if (duration < 60) return `${duration}s`;
    if (duration < 3600)
      return `${Math.floor(duration / 60)}m ${duration % 60}s`;
    return `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>执行ID</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>结束时间</TableHead>
              <TableHead>耗时</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        <p>加载数据时发生错误</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>执行ID</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>结束时间</TableHead>
              <TableHead>耗时</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!executions || executions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Activity className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">暂无执行记录</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              executions.map((execution: any) => (
                <TableRow key={execution.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {execution.id?.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="font-medium">
                    {execution.agent?.name ||
                      execution.agentName ||
                      '未知Agent'}
                  </TableCell>
                  <TableCell>{getStatusBadge(execution.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatTime(execution.startTime)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {execution.endTime ? formatTime(execution.endTime) : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {formatDuration(execution.startTime, execution.endTime)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <AgentExecutionActions
                      execution={execution}
                      onView={setViewingExecution}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AgentExecutionDetail
        execution={viewingExecution}
        open={!!viewingExecution}
        onOpenChange={open => !open && setViewingExecution(null)}
      />
    </>
  );
}
