import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Card,
  Badge,
  Separator,
  ScrollArea,
} from '@sker/ui';
import {
  Clock,
  User,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useQueryAgentExecutionGetExecution } from '../../hooks/agentExecution';

interface AgentExecutionDetailProps {
  execution: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgentExecutionDetail({
  execution,
  open,
  onOpenChange,
}: AgentExecutionDetailProps) {
  const { data: executionDetail, isLoading } =
    useQueryAgentExecutionGetExecution(
      { url: '/api/executions/{id}', path: { id: execution?.id } },
      { enabled: !!execution?.id }
    );

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

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
        {getStatusIcon(status)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const detail = executionDetail || execution;

  if (!execution) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            执行详情
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6">
            {/* 基本信息 */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">基本信息</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">执行ID</span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {detail.id}
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Agent名称
                  </span>
                  <span className="text-sm font-medium">
                    {detail.agent?.name || detail.agentName || '未知Agent'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">状态</span>
                  {getStatusBadge(detail.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    开始时间
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {formatTime(detail.startTime)}
                  </div>
                </div>
                {detail.endTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      结束时间
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {formatTime(detail.endTime)}
                    </div>
                  </div>
                )}
                {detail.createdBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      创建者
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3 text-muted-foreground" />
                      {detail.createdBy}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* 执行参数 */}
            {detail.parameters && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">执行参数</h3>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {JSON.stringify(detail.parameters, null, 2)}
                </pre>
              </Card>
            )}

            {/* 执行结果 */}
            {detail.result && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">执行结果</h3>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto max-h-60">
                  {typeof detail.result === 'string'
                    ? detail.result
                    : JSON.stringify(detail.result, null, 2)}
                </pre>
              </Card>
            )}

            {/* 错误信息 */}
            {detail.error && (
              <Card className="p-4 border-red-200">
                <h3 className="text-lg font-semibold mb-4 text-red-600">
                  错误信息
                </h3>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-red-800">{detail.error}</p>
                </div>
              </Card>
            )}

            {/* 执行日志 */}
            {detail.logs && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">执行日志</h3>
                <div className="bg-black text-green-400 p-3 rounded font-mono text-xs max-h-60 overflow-y-auto">
                  {detail.logs
                    .split('\n')
                    .map((line: string, index: number) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {/* 性能指标 */}
            {detail.metrics && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">性能指标</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(detail.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-muted rounded">
                      <div className="text-2xl font-bold">{String(value)}</div>
                      <div className="text-sm text-muted-foreground">{key}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
