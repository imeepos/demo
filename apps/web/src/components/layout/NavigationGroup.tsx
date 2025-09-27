import {
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@sker/ui';
import { ROUTE_GROUPS, type RouteConfig } from '../../lib/routes-config';

type SidebarVariant = 'default' | 'compact' | 'minimal';
type SidebarDensity = 'comfortable' | 'compact' | 'dense';

interface NavigationGroupProps {
  readonly groupKey: keyof typeof ROUTE_GROUPS;
  readonly routes: RouteConfig[];
  readonly currentPath: string;
  readonly collapsed: boolean;
  readonly density?: SidebarDensity;
  readonly variant?: SidebarVariant;
  readonly onNavigate: (path: string, route?: any) => void;
  readonly children: React.ReactNode;
}

export function NavigationGroup({
  groupKey,
  routes,
  currentPath,
  collapsed,
  density = 'comfortable',
  variant = 'default',
  onNavigate,
  children,
}: NavigationGroupProps) {
  const group = ROUTE_GROUPS[groupKey];
  const IconComponent = group.icon;
  const hasActiveRoute = routes.some(route => route.path === currentPath);

  if (routes.length === 0) return null;

  const iconSizes = {
    comfortable: collapsed ? 'w-5 h-5' : 'w-4 h-4',
    compact: collapsed ? 'w-4 h-4' : 'w-3.5 h-3.5',
    dense: collapsed ? 'w-3.5 h-3.5' : 'w-3 h-3',
  };

  const containerSizes = {
    comfortable: collapsed ? 'w-10 h-10' : 'w-5 h-5',
    compact: collapsed ? 'w-8 h-8' : 'w-4 h-4',
    dense: collapsed ? 'w-7 h-7' : 'w-3.5 h-3.5',
  };

  const spacingClasses = {
    comfortable: 'space-y-2',
    compact: 'space-y-1.5',
    dense: 'space-y-1',
  };

  const headerSpacing = {
    comfortable: collapsed ? 'mb-3' : 'mb-2',
    compact: collapsed ? 'mb-2' : 'mb-1.5',
    dense: collapsed ? 'mb-1.5' : 'mb-1',
  };

  const CollapsedGroupIcon = () => {
    const iconContent = (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out',
          'group-hover:scale-105',
          hasActiveRoute
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          variant === 'minimal' && 'bg-transparent border-2',
          containerSizes[density]
        )}
      >
        <IconComponent
          className={cn(
            'transition-all duration-300 ease-in-out',
            iconSizes[density]
          )}
        />
      </div>
    );

    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group cursor-pointer">{iconContent}</div>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            <div className="space-y-1">
              <div className="font-semibold">{group.title}</div>
              <div className="text-xs text-muted-foreground">
                {routes.length} 项功能
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const ExpandedGroupHeader = () => (
    <header className={cn('px-2 py-1', headerSpacing[density])}>
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        <div
          className={cn(
            'rounded flex items-center justify-center transition-all duration-300 ease-in-out',
            hasActiveRoute
              ? 'bg-primary/20 text-primary'
              : 'bg-muted text-muted-foreground',
            variant === 'minimal' && 'bg-transparent border border-current',
            containerSizes[density]
          )}
        >
          <IconComponent
            className={cn(
              'transition-all duration-300 ease-in-out',
              iconSizes[density]
            )}
          />
        </div>
        <span className="transition-all duration-300 ease-in-out">
          {group.title}
        </span>
      </div>
    </header>
  );

  if (collapsed) {
    return (
      <section
        className={cn('flex flex-col items-center', spacingClasses[density])}
      >
        <CollapsedGroupIcon />
        <div className="space-y-1 w-full">{children}</div>
      </section>
    );
  }

  return (
    <section
      className={spacingClasses[density]}
      role="group"
      aria-labelledby={`group-${groupKey}`}
    >
      <ExpandedGroupHeader />
      <div
        className={cn(
          'space-y-1 transition-all duration-300 ease-in-out',
          'ml-6' // 横向错位：菜单项向右缩进
        )}
        role="list"
      >
        {children}
      </div>
    </section>
  );
}
