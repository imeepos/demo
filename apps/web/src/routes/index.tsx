import { createFileRoute, Link } from '@tanstack/react-router';
import { DataPreviewSection } from '../components/home/DataPreviewSection';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { SystemStatusSection } from '../components/home/SystemStatusSection';
import { WelcomeSection } from '../components/home/WelcomeSection';

export const Route = createFileRoute('/')({
  component: HomePage,
});

/**
 * 舆情监控系统首页
 * 职责：展示系统概览、核心功能、实时数据和系统状态
 */
function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6 space-y-4 md:space-y-6 lg:space-y-8">
        {/* 欢迎区域 */}
        <WelcomeSection />

        {/* 实时数据预览 */}
        <DataPreviewSection />

        {/* 核心功能特性 */}
        <FeaturesGrid />

        {/* 系统状态监控 */}
        <SystemStatusSection />

        {/* 主要功能入口 */}
        <div className="text-center space-y-4 md:space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-4">
              开始使用
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              选择合适的视图，开始您的舆情监控之旅
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
            <Link
              to="/dashboard-view"
              className="group relative overflow-hidden bg-primary text-primary-foreground rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="text-4xl">📊</div>
                <h3 className="text-xl font-bold">舆情分析大屏</h3>
                <p className="text-primary-foreground/80">
                  完整的数据可视化界面，实时监控和分析
                </p>
                <div className="flex items-center justify-center text-sm font-medium">
                  立即进入 →
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard"
              className="group relative overflow-hidden bg-secondary text-secondary-foreground rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="text-4xl">🗺️</div>
                <h3 className="text-xl font-bold">地图监控视图</h3>
                <p className="text-secondary-foreground/80">
                  地理位置结合数据分析，区域舆情监控
                </p>
                <div className="flex items-center justify-center text-sm font-medium">
                  查看地图 →
                </div>
              </div>
            </Link>

            <Link
              to="/sentiment-intensity"
              className="group relative overflow-hidden bg-warning text-warning-foreground rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="text-4xl">⚙️</div>
                <h3 className="text-xl font-bold">情感强度管理</h3>
                <p className="text-warning-foreground/80">
                  配置和管理情感分析参数设置
                </p>
                <div className="flex items-center justify-center text-sm font-medium">
                  进入设置 →
                </div>
              </div>
            </Link>

            <Link
              to="/sentiment-event"
              className="group relative overflow-hidden bg-success text-success-foreground rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="text-4xl">📝</div>
                <h3 className="text-xl font-bold">舆情事件管理</h3>
                <p className="text-success-foreground/80">
                  管理舆情事件数据，创建、编辑和分析
                </p>
                <div className="flex items-center justify-center text-sm font-medium">
                  事件管理 →
                </div>
              </div>
            </Link>

            <Link
              to="/color-test"
              className="group relative overflow-hidden bg-accent text-white rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="text-4xl">🎨</div>
                <h3 className="text-xl font-bold">配色系统测试</h3>
                <p className="text-white/80">
                  查看亮色科技蓝配色方案的完整展示
                </p>
                <div className="flex items-center justify-center text-sm font-medium">
                  配色预览 →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
