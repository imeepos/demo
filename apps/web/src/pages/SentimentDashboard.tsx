import { Link } from '@tanstack/react-router';
import { Button } from '@sker/ui';
import { L7EventMap } from '@sker/map';
import { mockMapEvents } from '../data/mockMapData';
import { Settings } from 'lucide-react';

/**
 * 舆情分析大屏主页面
 * 职责：整合所有舆情分析组件，展示完整的监控大屏
 */
export function SentimentDashboard() {
  return (
    <div className="dashboard-layout">
      {/* 顶部导航栏 */}
      <div className="absolute top-4 right-4 z-10">
        <Link to="/sentiment-intensity">
          <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
            <Settings className="w-4 h-4 mr-2" />
            情感强度管理
          </Button>
        </Link>
      </div>

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
