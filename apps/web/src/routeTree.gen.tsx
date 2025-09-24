import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from './components/layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { SentimentDashboard } from './pages/SentimentDashboard';

/**
 * 路由配置
 * 职责：定义应用路由结构
 */

// 创建根路由
const rootRoute = createRootRoute({
  component: RootLayout,
});

// 创建首页路由
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// 创建舆情分析大屏路由
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: SentimentDashboard,
});

// 导出路由树
export const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);
