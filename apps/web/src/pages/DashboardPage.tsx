import { Link } from '@tanstack/react-router';
import { Settings, Home } from 'lucide-react';
import { DashboardExample } from '../components/dashboard';
import { Button } from '@sker/ui';

/**
 * 舆情监控大屏页面
 * 职责：展示完整的舆情分析监控大屏界面
 */
export function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Link to="/">
          <Button
            variant="outline"
            className="bg-card/90 backdrop-blur-sm border-border"
          >
            <Home className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        <div className="flex gap-2">
          <Link to="/sentiment-intensity">
            <Button
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
            >
              <Settings className="w-4 h-4 mr-2" />
              情感强度管理
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
            >
              🗺️ 地图视图
            </Button>
          </Link>
        </div>
      </div>

      {/* Dashboard 内容 */}
      <div className="pt-16">
        <DashboardExample />
      </div>
    </div>
  );
}
