import {
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@sker/ui';
import { type RouteConfig } from '../../lib/routes-config';

type SidebarVariant = 'default' | 'compact' | 'minimal';
type SidebarDensity = 'comfortable' | 'compact' | 'dense';

interface NavigationItemProps {
  readonly route: RouteConfig;
  readonly active?: boolean;
  readonly onClick?: () => void;
  readonly collapsed?: boolean;
  readonly density?: SidebarDensity;
  readonly variant?: SidebarVariant;
}

export function NavigationItem({
  route,
  active = false,
  collapsed = false,
  density = 'comfortable',
  variant = 'default',
  onClick,
}: NavigationItemProps) {
  const IconComponent = route.icon;

  const paddingClasses = {
    comfortable: collapsed ? 'p-3' : 'px-3 py-2.5',
    compact: collapsed ? 'p-2.5' : 'px-2.5 py-2',
    dense: collapsed ? 'p-2' : 'px-2 py-1.5',
  };

  const iconSizes = {
    comfortable: collapsed ? 'w-5 h-5' : 'w-4 h-4',
    compact: collapsed ? 'w-4 h-4' : 'w-3.5 h-3.5',
    dense: collapsed ? 'w-3.5 h-3.5' : 'w-3 h-3',
  };

  const textSizes = {
    comfortable: 'text-sm',
    compact: 'text-sm',
    dense: 'text-xs',
  };

  const gapClasses = {
    comfortable: 'gap-3',
    compact: 'gap-2.5',
    dense: 'gap-2',
  };

  const buttonContent = (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center relative group rounded-md transition-all duration-300 ease-in-out',
        'transform hover:scale-[1.02] active:scale-[0.98]',
        paddingClasses[density],
        !collapsed && gapClasses[density],
        active
          ? variant === 'minimal'
            ? 'bg-primary/10 text-primary border border-primary/30'
            : 'bg-primary text-primary-foreground shadow-sm'
          : variant === 'minimal'
            ? 'text-muted-foreground hover:text-foreground hover:bg-accent/30 border border-transparent hover:border-accent/30'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/60',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1',
        // 在展开状态下，菜单项有轻微的左边框来强化层次
        !collapsed && 'border-l-2 border-transparent hover:border-accent/30',
        !collapsed && active && 'border-l-2 border-primary',
        collapsed && 'justify-center'
      )}
      aria-current={active ? 'page' : undefined}
      aria-label={collapsed ? route.title : undefined}
      role="listitem"
    >
      {/* 图标 */}
      <div
        className={cn(
          'flex-shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out',
          iconSizes[density]
        )}
      >
        <IconComponent className="w-full h-full" />
      </div>

      {/* 标签文本 - 仅展开时显示 */}
      {!collapsed && (
        <span
          className={cn(
            'flex-1 text-left font-medium transition-all duration-300 ease-in-out',
            textSizes[density]
          )}
        >
          {route.title}
        </span>
      )}

      {/* 管理员徽章 - 仅展开时显示 */}
      {!collapsed && route.requireAdmin && (
        <span
          className={cn(
            'px-2 py-0.5 rounded-md font-medium bg-muted text-muted-foreground transition-all duration-300 ease-in-out',
            density === 'dense' ? 'text-xs' : 'text-xs'
          )}
        >
          管理
        </span>
      )}

      {/* Active指示器 */}
      {active && !collapsed && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full transition-all duration-300 ease-in-out" />
      )}
    </button>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            <div className="space-y-1">
              <div>{route.title}</div>
              {route.requireAdmin && (
                <div className="text-xs text-muted-foreground">
                  需要管理权限
                </div>
              )}
              {route.description && (
                <div className="text-xs text-muted-foreground max-w-48">
                  {route.description}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
}
