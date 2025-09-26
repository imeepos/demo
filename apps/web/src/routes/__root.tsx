import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

/**
 * 根路由布局
 * 职责：提供全站统一的布局结构和开发工具
 */
export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="py-0 px-0">
        <Outlet />
      </main>
      {/* 仅在开发环境中显示 TanStack Router DevTools */}
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  );
}
