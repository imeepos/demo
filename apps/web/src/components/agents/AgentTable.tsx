import { useState } from 'react';
import { Bot } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from '@sker/ui';
import { cn } from '@sker/ui';
import { useQueryAgentFindAll } from '../../hooks/agent';
import { AgentForm } from './AgentForm';
import { AgentActions } from './AgentActions';

interface AgentTableProps {
  searchQuery: string;
}

export function AgentTable({ searchQuery }: AgentTableProps) {
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [viewingAgent, setViewingAgent] = useState<any>(null);

  const { data: agents, isLoading } = useQueryAgentFindAll();

  const filteredAgents =
    agents?.filter(
      (agent: any) =>
        agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            活跃
          </Badge>
        );
      case 'inactive':
        return <Badge variant="secondary">未激活</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              <TableHead>名称</TableHead>
              <TableHead>代码</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>温度值</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Bot className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">暂无智能体</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent: any) => (
                <TableRow key={agent.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      {agent.code}
                    </code>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {agent.description || '暂无描述'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.temperature || 0.7}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(agent.status || 'active')}
                  </TableCell>
                  <TableCell>
                    <AgentActions
                      agent={agent}
                      onEdit={setEditingAgent}
                      onView={setViewingAgent}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AgentForm
        mode="edit"
        agent={editingAgent}
        open={!!editingAgent}
        onOpenChange={open => !open && setEditingAgent(null)}
      />
    </>
  );
}
