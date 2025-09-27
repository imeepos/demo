import { Card, Button } from '@sker/ui';
import { cn } from '@sker/ui';
import { RefreshCw, Plus, Database, Settings, BarChart3 } from 'lucide-react';

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
  status?: 'online' | 'offline' | 'warning';
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
  'bg-card border border-border/40',
  'rounded-xl shadow-sm',
  'transition-all duration-300'
);

const TITLE_STYLES = cn(
  'text-2xl font-semibold text-foreground',
  'mb-2 leading-tight'
);

const DESCRIPTION_STYLES = cn(
  'flex items-center gap-2',
  'text-muted-foreground',
  'text-sm'
);

const STATS_CARD_STYLES = cn(
  'bg-muted/30 border border-border',
  'rounded-lg p-4',
  'transition-all duration-200'
);

const ACTION_BUTTON_STYLES = cn(
  'bg-primary hover:bg-primary/90',
  'text-primary-foreground font-medium text-sm',
  'px-6 py-2 rounded-lg',
  'transition-all duration-200'
);

const REFRESH_BUTTON_STYLES = cn(
  'font-medium text-sm px-4 py-2 rounded-lg',
  'transition-all duration-200'
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
      <div className="p-6">
        {/* 主布局 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* 左侧：标题和描述区域 */}
          <div className="space-y-4">
            {/* 标题行：图标 + 标题 */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PageIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className={TITLE_STYLES}>{title}</h1>
                <div className={DESCRIPTION_STYLES}>
                  <span>{description}</span>
                </div>
              </div>
            </div>

            {/* 统计数据展示 */}
            {stats && (
              <div className="grid grid-cols-2 gap-4">
                <div className={STATS_CARD_STYLES}>
                  <div className="text-xl font-semibold text-foreground mb-1">
                    {stats.primary.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.primary.label}
                  </div>
                  {stats.primary.trend && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {stats.primary.trend}
                    </div>
                  )}
                </div>
                <div className={STATS_CARD_STYLES}>
                  <div className="text-xl font-semibold text-foreground mb-1">
                    {stats.secondary.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.secondary.label}
                  </div>
                  {stats.secondary.trend && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {stats.secondary.trend}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 右侧：操作按钮区域 */}
          <div className="flex items-center gap-3">
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
              {isLoading ? '刷新中...' : '刷新'}
            </Button>

            {/* 主要操作按钮 */}
            {primaryAction && onPrimaryAction && (
              <Button
                onClick={onPrimaryAction}
                className={ACTION_BUTTON_STYLES}
              >
                <Plus className="w-4 h-4 mr-2" />
                {primaryAction}
              </Button>
            )}
          </div>
        </div>
      </div>
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
