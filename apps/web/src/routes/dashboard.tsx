import { createFileRoute, Link } from '@tanstack/react-router';
import { L7EventMap } from '@sker/map';
import { Button } from '@sker/ui';
import { BarChart3, Home, Settings } from 'lucide-react';
import {
  MetricCard as BaseMetricCard,
  DashboardCard,
  LiveIndicator,
  MetricLabel,
  MetricValue,
  ProgressBar,
  StatusDot,
  TrendIndicator,
} from '../components/dashboard/DashboardComponents';
import { mockMapEvents } from '../data/mockMapData';

export const Route = createFileRoute('/dashboard')({
  component: SentimentDashboard,
});

/**
 * 舆情分析大屏主页面
 * 职责：整合所有舆情分析组件，展示完整的监控大屏
 */
function SentimentDashboard() {
  return (
    <div className="flex-1 h-full relative bg-background">
      <L7EventMap
        events={mockMapEvents}
        enableCluster={true}
        clusterRadius={80}
        minClusterSize={2}
      />
    </div>
  );
}
