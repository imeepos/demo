import { Card, Button } from '@sker/ui';
import { cn } from '@sker/ui';
import { LiveIndicator } from '../dashboard/DashboardComponents';
import {
  RefreshCw,
  Plus,
  Activity,
  Database,
  TrendingUp,
  Users,
  Settings,
  BarChart3,
} from 'lucide-react';

/**
 * 专业页面头部组件
 *
 * 设计理念：
 * - 完美对称的24列栅格布局
 * - 层次清晰的信息架构
 * - 一致的视觉间距规范
 * - 精致的微交互反馈
 *
 * @author 专业表单布局艺术家
 * @version 1.0.0
 */

// ==================== 类型定义 ====================

interface PageStats {
  /** 主要数据统计 */
  primary: {
    label: string;
    value: string | number;
    trend?: string;
  };
  /** 次要数据统计 */
  secondary: {
    label: string;
    value: string | number;
    trend?: string;
  };
}

interface PageHeaderProps {
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  description: string;
  /** 系统状态 */
  status?: 'online' | 'offline' | 'loading';
  /** 统计数据 */
  stats?: PageStats;
  /** 主要操作按钮文本 */
  primaryAction?: string;
  /** 主要操作按钮点击事件 */
  onPrimaryAction?: () => void;
  /** 刷新按钮点击事件 */
  onRefresh?: () => void;
  /** 是否处于加载状态 */
  isLoading?: boolean;
  /** 页面类型图标 */
  pageIcon?: React.ComponentType<{ className?: string }>;
  /** 额外样式 */
  className?: string;
}

// ==================== 样式配置 ====================

const HEADER_STYLES = cn(
  'relative overflow-hidden',
  'bg-gradient-to-br from-white via-white/98 to-white/95',
  'border border-slate-200/60 backdrop-blur-lg',
  'rounded-3xl shadow-sm hover:shadow-lg',
  'transition-all duration-700 ease-out',
  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
  'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000',
  'group'
);

const TITLE_STYLES = cn(
  'text-3xl font-black',
  'bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900',
  'bg-clip-text text-transparent',
  'mb-2 tracking-tight leading-tight',
  'drop-shadow-sm'
);

const DESCRIPTION_STYLES = cn(
  'flex items-center gap-3',
  'text-muted-foreground',
  'text-base font-medium'
);

const STATS_CARD_STYLES = cn(
  'bg-gradient-to-br from-slate-50/80 to-white/40',
  'border border-slate-200/50 rounded-2xl',
  'p-5 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-50/60 hover:to-indigo-50/40',
  'transition-all duration-500 ease-out',
  'shadow-sm hover:shadow-md',
  'backdrop-blur-sm',
  'group/stat'
);

const ACTION_BUTTON_STYLES = cn(
  'relative overflow-hidden',
  'bg-gradient-to-r from-slate-900 to-slate-800',
  'hover:from-slate-800 hover:to-slate-700',
  'text-white font-semibold text-sm',
  'px-8 py-3.5 rounded-2xl',
  'shadow-lg hover:shadow-xl hover:shadow-slate-900/30',
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-98',
  'transition-all duration-400 ease-out',
  'border border-slate-700/30',
  'backdrop-blur-sm'
);

const REFRESH_BUTTON_STYLES = cn(
  'border-slate-300/60 text-slate-600',
  'hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400/60',
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
  'transition-all duration-400 ease-out',
  'backdrop-blur-sm rounded-2xl',
  'shadow-sm hover:shadow-md font-medium text-sm px-6 py-3'
);

// ==================== 组件实现 ====================

export function PageHeader({
  title,
  description,
  status = 'online',
  stats,
  primaryAction,
  onPrimaryAction,
  onRefresh,
  isLoading = false,
  pageIcon: PageIcon = Database,
  className,
}: PageHeaderProps) {
  return (
    <Card className={cn(HEADER_STYLES, className)}>
      <div className="relative z-10 p-10">
        {/* 24列栅格主布局 */}
        <div className="grid grid-cols-24 gap-8 items-center">
          {/* 左侧：标题和描述区域 (占16列) */}
          <div className="col-span-24 lg:col-span-16 space-y-6">
            {/* 标题行：图标 + 标题 */}
            <div className="flex items-center gap-5">
              <div
                className={cn(
                  'p-4 rounded-2xl',
                  'bg-gradient-to-br from-slate-100/80 to-white/60',
                  'border border-slate-200/60 backdrop-blur-sm',
                  'group-hover:scale-110 group-hover:rotate-3',
                  'transition-all duration-700 ease-out',
                  'shadow-sm hover:shadow-md'
                )}
              >
                <PageIcon className="h-9 w-9 text-slate-700" />
              </div>

              <div className="flex-1">
                <h1 className={TITLE_STYLES}>{title}</h1>
                <div className={DESCRIPTION_STYLES}>
                  <LiveIndicator status={status} />
                  <span>{description}</span>
                </div>
              </div>
            </div>

            {/* 统计数据展示 */}
            {stats && (
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className={STATS_CARD_STYLES}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">
                        {stats.primary.value}
                      </div>
                      <div className="text-sm font-medium text-slate-600">
                        {stats.primary.label}
                      </div>
                    </div>
                    {stats.primary.trend && (
                      <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60">
                        {stats.primary.trend}
                      </div>
                    )}
                  </div>
                </div>

                <div className={STATS_CARD_STYLES}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">
                        {stats.secondary.value}
                      </div>
                      <div className="text-sm font-medium text-slate-600">
                        {stats.secondary.label}
                      </div>
                    </div>
                    {stats.secondary.trend && (
                      <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200/60">
                        {stats.secondary.trend}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：操作按钮区域 (占8列) */}
          <div className="col-span-24 lg:col-span-8 flex flex-col gap-4 lg:items-end">
            {/* 系统状态指示器 */}
            <div
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2',
                'bg-green-50 text-green-700 rounded-full',
                'border border-green-200',
                'text-sm font-medium'
              )}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>系统运行正常</span>
            </div>

            {/* 操作按钮组 */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* 刷新按钮 */}
              <Button
                variant="outline"
                onClick={onRefresh}
                disabled={isLoading}
                className={REFRESH_BUTTON_STYLES}
              >
                <RefreshCw
                  className={cn('w-4 h-4 mr-2', isLoading && 'animate-spin')}
                />
                {isLoading ? '刷新中...' : '刷新数据'}
              </Button>

              {/* 主要操作按钮 */}
              {primaryAction && onPrimaryAction && (
                <Button
                  onClick={onPrimaryAction}
                  className={ACTION_BUTTON_STYLES}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {primaryAction}

                  {/* 按钮光效 */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-r',
                      'from-transparent via-white/20 to-transparent',
                      'translate-x-[-100%] hover:translate-x-[100%]',
                      'transition-transform duration-700'
                    )}
                  />
                </Button>
              )}
            </div>

            {/* 实时数据概览 */}
            <div className="text-right text-sm text-muted-foreground space-y-1">
              <div>最后更新: {new Date().toLocaleTimeString()}</div>
              <div className="flex items-center gap-2 justify-end">
                <Activity className="h-3 w-3 text-green-500" />
                <span>数据实时同步</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 装饰性背景渐变 */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-r',
          'from-primary/3 via-transparent to-accent/3',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-500',
          'pointer-events-none'
        )}
      />

      {/* 底部装饰条 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
    </Card>
  );
}

// ==================== 预设配置 ====================

/** 舆情事件页面头部配置 */
export const SentimentEventPageHeader = {
  title: '舆情事件管理系统',
  description: '事件数据管理 · 实时监控',
  pageIcon: BarChart3,
  primaryAction: '新建舆情事件',
};

/** 情感强度页面头部配置 */
export const SentimentIntensityPageHeader = {
  title: '情感强度管理系统',
  description: '配置参数管理 · 实时监控',
  pageIcon: Settings,
  primaryAction: '新建情感强度配置',
};
