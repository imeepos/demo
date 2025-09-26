import { cn } from '@sker/ui';
import { type RouteConfig } from '../../lib/routes-config';

interface NavigationItemProps {
  readonly route: RouteConfig;
  readonly active?: boolean;
  readonly onClick?: () => void;
  readonly collapsed?: boolean;
}

export function NavigationItem({
  route,
  active = false,
  collapsed = false,
  onClick,
}: NavigationItemProps) {
  const IconComponent = route.icon;

  return (
    <button
      onClick={onClick}
      title={collapsed ? route.title : undefined}
      className={cn(
        'w-full flex items-center relative group rounded-md transition-colors duration-150',
        collapsed ? 'p-3' : 'px-3 py-2.5 gap-3',
        active
          ? collapsed
            ? 'bg-primary text-primary-foreground'
            : 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/60',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        // 在展开状态下，菜单项有轻微的左边框来强化层次
        !collapsed && 'border-l-2 border-transparent hover:border-accent/30',
        !collapsed && active && 'border-l-2 border-primary'
      )}
      aria-current={active ? 'page' : undefined}
      aria-label={collapsed ? route.title : undefined}
    >
      {/* 图标 */}
      <div
        className={cn(
          'flex-shrink-0 flex items-center justify-center',
          collapsed ? 'w-5 h-5' : 'w-4 h-4'
        )}
      >
        <IconComponent className="w-full h-full" />
      </div>

      {/* 标签文本 - 仅展开时显示 */}
      {!collapsed && (
        <span className="flex-1 text-left text-sm font-medium">
          {route.title}
        </span>
      )}

      {/* 管理员徽章 - 仅展开时显示 */}
      {!collapsed && route.requireAdmin && (
        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
          管理
        </span>
      )}
    </button>
  );
}
