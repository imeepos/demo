import { LiveIndicator, StatusDot } from '../dashboard/DashboardComponents';

/**
 * 舆情监控系统欢迎区域组件
 * 职责：展示系统主题信息和运行状态
 */
export function WelcomeSection() {
  return (
    <div className="relative">
      {/* 背景渐变效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl" />

      <div className="relative text-center py-16 px-8">
        {/* 主标题 */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-4">
            舆情分析监控系统
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <StatusDot status="online" pulse />
            <span className="text-sm font-medium text-muted-foreground">
              系统运行正常
            </span>
          </div>
        </div>

        {/* 系统描述 */}
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-xl md:text-2xl text-foreground/90 font-medium">
            🔍 实时监控 · 📊 智能分析 · 🚨 预警响应
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            基于人工智能的舆情监控平台，提供全网数据采集、情感分析、热点追踪、
            地理分析等核心功能，助力企业和机构掌握舆论动态。
          </p>
        </div>

        {/* 系统状态指示器 */}
        <div className="mt-8 flex justify-center">
          <LiveIndicator status="online" className="text-base">
            实时监控中 · 数据同步正常
          </LiveIndicator>
        </div>

        {/* 装饰性元素 */}
        <div className="mt-8 flex justify-center space-x-8 text-4xl opacity-20">
          <span>📈</span>
          <span>🌐</span>
          <span>⚡</span>
          <span>🎯</span>
        </div>
      </div>
    </div>
  );
}
