import {
  DashboardCard,
  MetricValue,
  TrendIndicator,
} from '../dashboard/DashboardComponents';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  metrics?: {
    value: string;
    label: string;
  };
}

/**
 * 舆情监控功能特性卡片组件
 * 职责：展示单个业务功能特性，集成数据展示
 */
export function FeatureCard({
  title,
  description,
  icon,
  color = 'primary',
  metrics,
}: FeatureCardProps) {
  return (
    <DashboardCard
      variant={color}
      className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="space-y-3 md:space-y-4">
        {/* 图标和标题 */}
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* 描述 */}
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>

        {/* 指标数据 */}
        {metrics && (
          <div className="pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <MetricValue
                  variant={color === 'default' ? 'primary' : color}
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
        )}

        {/* 悬停效果装饰 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
        </div>
      </div>
    </DashboardCard>
  );
}
