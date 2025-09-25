import { FeatureCard } from './FeatureCard';

const FEATURES = [
  {
    title: 'React 19',
    description: '最新的 React 版本，带来更好的性能和开发体验',
  },
  {
    title: 'TanStack Router',
    description: '类型安全的路由管理，支持预加载和缓存',
  },
  {
    title: 'TailwindCSS v4',
    description: '原子化 CSS 框架，快速构建现代化界面',
  },
] as const;

/**
 * 功能特性网格组件
 * 职责：展示项目技术栈特性列表
 */
export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURES.map(feature => (
        <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
      ))}
    </div>
  );
}
