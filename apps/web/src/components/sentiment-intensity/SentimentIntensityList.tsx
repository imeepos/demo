import { Badge, Button, Card } from '@sker/ui';
import { Edit, Trash2 } from 'lucide-react';
import React from 'react';
import type { SentimentIntensityItem } from '../../types/sentiment-intensity';

interface SentimentIntensityListProps {
  items: SentimentIntensityItem[];
  isLoading: boolean;
  onEdit: (item: SentimentIntensityItem) => void;
  onDelete: (item: SentimentIntensityItem) => void;
}

export const SentimentIntensityList: React.FC<SentimentIntensityListProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
}) => {
  // 确保 items 是数组
  const safeItems = Array.isArray(items) ? items : [];

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">加载中...</div>
      </Card>
    );
  }

  if (safeItems.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          暂无数据，点击&quot;新建情感强度&quot;开始创建
        </div>
      </Card>
    );
  }

  // 安全获取数字类型的 intensity
  const safeIntensity = (value: any): number => {
    const num = typeof value === 'number' ? value : parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const getIntensityColor = (intensity: any) => {
    const num = safeIntensity(intensity);
    if (num >= 0.7) return 'bg-green-100 text-green-800 border-green-300';
    if (num >= 0.4) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getIntensityLabel = (intensity: any) => {
    const num = safeIntensity(intensity);
    if (num >= 0.7) return '高强度';
    if (num >= 0.4) return '中强度';
    return '低强度';
  };

  return (
    <div className="space-y-4">
      {safeItems.map(item => (
        <Card key={item.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <Badge variant="outline" className={getIntensityColor(item.intensity)}>
                  {getIntensityLabel(item.intensity)}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                强度值: {safeIntensity(item.intensity).toFixed(2)}
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${safeIntensity(item.intensity) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
