import { SimpleChart } from '../components/charts/SimpleChart';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { MetricCard } from '../components/dashboard/MetricCard';
import { L7EventMap } from '../components/map/L7EventMap';
import { HotWordsCloud } from '../components/sentiment/HotWordsCloud';
import { SentimentTable } from '../components/sentiment/SentimentTable';
import { mockMapEvents } from '../data/mockMapData';
import { SentimentEvent } from '../types/map';

// 模拟数据
const mockMetrics = {
  totalPosts: 15432,
  positiveRatio: 68.5,
  negativeRatio: 18.3,
  neutralRatio: 13.2,
};

const mockHotWords = [
  { word: '创新技术', count: 156, sentiment: 'positive' as const },
  { word: '用户体验', count: 134, sentiment: 'positive' as const },
  { word: '系统故障', count: 89, sentiment: 'negative' as const },
  { word: '服务优化', count: 78, sentiment: 'positive' as const },
  { word: '网络延迟', count: 67, sentiment: 'negative' as const },
  { word: '界面设计', count: 56, sentiment: 'neutral' as const },
  { word: '功能更新', count: 45, sentiment: 'positive' as const },
  { word: 'Bug修复', count: 34, sentiment: 'neutral' as const },
];

const mockSentimentData = [
  {
    id: '1',
    title: '新版本用户体验大幅提升，获得广泛好评',
    source: '微博',
    sentiment: 'positive' as const,
    score: 0.85,
    time: '2024-01-24 14:30',
  },
  {
    id: '2',
    title: '系统维护期间服务暂时中断，用户反馈较多',
    source: '知乎',
    sentiment: 'negative' as const,
    score: -0.62,
    time: '2024-01-24 13:45',
  },
  {
    id: '3',
    title: '产品功能介绍引发用户讨论',
    source: '微信',
    sentiment: 'neutral' as const,
    score: 0.12,
    time: '2024-01-24 12:20',
  },
];

const mockTrendData = [
  { label: '正面', value: 68, color: 'var(--success)' },
  { label: '负面', value: 18, color: 'var(--destructive)' },
  { label: '中性', value: 14, color: 'var(--warning)' },
];

/**
 * 舆情分析大屏主页面
 * 职责：整合所有舆情分析组件，展示完整的监控大屏
 */
export function SentimentDashboard() {
  // 处理地图事件点击
  const handleMapEventClick = (event: SentimentEvent) => {
    console.log('点击事件:', event);
    // 这里可以添加事件详情弹窗或其他交互
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1 className="dashboard-title">舆情分析监控大屏</h1>
        <p className="dashboard-subtitle">
          实时监控网络舆论动态，智能分析情感趋势
        </p>
      </header>

      {/* 自定义网格布局 */}
      <div className="grid grid-cols-6 grid-rows-3 gap-4 p-4 h-[calc(100vh-120px)]">
        {/* 第一行：核心指标 */}
        <DashboardCard title="总讨论量" className="col-span-1">
          <MetricCard
            title="今日总量"
            value={mockMetrics.totalPosts.toLocaleString()}
            trend="up"
            trendValue="+12.5%"
          />
        </DashboardCard>

        <DashboardCard title="正面占比" className="col-span-1">
          <MetricCard
            title="正面占比"
            value={`${mockMetrics.positiveRatio}%`}
            trend="up"
            trendValue="+3.2%"
          />
        </DashboardCard>

        <DashboardCard title="负面占比" className="col-span-1">
          <MetricCard
            title="负面占比"
            value={`${mockMetrics.negativeRatio}%`}
            trend="down"
            trendValue="-1.8%"
          />
        </DashboardCard>

        <DashboardCard title="中性占比" className="col-span-1">
          <MetricCard
            title="中性占比"
            value={`${mockMetrics.neutralRatio}%`}
            trend="neutral"
            trendValue="+0.3%"
          />
        </DashboardCard>

        <DashboardCard title="情感分布" className="col-span-2">
          <SimpleChart data={mockTrendData} type="pie" height={180} />
        </DashboardCard>

        {/* 第二行：地图区域 */}
        <DashboardCard
          title="事件地理分布 (L7引擎)"
          className="col-span-4 row-span-2"
        >
          <L7EventMap
            events={mockMapEvents}
            onEventClick={handleMapEventClick}
            height={350}
            enableCluster={true}
            clusterRadius={80}
            minClusterSize={2}
          />
        </DashboardCard>

        <DashboardCard title="热点词汇" className="col-span-2">
          <HotWordsCloud words={mockHotWords} />
        </DashboardCard>

        {/* 第三行：数据列表 */}
        <DashboardCard title="实时舆情动态" className="col-span-2">
          <SentimentTable data={mockSentimentData} maxRows={6} />
        </DashboardCard>
      </div>
    </div>
  );
}
