import { Link } from '@tanstack/react-router';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { WelcomeSection } from '../components/home/WelcomeSection';

/**
 * 首页组件
 * 职责：组合首页各个区块
 */
export function HomePage() {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <FeaturesGrid />

      {/* 导航区域 */}
      <div className="text-center pt-8 space-y-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors mr-4"
        >
          进入舆情分析大屏 →
        </Link>
        <Link
          to="/sentiment-intensity"
          className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
        >
          情感强度管理 ⚙️
        </Link>
      </div>
    </div>
  );
}
