import { createRootRoute, Outlet } from '@tanstack/react-router';
import { SentimentDashboardLayout } from '@sker/ui';
import { TopNavigation } from '../components/layout/TopNavigation';
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
    <SentimentDashboardLayout
      header={<TopNavigation />}
      sidebar={<Sidebar />}
      enableResize={true}
      defaultCollapsed={false}
      minSidebarWidth={240}
      maxSidebarWidth={400}
      aria-label="舆情监控系统"
    >
      <Outlet />
    </SentimentDashboardLayout>
  );
}
