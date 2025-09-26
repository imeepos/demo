import { Link, useLocation } from '@tanstack/react-router';
import { ChevronRight, Home } from 'lucide-react';
import { getRouteConfig, ROUTE_GROUPS } from '../../lib/routes-config';
import { cn } from '@sker/ui';

/**
 * 现代化面包屑导航组件
 *
 * 设计理念：
 * - 优雅的层次结构展示
 * - 流畅的悬停动画效果
 * - 多种美观的视觉变体
 * - 响应式设计支持
 *
 * @author SKER Team
 * @version 2.0.0
 */

// ==================== 类型定义 ====================

interface BreadcrumbProps {
  /** 视觉变体 */
  variant?: 'default' | 'glass' | 'minimal' | 'floating';
  /** 额外样式 */
  className?: string;
}

// ==================== 样式配置 ====================

const VARIANT_STYLES = {
  default: cn(
    'bg-gradient-to-r from-muted/40 to-muted/20',
    'rounded-xl px-4 py-3 shadow-sm',
    'border border-border/50',
    'backdrop-blur-sm'
  ),
  glass: cn(
    'bg-white/10 backdrop-blur-md',
    'rounded-xl px-4 py-3',
    'border border-white/20 shadow-lg',
    'hover:bg-white/15 transition-colors duration-300'
  ),
  floating: cn(
    'bg-card rounded-xl px-4 py-3',
    'shadow-lg hover:shadow-xl',
    'transition-all duration-300 hover:-translate-y-0.5',
    'border border-border/50'
  ),
  minimal: cn('px-2 py-1 rounded-lg', 'bg-transparent'),
} as const;

const SEPARATOR_STYLES = cn(
  'mx-2 text-muted-foreground/50',
  'transition-colors duration-200',
  'group-hover:text-muted-foreground/70'
);

// ==================== 组件实现 ====================

export function Breadcrumb({
  variant = 'default',
  className,
}: BreadcrumbProps) {
  const location = useLocation();
  const currentRoute = getRouteConfig(location.pathname);

  // 首页不显示面包屑
  if (location.pathname === '/') {
    return null;
  }

  // 路由配置不存在时不显示
  if (!currentRoute) {
    return null;
  }

  const groupInfo = ROUTE_GROUPS[currentRoute.group];
  const GroupIcon = groupInfo.icon;
  const RouteIcon = currentRoute.icon;

  return (
    <nav
      className={cn(
        'group flex items-center text-sm mb-6',
        'animate-in fade-in-0 slide-in-from-top-2 duration-500',
        VARIANT_STYLES[variant],
        className
      )}
      aria-label="面包屑导航"
    >
      {/* 首页链接 */}
      <Link
        to="/"
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-muted-foreground hover:text-foreground',
          'transition-all duration-200 group/home',
          'hover:bg-primary/10 hover:scale-105',
          'active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50'
        )}
        aria-label="返回首页"
      >
        <Home className="h-4 w-4 transition-transform group-hover/home:scale-110" />
        <span className="font-medium">首页</span>
      </Link>

      {/* 分隔符 */}
      <div className={SEPARATOR_STYLES} aria-hidden="true">
        <ChevronRight className="h-4 w-4" />
      </div>

      {/* 分组导航 */}
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-muted-foreground hover:text-foreground',
          'hover:bg-secondary/50 transition-all duration-200',
          'hover:scale-105 group/group'
        )}
      >
        <GroupIcon className="h-4 w-4 transition-transform group-hover/group:scale-110" />
        <span className="font-medium">{groupInfo.title}</span>
      </div>

      {/* 分隔符 */}
      <div className={SEPARATOR_STYLES} aria-hidden="true">
        <ChevronRight className="h-4 w-4" />
      </div>

      {/* 当前页面 */}
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-foreground font-semibold',
          'bg-primary/15 text-primary-700',
          'shadow-sm border border-primary/20',
          'relative overflow-hidden group/current'
        )}
        aria-current="page"
      >
        <RouteIcon className="h-4 w-4 opacity-90 relative z-10" />
        <span className="relative z-10">{currentRoute.title}</span>

        {/* 当前页面背景装饰 */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r',
            'from-primary/5 via-primary/10 to-primary/5',
            'opacity-0 group-hover/current:opacity-100',
            'transition-opacity duration-300'
          )}
        />
      </div>

      {/* 装饰性光效 */}
      {variant !== 'minimal' && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r',
            'from-transparent via-primary/3 to-transparent',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-500 rounded-xl',
            'pointer-events-none'
          )}
        />
      )}
    </nav>
  );
}
