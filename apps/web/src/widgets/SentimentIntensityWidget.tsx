import React from 'react';
import { Card, Badge } from '@sker/ui';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useSentimentIntensityList } from '../hooks/use-sentiment-intensity';

/**
 * 情感强度挂件组件 - 零入参，拿来即用
 * 用于大屏幕展示情感强度统计信息
 */
export const SentimentIntensityWidget: React.FC = () => {
  const { data: items = [], isLoading } = useSentimentIntensityList();

  if (isLoading) {
    return (
      <Card className="p-6 h-48">
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">加载中...</div>
        </div>
      </Card>
    );
  }

  // 统计数据
  const totalCount = items.length;
  const highIntensity = items.filter(item => item.intensity >= 0.7).length;
  const mediumIntensity = items.filter(
    item => item.intensity >= 0.4 && item.intensity < 0.7,
  ).length;
  const lowIntensity = items.filter(item => item.intensity < 0.4).length;

  const avgIntensity =
    totalCount > 0 ? items.reduce((sum, item) => sum + item.intensity, 0) / totalCount : 0;

  const getIntensityIcon = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return <TrendingUp className="w-4 h-4" />;
      case 'medium':
        return <Minus className="w-4 h-4" />;
      case 'low':
        return <TrendingDown className="w-4 h-4" />;
    }
  };

  const getIntensityColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">情感强度统计</h3>
        <p className="text-sm text-gray-600">实时监控情感强度分布情况</p>
      </div>

      <div className="space-y-4">
        {/* 总数和平均值 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-gray-600">总记录数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{avgIntensity.toFixed(2)}</div>
            <div className="text-sm text-gray-600">平均强度</div>
          </div>
        </div>

        {/* 强度分布 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getIntensityIcon('high')}
              <span className="text-sm font-medium">高强度 (0.7-1.0)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getIntensityColor('high')}>
                {highIntensity}
              </Badge>
              <span className="text-xs text-gray-500">
                {totalCount > 0 ? `${((highIntensity / totalCount) * 100).toFixed(1)}%` : '0%'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getIntensityIcon('medium')}
              <span className="text-sm font-medium">中强度 (0.4-0.7)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getIntensityColor('medium')}>
                {mediumIntensity}
              </Badge>
              <span className="text-xs text-gray-500">
                {totalCount > 0 ? `${((mediumIntensity / totalCount) * 100).toFixed(1)}%` : '0%'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getIntensityIcon('low')}
              <span className="text-sm font-medium">低强度 (0.0-0.4)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getIntensityColor('low')}>
                {lowIntensity}
              </Badge>
              <span className="text-xs text-gray-500">
                {totalCount > 0 ? `${((lowIntensity / totalCount) * 100).toFixed(1)}%` : '0%'}
              </span>
            </div>
          </div>
        </div>

        {/* 强度分布可视化条 */}
        {totalCount > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">强度分布</div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${(highIntensity / totalCount) * 100}%` }}
              />
              <div
                className="bg-yellow-500 h-full transition-all duration-300"
                style={{ width: `${(mediumIntensity / totalCount) * 100}%` }}
              />
              <div
                className="bg-red-500 h-full transition-all duration-300"
                style={{ width: `${(lowIntensity / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
