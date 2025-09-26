import {
  DashboardCard,
  MetricValue,
  TrendIndicator,
} from '../dashboard/DashboardComponents';

// ==================== 类型定义 ====================

type FeatureVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

interface FeatureMetrics {
  readonly value: string;
  readonly label: string;
}

interface FeatureCardProps {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactNode;
  readonly color: FeatureVariant;
  readonly metrics: FeatureMetrics;
}

/**
 * 现代化功能特性卡片组件
 *
 * 设计理念：
 * - 类型安全的组件接口
 * - 统一的视觉设计语言
 * - 优雅的交互效果
 * - 模块化的组件结构
 *
 * @author SKER Team
 * @version 2.0.0
 */
export function FeatureCard({
  title,
  description,
  icon,
  color,
  metrics,
}: FeatureCardProps) {
  const metricVariant = color === 'default' ? 'primary' : color;

  return (
    <DashboardCard
      variant={color}
      className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 px-4 py-4 relative overflow-hidden"
    >
      <div className="space-y-3 md:space-y-4">
        {/* 图标和标题 */}
        <div className="flex items-center gap-3">
          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* 描述 */}
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>

        {/* 指标数据 */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <MetricValue
                variant={metricVariant}
                size="sm"
                className="text-2xl"
              >
                {metrics.value}
              </MetricValue>
              <p className="text-xs text-muted-foreground">{metrics.label}</p>
            </div>
            <div className="text-right">
              <TrendIndicator
                trend="up"
                value="实时"
                icon={<span className="animate-pulse">●</span>}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        {/* 悬停效果装饰 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
        </div>
      </div>
    </DashboardCard>
  );
}
