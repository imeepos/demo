import {
  MoreHorizontal,
  Eye,
  RotateCcw,
  Copy,
  Play,
  Pause,
  X,
} from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@sker/ui';
import { toast } from 'react-hot-toast';
import { useMutationAgentExecutionRetryExecution } from '../../hooks/agentExecution';

interface AgentExecutionActionsProps {
  execution: any;
  onView: (execution: any) => void;
}

export function AgentExecutionActions({
  execution,
  onView,
}: AgentExecutionActionsProps) {
  const retryMutation = useMutationAgentExecutionRetryExecution();

  const handleRetry = async () => {
    try {
      await retryMutation.mutateAsync({
        url: '/api/executions/retry/{id}',
        path: { id: execution.id },
      });
      toast.success('执行已重新启动');
    } catch (error) {
      toast.error('重试执行时发生错误');
    }
  };

  const handleCopyConfig = () => {
    const config = {
      agentId: execution.agentId,
      parameters: execution.parameters,
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    toast.success('执行配置已复制到剪贴板');
  };

  const handleStop = () => {
    // 停止执行的逻辑（如果API支持）
    toast('停止执行功能正在开发中');
  };

  const canRetry =
    execution.status === 'failed' || execution.status === 'cancelled';
  const canStop = execution.status === 'running';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onView(execution)}>
          <Eye className="mr-2 h-4 w-4" />
          查看详情
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {canRetry && (
          <DropdownMenuItem
            onClick={handleRetry}
            disabled={retryMutation.isPending}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            重试执行
          </DropdownMenuItem>
        )}

        {canStop && (
          <DropdownMenuItem onClick={handleStop}>
            <Pause className="mr-2 h-4 w-4" />
            停止执行
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleCopyConfig}>
          <Copy className="mr-2 h-4 w-4" />
          复制配置
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600">
          <X className="mr-2 h-4 w-4" />
          删除记录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
