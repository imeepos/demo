import { BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@sker/ui';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { getRoutesByGroup } from '../../lib/routes-config';
import { NavigationGroup } from './NavigationGroup';
import { NavigationItem } from './NavigationItem';

type NavigationGroupKey = 'dashboard' | 'analysis' | 'management' | 'system';

const NAVIGATION_GROUPS = [
  { key: 'dashboard' as const, priority: 1 },
  { key: 'analysis' as const, priority: 2 },
  { key: 'management' as const, priority: 3 },
  { key: 'system' as const, priority: 4 },
];

interface SidebarProps {
  className?: string;
  defaultCollapsed?: boolean;
  enabledGroups?: NavigationGroupKey[];
  brandTitle?: string;
}

export function Sidebar({
  className,
  defaultCollapsed = false,
  enabledGroups,
  brandTitle = '舆情监控系统',
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleNavigate = (path: string) => {
    router.navigate({ to: path });
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

  return (
    <aside
      className={cn(
        'h-full flex flex-col transition-all duration-300 ease-in-out',
        'bg-card border-r border-border/40 shadow-sm',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <header
        className={cn(
          'p-4 border-b border-border/30',
          collapsed
            ? 'flex flex-col items-center gap-2'
            : 'flex items-center gap-3'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white',
            'transition-all duration-300',
            collapsed ? 'w-10 h-10 rounded-lg' : 'w-10 h-10 rounded-xl'
          )}
        >
          <BarChart3 className={collapsed ? 'w-6 h-6' : 'w-6 h-6'} />
        </div>

        {!collapsed && (
          <h1 className="font-bold text-lg text-foreground">{brandTitle}</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center justify-center transition-all duration-200',
            'hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/50',
            collapsed
              ? 'w-8 h-6 mt-2 rounded-md bg-primary/10 text-primary'
              : 'w-7 h-7 rounded-md bg-background/60 text-muted-foreground ml-auto'
          )}
          aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </header>

      <nav
        className={cn(
          'flex-1 overflow-y-auto',
          collapsed ? 'px-2 py-3 space-y-2' : 'px-3 py-4 space-y-2'
        )}
      >
        {navigationGroupsData.map(({ config, routes }) => (
          <div key={config.key} className="space-y-1">
            <NavigationGroup
              groupKey={config.key}
              routes={routes}
              currentPath={currentPath}
              collapsed={collapsed}
              onNavigate={handleNavigate}
            >
              {routes.map(route => (
                <NavigationItem
                  key={route.path}
                  route={route}
                  active={currentPath === route.path}
                  collapsed={collapsed}
                  onClick={() => handleNavigate(route.path)}
                />
              ))}
            </NavigationGroup>
          </div>
        ))}
      </nav>
    </aside>
  );
}
