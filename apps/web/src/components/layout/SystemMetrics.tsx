import { DashboardCard } from '../dashboard/DashboardComponents';
import { cn } from '@sker/ui';

/**
 * 系统性能指标组件
 *
 * 设计理念：
 * - 分离关注点，专注性能监控
 * - 优雅的视觉层次
 * - 实时状态指示
 *
 * @author SKER Team
 * @version 2.0.0
 */

interface SystemMetricsProps {
  className?: string;
}

export function SystemMetrics({ className }: SystemMetricsProps) {
  return (
    <DashboardCard
      size="sm"
      className={cn(
        'bg-gradient-to-br from-primary-50/50 to-accent-50/30 border-primary-100',
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary-700">
            系统状态
          </span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-secondary-600">CPU使用率</span>
            <div className="flex items-center gap-1">
              <div className="w-8 h-1.5 bg-primary-100 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-primary-500 rounded-full"></div>
              </div>
              <span className="font-mono text-primary-600 font-medium">
                23%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary-600">内存使用</span>
            <div className="flex items-center gap-1">
              <div className="w-8 h-1.5 bg-accent-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-accent-500 rounded-full"></div>
              </div>
              <span className="font-mono text-accent-600 font-medium">67%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary-600">数据源</span>
            <span className="font-mono text-primary-700 font-semibold">
              8/8
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
