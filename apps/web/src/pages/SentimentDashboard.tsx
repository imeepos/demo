import { L7EventMap } from '@sker/map';
import { mockMapEvents } from '../data/mockMapData';

/**
 * 舆情分析大屏主页面
 * 职责：整合所有舆情分析组件，展示完整的监控大屏
 */
export function SentimentDashboard() {
  return (
    <div className="dashboard-layout">
      <div className="h-[calc(100vh)] relative">
        <L7EventMap
          events={mockMapEvents}
          enableCluster={true}
          clusterRadius={80}
          minClusterSize={2}
        />
      </div>
    </div>
  );
}
