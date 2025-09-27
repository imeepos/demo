/**
 * 媒体类型管理路由
 *
 * 设计理念：
 * - 类型安全的路由定义
 * - 延迟加载优化性能
 * - 完整的路由元数据
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import { createFileRoute } from '@tanstack/react-router';
import { MediaTypePage } from '../pages/MediaTypePage';

export const Route = createFileRoute('/media-type')({
  component: MediaTypePage,
});
