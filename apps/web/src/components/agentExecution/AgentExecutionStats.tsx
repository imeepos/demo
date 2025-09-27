import { Card } from '@sker/ui';
import {
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
} from 'lucide-react';
import { useQueryAgentExecutionGetAnalyticsOverview } from '../../hooks/agentExecution';

export function AgentExecutionStats() {
  const { data: analytics, isLoading } =
    useQueryAgentExecutionGetAnalyticsOverview({
      url: '/api/executions/analytics/overview',
    });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-muted rounded-xl mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: '总执行次数',
      value: analytics?.totalExecutions || 0,
      icon: Activity,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: '成功执行',
      value: analytics?.successfulExecutions || 0,
      icon: CheckCircle,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: '失败执行',
      value: analytics?.failedExecutions || 0,
      icon: XCircle,
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: '平均执行时长',
      value: `${analytics?.averageExecutionTime || 0}s`,
      icon: Clock,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: '成功率',
      value: `${((analytics?.successRate || 0) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
            >
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
