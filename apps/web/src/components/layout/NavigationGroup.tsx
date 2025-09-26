import { cn } from '@sker/ui';
import { ROUTE_GROUPS, type RouteConfig } from '../../lib/routes-config';

interface NavigationGroupProps {
  readonly groupKey: keyof typeof ROUTE_GROUPS;
  readonly routes: RouteConfig[];
  readonly currentPath: string;
  readonly collapsed: boolean;
  readonly onNavigate: (path: string) => void;
  readonly children: React.ReactNode;
}

export function NavigationGroup({
  groupKey,
  routes,
  currentPath,
  collapsed,
  onNavigate,
  children,
}: NavigationGroupProps) {
  const group = ROUTE_GROUPS[groupKey];
  const IconComponent = group.icon;
  const hasActiveRoute = routes.some(route => route.path === currentPath);

  if (routes.length === 0) return null;

  return (
    <section className="space-y-2">
      {!collapsed && (
        <header className="px-2 py-1 mb-1">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <div
              className={cn(
                'w-4 h-4 rounded flex items-center justify-center',
                hasActiveRoute
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <IconComponent className="h-2.5 w-2.5" />
            </div>
            <span>{group.title}</span>
          </div>
        </header>
      )}

      <div
        className={cn(
          'space-y-1',
          !collapsed && 'ml-6' // 横向错位：菜单项向右缩进
        )}
      >
        {children}
      </div>
    </section>
  );
}
