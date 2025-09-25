import { Badge, Button } from '@sker/ui';
import { Edit, Trash2, Zap, TrendingUp, Database, FileX } from 'lucide-react';
import React from 'react';
import {
  DashboardCard,
  ProgressBar,
  SentimentBadge,
  LiveIndicator,
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

  const getIntensityVariant = (
    intensity: any
  ):
    | 'very-positive'
    | 'positive'
    | 'neutral'
    | 'negative'
    | 'very-negative' => {
    const num = safeIntensity(intensity);
    if (num >= 0.8) return 'very-positive';
    if (num >= 0.6) return 'positive';
    if (num >= 0.4) return 'neutral';
    if (num >= 0.2) return 'negative';
    return 'very-negative';
  };

  const getIntensityLabel = (intensity: any) => {
    const num = safeIntensity(intensity);
    if (num >= 0.8) return '极高强度';
    if (num >= 0.6) return '高强度';
    if (num >= 0.4) return '中等强度';
    if (num >= 0.2) return '低强度';
    return '极低强度';
  };

  const getProgressVariant = (
    intensity: any
  ): 'success' | 'warning' | 'primary' | 'danger' => {
    const num = safeIntensity(intensity);
    if (num >= 0.7) return 'success';
    if (num >= 0.4) return 'warning';
    if (num >= 0.2) return 'primary';
    return 'danger';
  };

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      {safeItems.map((item, index) => {
        const intensityValue = safeIntensity(item.intensity);
        const progressVariant = getProgressVariant(item.intensity);
        const sentimentVariant = getIntensityVariant(item.intensity);

        return (
          <DashboardCard
            key={item.id}
            variant="default"
            className="hover:shadow-tech-lg transition-all duration-300 animate-card-float"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  {/* 标题和状态 */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-foreground">
                          {item.title}
                        </h3>
                        <LiveIndicator status="online" />
                      </div>
                      <SentimentBadge sentiment={sentimentVariant}>
                        {getIntensityLabel(item.intensity)}
                      </SentimentBadge>
                    </div>
                  </div>

                  {/* 强度显示 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        强度数值
                      </div>
                      <div className="text-xl font-bold data-value text-primary">
                        {intensityValue.toFixed(3)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0.000</span>
                        <span className="font-medium">
                          {(intensityValue * 100).toFixed(1)}%
                        </span>
                        <span>1.000</span>
                      </div>
                      <ProgressBar
                        value={intensityValue * 100}
                        variant={progressVariant}
                        className="h-3"
                      />
                    </div>
                  </div>

                  {/* 描述信息 */}
                  {item.description && (
                    <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-primary/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(item)}
                    className="border-destructive/50 text-destructive hover:bg-destructive hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
};
