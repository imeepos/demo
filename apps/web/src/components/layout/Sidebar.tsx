import { BarChart3 } from 'lucide-react';
import {
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@sker/ui';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { getRoutesByGroup } from '../../lib/routes-config';
import { NavigationGroup } from './NavigationGroup';
import { NavigationItem } from './NavigationItem';

type NavigationGroupKey = 'dashboard' | 'analysis' | 'management' | 'system';
type SidebarVariant = 'default' | 'compact' | 'minimal';
type SidebarDensity = 'comfortable' | 'compact' | 'dense';

const NAVIGATION_GROUPS = [
  { key: 'dashboard' as const, priority: 1 },
  { key: 'analysis' as const, priority: 2 },
  { key: 'management' as const, priority: 3 },
  { key: 'system' as const, priority: 4 },
];

interface SidebarProps {
  className?: string;
  enabledGroups?: NavigationGroupKey[];
  brandTitle?: string;
  collapsed?: boolean;
  variant?: SidebarVariant;
  density?: SidebarDensity;
  onItemSelect?: (path: string, route: any) => void;
  showBrand?: boolean;
  'aria-label'?: string;
}

export function Sidebar({
  className,
  enabledGroups,
  brandTitle = '舆情监控系统',
  collapsed = false,
  variant = 'default',
  density = 'comfortable',
  onItemSelect,
  showBrand = true,
  'aria-label': ariaLabel = '主导航菜单',
}: SidebarProps) {
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleNavigate = (path: string, route?: any) => {
    router.navigate({ to: path });
    onItemSelect?.(path, route);
  };

  const getEnabledGroups = () => {
    if (enabledGroups) {
      return NAVIGATION_GROUPS.filter(group =>
        enabledGroups.includes(group.key)
      );
    }
    return NAVIGATION_GROUPS;
  };

  const navigationGroupsData = getEnabledGroups().map(group => ({
    config: group,
    routes: getRoutesByGroup(group.key),
  }));

  const densityClasses = {
    comfortable: collapsed ? 'px-3 py-4 space-y-2' : 'px-4 py-5 space-y-3',
    compact: collapsed ? 'px-2 py-3 space-y-1.5' : 'px-3 py-4 space-y-2',
    dense: collapsed ? 'px-2 py-2 space-y-1' : 'px-3 py-3 space-y-1.5',
  };

  const brandClasses = {
    comfortable: collapsed ? 'p-4' : 'p-5',
    compact: collapsed ? 'p-3' : 'p-4',
    dense: collapsed ? 'p-2' : 'p-3',
  };

  const BrandLogo = () => {
    const logoContent = (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white',
          'transition-all duration-300 ease-in-out',
          variant === 'minimal' &&
            'bg-primary/10 text-primary border border-primary/20',
          {
            comfortable: collapsed
              ? 'w-10 h-10 rounded-xl'
              : 'w-12 h-12 rounded-2xl',
            compact: collapsed ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl',
            dense: collapsed ? 'w-7 h-7 rounded-md' : 'w-9 h-9 rounded-lg',
          }[density]
        )}
      >
        <BarChart3
          className={cn(
            'transition-all duration-300 ease-in-out',
            {
              comfortable: collapsed ? 'w-5 h-5' : 'w-7 h-7',
              compact: collapsed ? 'w-4 h-4' : 'w-6 h-6',
              dense: collapsed ? 'w-3.5 h-3.5' : 'w-5 h-5',
            }[density]
          )}
        />
      </div>
    );

    return collapsed ? (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{logoContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {brandTitle}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      logoContent
    );
  };

  return (
    <div
      className={cn('h-full flex flex-col', className)}
      role="navigation"
      aria-label={ariaLabel}
    >
      {showBrand && (
        <header
          className={cn(
            'border-b border-border/30 transition-all duration-300 ease-in-out',
            brandClasses[density],
            collapsed
              ? 'flex flex-col items-center justify-center'
              : 'flex items-center gap-3'
          )}
        >
          <BrandLogo />

          {!collapsed && (
            <h1
              className={cn(
                'font-semibold text-foreground truncate transition-all duration-300 ease-in-out',
                {
                  comfortable: 'text-lg',
                  compact: 'text-base',
                  dense: 'text-sm',
                }[density]
              )}
            >
              {brandTitle}
            </h1>
          )}
        </header>
      )}

      <nav
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          densityClasses[density]
        )}
        role="list"
        aria-label="导航菜单"
      >
        {navigationGroupsData.map(({ config, routes }) => (
          <div key={config.key} className="space-y-1">
            <NavigationGroup
              groupKey={config.key}
              routes={routes}
              currentPath={currentPath}
              collapsed={collapsed}
              density={density}
              variant={variant}
              onNavigate={handleNavigate}
            >
              {routes.map(route => (
                <NavigationItem
                  key={route.path}
                  route={route}
                  active={currentPath === route.path}
                  collapsed={collapsed}
                  density={density}
                  variant={variant}
                  onClick={() => handleNavigate(route.path, route)}
                />
              ))}
            </NavigationGroup>
          </div>
        ))}
      </nav>
    </div>
  );
}
