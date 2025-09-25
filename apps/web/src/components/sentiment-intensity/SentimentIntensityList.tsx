import { Button } from '@sker/ui';
import { Edit, Trash2, Database, FileX } from 'lucide-react';
import React from 'react';
import {
  DashboardCard,
  ProgressBar,
  MetricValue,
} from '../dashboard/DashboardComponents';
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
      <DashboardCard className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <Database className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground mb-1">
              数据加载中
            </div>
            <div className="text-sm text-muted-foreground">
              正在获取情感强度配置信息...
            </div>
          </div>
        </div>
      </DashboardCard>
    );
  }

  if (safeItems.length === 0) {
    return (
      <DashboardCard className="p-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="p-4 bg-muted/30 rounded-full">
            <FileX className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              暂无配置数据
            </h3>
            <p className="text-muted-foreground max-w-md">
              尚未创建任何情感强度配置，点击“新建情感强度配置”按钮开始创建第一个配置项
            </p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  // 安全获取数字类型的 intensity
  const safeIntensity = (value: any): number => {
    const num = typeof value === 'number' ? value : parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // 统一的颜色判断逻辑
  const getVariant = (
    intensity: any
  ): 'success' | 'warning' | 'primary' | 'danger' => {
    const num = safeIntensity(intensity);
    if (num >= 0.7) return 'success';
    if (num >= 0.4) return 'warning';
    if (num >= 0.2) return 'primary';
    return 'danger';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {safeItems.map((item, index) => {
        const intensityValue = safeIntensity(item.intensity);
        const variant = getVariant(item.intensity);

        return (
          <DashboardCard
            key={item.id}
            variant={variant}
            className="hover:shadow-tech-lg transition-all duration-300 animate-card-float group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              {/* 标题区域 */}
              <div className="text-center space-y-3 mb-6">
                <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* 强度数据区域 */}
              <div className="text-center space-y-4 mb-6">
                <MetricValue size="sm" variant={variant}>
                  {intensityValue.toFixed(3)}
                </MetricValue>

                <ProgressBar
                  value={intensityValue * 100}
                  variant={variant}
                  shine={true}
                  className="h-3"
                />
              </div>

              {/* 描述信息 */}
              {item.description && (
                <div className="p-3 bg-muted/20 rounded-lg border-l-4 border-primary/50 mb-6 group-hover:bg-muted/30 transition-colors duration-300">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              )}
              {/* 操作按钮区域 */}
              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  编辑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(item)}
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  删除
                </Button>
              </div>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
};
