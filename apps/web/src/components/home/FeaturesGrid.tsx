import { FeatureCard } from './FeatureCard';

const FEATURES = [
  {
    title: '实时数据监控',
    description: '7×24小时全网数据采集，支持微博、新闻、论坛等多平台监控',
    icon: '📊',
    color: 'primary',
    metrics: { value: '2.8K+', label: '日均监控数据' }
  },
  {
    title: '情感分析引擎',
    description: '基于深度学习的情感分析算法，准确识别正面、负面、中性情感',
    icon: '🧠',
    color: 'success',
    metrics: { value: '94.2%', label: '分析准确率' }
  },
  {
    title: '地理位置分析',
    description: '结合地理位置信息，提供区域性舆情分布和热点地图可视化',
    icon: '🌍',
    color: 'warning',
    metrics: { value: '350+', label: '覆盖城市' }
  },
  {
    title: '智能预警系统',
    description: '多维度风险评估模型，及时发现和预警潜在舆情风险',
    icon: '🚨',
    color: 'danger',
    metrics: { value: '99.8%', label: '系统可用性' }
  },
  {
    title: '热点话题追踪',
    description: '智能识别热门话题和关键词，实时跟踪话题传播趋势',
    icon: '🔥',
    color: 'default',
    metrics: { value: '24/7', label: '实时追踪' }
  },
  {
    title: '数据可视化',
    description: '丰富的图表和大屏展示，直观呈现监控数据和分析结果',
    icon: '📈',
    color: 'primary',
    metrics: { value: '15+', label: '可视化图表' }
  },
] as const;

/**
 * 业务功能特性网格组件
 * 职责：展示舆情监控系统的核心功能特性
 */
export function FeaturesGrid() {
  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">核心功能</h2>
        <p className="text-lg text-muted-foreground">
          专业的舆情监控解决方案，助您掌握舆论先机
        </p>
      </div>

      {/* 功能网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(feature => (
          <FeatureCard 
            key={feature.title} 
            title={feature.title} 
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
            metrics={feature.metrics}
          />
        ))}
      </div>
    </div>
  );
}
