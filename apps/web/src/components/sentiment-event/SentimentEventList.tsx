import { Badge, Button, Card } from '@sker/ui';
import { Edit, MapPin, Trash2, Calendar } from 'lucide-react';
import React from 'react';
import type { SentimentEvent } from '../../types/sentiment-event';

interface SentimentEventListProps {
  items: SentimentEvent[];
  isLoading: boolean;
  onEdit: (item: SentimentEvent) => void;
  onDelete: (item: SentimentEvent) => void;
}

export const SentimentEventList: React.FC<SentimentEventListProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
}) => {
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
          暂无舆情事件数据，点击&ldquo;新建舆情事件&rdquo;开始创建
        </div>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 0.3) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.7) return '正面';
    if (score >= 0.3) return '中性';
    return '负面';
  };

  // 热度颜色函数暂时不使用，因为基础响应中不包含热度信息
  // const getHotnessColor = (hotness?: number) => {
  //   if (!hotness) return 'bg-gray-100 text-gray-600';
  //   if (hotness >= 7) return 'bg-red-100 text-red-700';
  //   if (hotness >= 4) return 'bg-orange-100 text-orange-700';
  //   return 'bg-blue-100 text-blue-700';
  // };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {safeItems.map(item => (
        <Card key={item.id} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={getScoreColor(item.score)}>
                      {getScoreLabel(item.score)} ({item.score.toFixed(2)})
                    </Badge>
                    {/* 热度信息在基础响应中不可用 */}
                  </div>
                </div>
              </div>

              {/* 内容在基础响应中不可用 */}

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.timestamp)}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>位置信息不可用</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.source}
                </Badge>
              </div>

              {/* 标签在基础响应中不可用 */}

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    item.score >= 0.7
                      ? 'bg-green-500'
                      : item.score >= 0.3
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${item.score * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">情感分数: {item.score.toFixed(2)}</div>
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
