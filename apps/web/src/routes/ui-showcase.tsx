import { createFileRoute } from '@tanstack/react-router';
import { UIShowcasePage } from '../pages/UIShowcasePage';

/**
 * UI组件展示页面路由
 * 职责：展示所有UI组件的组合使用效果
 */
export const Route = createFileRoute('/ui-showcase')({
  component: UIShowcasePage,
});
