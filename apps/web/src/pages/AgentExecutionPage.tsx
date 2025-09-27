import { useState } from 'react';
import { Activity, Search, RefreshCw } from 'lucide-react';
import { Button, Card, Input } from '@sker/ui';
import { cn } from '@sker/ui';
import { AgentExecutionStats } from '../components/agentExecution/AgentExecutionStats';
import { AgentExecutionTable } from '../components/agentExecution/AgentExecutionTable';
import { AgentExecutionFilter } from '../components/agentExecution/AgentExecutionFilter';

export function AgentExecutionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date?, Date?]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // 刷新数据的逻辑会在后续的hooks中实现
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">执行管理</h1>
            <p className="text-muted-foreground">监控和管理Agent执行状态</p>
          </div>
        </div>
      </div>

      <AgentExecutionStats />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索执行记录..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <AgentExecutionFilter
              selectedAgent={selectedAgent}
              selectedStatus={selectedStatus}
              dateRange={dateRange}
              onAgentChange={setSelectedAgent}
              onStatusChange={setSelectedStatus}
              onDateRangeChange={setDateRange}
            />
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
            />
            刷新
          </Button>
        </div>

        <AgentExecutionTable
          searchQuery={searchQuery}
          selectedAgent={selectedAgent}
          selectedStatus={selectedStatus}
          dateRange={dateRange}
        />
      </Card>
    </div>
  );
}
