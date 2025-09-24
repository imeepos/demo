import { Link } from '@tanstack/react-router';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { FeaturesGrid } from '../components/home/FeaturesGrid';

/**
 * 首页组件
 * 职责：组合首页各个区块
 */
export function HomePage() {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <FeaturesGrid />

      {/* 导航到大屏 */}
      <div className="text-center pt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          进入舆情分析大屏 →
        </Link>
      </div>
    </div>
  );
}
