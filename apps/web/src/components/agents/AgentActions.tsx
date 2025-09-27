import { useState } from 'react';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Settings,
} from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@sker/ui';
import {
  useMutationAgentRemove,
  useMutationAgentToggleStatus,
} from '../../hooks/agent';

interface AgentActionsProps {
  agent: any;
  onEdit: (agent: any) => void;
  onView: (agent: any) => void;
}

export function AgentActions({ agent, onEdit, onView }: AgentActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteAgent = useMutationAgentRemove();
  const toggleStatus = useMutationAgentToggleStatus();

  const handleDelete = async () => {
    try {
      await deleteAgent.mutateAsync({
        url: '/api/agents/{id}',
        path: { id: agent.id },
      });
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await toggleStatus.mutateAsync({
        url: '/api/agents/{id}/toggle-status',
        path: { id: agent.id },
      });
    } catch (error) {
      console.error('Error toggling agent status:', error);
    }
  };

  const isActive = agent.status === 'active';
  const isLoading = deleteAgent.isPending || toggleStatus.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={isLoading}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onView(agent)}>
            <Eye className="h-4 w-4 mr-2" />
            查看详情
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onEdit(agent)}>
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleToggleStatus} disabled={isLoading}>
            {isActive ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                停用
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                启用
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" />
            配置
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>删除智能体</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除智能体 "{agent.name}"
              吗？此操作无法撤销，所有相关的配置和历史记录都将被永久删除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  删除中...
                </>
              ) : (
                '确认删除'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
