import { Card } from '@sker/ui';
import { Activity, Globe, Zap, Target, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@sker/ui';

/**
 * 现代化舆情监控系统欢迎区域组件
 * 职责：展示系统主题信息和运行状态，采用现代化设计语言
 */
export function WelcomeSection() {
  return (
    <div className="relative">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_50%)] opacity-10" />

      <Card
        variant="glass"
        className="relative overflow-hidden border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
      >
        <div className="relative text-center py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-12">
          {/* 主标题区域 */}
          <div className="mb-8 md:mb-12 animate-scale-in">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary">
                系统运行正常
              </span>
            </div>

            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-7xl font-black mb-6',
                'bg-gradient-to-r from-primary via-accent to-primary-600 bg-clip-text text-transparent',
                'animate-slide-up leading-tight'
              )}
            >
              舆情分析监控系统
            </h1>

            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30 backdrop-blur-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">
                专业版 v2.0 · AI驱动
              </span>
            </div>
          </div>

          {/* 核心功能标签 */}
          <div className="mb-8 md:mb-12 animate-fade-in-delayed">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
              {[
                { icon: TrendingUp, label: '实时监控', color: 'text-blue-600' },
                { icon: Activity, label: '智能分析', color: 'text-purple-600' },
                { icon: Zap, label: '预警响应', color: 'text-orange-600' },
                { icon: Globe, label: '全网覆盖', color: 'text-green-600' },
                { icon: Target, label: '精准定位', color: 'text-red-600' },
              ].map(({ icon: Icon, label, color }, index) => (
                <div
                  key={label}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl',
                    'bg-white/10 backdrop-blur-sm border border-white/20',
                    'hover:bg-white/20 hover:scale-105 transition-all duration-300',
                    'animate-bounce-gentle'
                  )}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Icon className={cn('h-5 w-5', color)} />
                  <span className="font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 系统描述 */}
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 animate-slide-up">
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-medium leading-relaxed">
              基于人工智能的下一代舆情监控平台
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              集成全网数据采集、实时情感分析、智能热点追踪、地理位置分析等核心功能，
              为企业和机构提供全方位的舆论监控解决方案。
            </p>
          </div>

          {/* 实时数据概览 */}
          <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in-delayed">
            {[
              { label: '今日监控', value: '2,847', trend: '+12.5%' },
              { label: '活跃源', value: '1,234', trend: '+8.3%' },
              { label: '预警事件', value: '23', trend: '-15.2%' },
              { label: '响应速度', value: '<1s', trend: 'Real-time' },
            ].map(({ label, value, trend }, index) => (
              <div
                key={label}
                className={cn(
                  'p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20',
                  'hover:bg-white/20 hover:scale-105 transition-all duration-300'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl font-bold text-foreground">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="text-xs text-primary font-medium mt-1">
                  {trend}
                </div>
              </div>
            ))}
          </div>

          {/* 装饰性粒子效果 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* 底部装饰渐变条 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
      </Card>
    </div>
  );
}
