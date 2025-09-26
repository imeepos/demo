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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-accent-50/20">
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 space-y-6 md:space-y-8 lg:space-y-12">
        {/* 欢迎区域 */}
        <WelcomeSection />

        {/* 实时数据预览 */}
        <DataPreviewSection />

        {/* 核心功能特性 */}
        <FeaturesGrid />

        {/* 系统状态监控 */}
        <SystemStatusSection />

        {/* 主要功能入口 */}
        <div className="text-center space-y-8 md:space-y-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px top-1/2"></div>
            <div className="relative bg-background px-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                功能模块
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                选择专业的监控视图，开启您的智能舆情分析之旅
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                to: '/dashboard-view',
                title: '舆情分析大屏',
                description: '完整的数据可视化界面，实时监控和分析',
                icon: '📊',
                gradient: 'from-blue-600 to-blue-700',
                shadowColor: 'blue-400',
              },
              {
                to: '/dashboard',
                title: '地图监控视图',
                description: '地理位置结合数据分析，区域舆情监控',
                icon: '🗺️',
                gradient: 'from-emerald-600 to-emerald-700',
                shadowColor: 'emerald-400',
              },
              {
                to: '/sentiment-intensity',
                title: '情感强度管理',
                description: '配置和管理情感分析参数设置',
                icon: '⚙️',
                gradient: 'from-purple-600 to-purple-700',
                shadowColor: 'purple-400',
              },
              {
                to: '/sentiment-event',
                title: '舆情事件管理',
                description: '管理舆情事件数据，创建、编辑和分析',
                icon: '📝',
                gradient: 'from-orange-600 to-orange-700',
                shadowColor: 'orange-400',
              },
              {
                to: '/enhanced-dashboard',
                title: '增强仪表板',
                description: '更丰富的交互式数据分析和可视化面板',
                icon: '📈',
                gradient: 'from-rose-600 to-rose-700',
                shadowColor: 'rose-400',
              },
              {
                to: '/data-visualization',
                title: '数据可视化',
                description: '专业的数据图表展示和深度分析工具',
                icon: '📊',
                gradient: 'from-cyan-600 to-cyan-700',
                shadowColor: 'cyan-400',
              },
              {
                to: '/admin-dashboard',
                title: '管理员仪表板',
                description: '系统管理和配置中心，监控系统运行状态',
                icon: '⚡',
                gradient: 'from-indigo-600 to-indigo-700',
                shadowColor: 'indigo-400',
              },
              {
                to: '/color-test',
                title: '配色系统测试',
                description: '查看亮色科技蓝配色方案的完整展示',
                icon: '🎨',
                gradient: 'from-pink-600 to-pink-700',
                shadowColor: 'pink-400',
              },
            ].map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative overflow-hidden bg-gradient-to-br ${item.gradient} text-white rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:shadow-${item.shadowColor}/40 hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-delayed`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 背景光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* 内容区域 */}
                <div className="relative space-y-4 z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 backdrop-blur-sm border border-white/30">
                    {item.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-center text-sm font-semibold bg-white/20 rounded-xl py-3 px-6 group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/30">
                    <span className="mr-2">立即使用</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>

                {/* 装饰性元素 */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full opacity-60 group-hover:scale-150 group-hover:opacity-20 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-40 group-hover:scale-125 group-hover:opacity-10 transition-all duration-700" />

                {/* 边框光效 */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
