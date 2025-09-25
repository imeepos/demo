import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from './components/layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { SentimentDashboard } from './pages/SentimentDashboard';
import { DashboardPage } from './pages/DashboardPage';
import { SentimentIntensityPage } from './pages/SentimentIntensityPage';
import { SentimentEventPage } from './pages/SentimentEventPage';

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

// 创建舆情分析大屏路由（地图视图）
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: SentimentDashboard,
});

// 创建舆情分析大屏路由（数据视图）
const dashboardViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard-view',
  component: DashboardPage,
});

// 创建情感强度管理路由
const sentimentIntensityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sentiment-intensity',
  component: SentimentIntensityPage,
});

// 创建舆情事件管理路由
const sentimentEventRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sentiment-event',
  component: SentimentEventPage,
});

// 导出路由树
export const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  dashboardViewRoute,
  sentimentIntensityRoute,
  sentimentEventRoute,
]);
