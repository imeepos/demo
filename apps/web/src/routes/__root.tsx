import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TopNavigation } from '../components/layout/TopNavigation';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Sidebar } from '../components/layout/Sidebar';

/**
 * 根路由布局
 * 职责：提供全站统一的布局结构和开发工具
 */
export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopNavigation />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
