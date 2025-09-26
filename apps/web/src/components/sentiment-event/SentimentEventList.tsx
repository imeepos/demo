import { Button } from '@sker/ui';
import {
  Edit,
  MapPin,
  Trash2,
  Calendar,
  Database,
  FileX,
  TrendingUp,
  Activity,
  Hash,
} from 'lucide-react';
import React from 'react';
import {
  DashboardCard,
  ProgressBar,
  SentimentBadge,
} from '../dashboard/DashboardComponents';
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
              正在获取舆情事件信息...
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
              暂无事件数据
            </h3>
            <p className="text-muted-foreground max-w-md">
              尚未创建任何舆情事件，点击&quot;新建舆情事件&quot;按钮开始创建第一个事件记录
            </p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  // 安全转换 score 为数字类型
  const parseScore = (score: string | number): number => {
    const numScore = typeof score === 'string' ? parseFloat(score) : score;
    return isNaN(numScore) ? 0 : numScore;
  };

  // 安全转换经纬度为数字类型
  const parseCoordinate = (
    coordinate: string | number | null | undefined
  ): number | null => {
    if (coordinate === null || coordinate === undefined) return null;
    const numCoordinate =
      typeof coordinate === 'string' ? parseFloat(coordinate) : coordinate;
    return isNaN(numCoordinate) ? null : numCoordinate;
  };

  const getSentimentVariant = (
    score: string | number
  ):
    | 'very-positive'
    | 'positive'
    | 'neutral'
    | 'negative'
    | 'very-negative' => {
    const numScore = parseScore(score);
    if (numScore >= 0.8) return 'very-positive';
    if (numScore >= 0.6) return 'positive';
    if (numScore >= 0.4) return 'neutral';
    if (numScore >= 0.2) return 'negative';
    return 'very-negative';
  };

  const getSentimentLabel = (score: string | number) => {
    const numScore = parseScore(score);
    if (numScore >= 0.8) return '非常正面';
    if (numScore >= 0.6) return '正面';
    if (numScore >= 0.4) return '中性';
    if (numScore >= 0.2) return '负面';
    return '非常负面';
  };

  const getProgressVariant = (
    score: string | number
  ): 'success' | 'warning' | 'primary' | 'danger' => {
    const numScore = parseScore(score);
    if (numScore >= 0.7) return 'success';
    if (numScore >= 0.4) return 'warning';
    if (numScore >= 0.2) return 'primary';
    return 'danger';
  };

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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
      {safeItems.map((item, index) => {
        const sentimentVariant = getSentimentVariant(item.score);
        const progressVariant = getProgressVariant(item.score);

        return (
          <DashboardCard
            key={item.id}
            variant="default"
            className="hover:shadow-tech-lg transition-all duration-300 animate-card-float min-h-[400px] flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="space-y-3 flex-1 flex flex-col">
                {/* 卡片头部 - 标题区域（固定高度）*/}
                <div className="min-h-[4rem] flex items-start gap-3">
                  <div className="p-1 bg-primary/10 rounded mt-1 flex-shrink-0">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                    <h3 className="text-base font-bold text-foreground leading-tight mb-2 line-clamp-2">
                      {truncateText(item.title, 50)}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <SentimentBadge sentiment={sentimentVariant}>
                        {getSentimentLabel(item.score)}
                      </SentimentBadge>
                      <div className="text-xs text-muted-foreground">
                        <span className="data-value font-mono">
                          {parseScore(item.score).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 情感分数进度条 - 简化版 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">情感评级</span>
                    <span className="font-medium">
                      {(parseScore(item.score) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <ProgressBar
                    value={parseScore(item.score) * 100}
                    variant={progressVariant}
                    className="h-1.5"
                  />
                </div>

                {/* 关键信息 - 紧凑布局 */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.timestamp).split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Hash className="w-3 h-3" />
                      <span>{item.source}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono text-xs">
                        {(() => {
                          const lat = parseCoordinate(item.latitude);
                          const lng = parseCoordinate(item.longitude);
                          return lat && lng
                            ? `${lat.toFixed(2)}, ${lng.toFixed(2)}`
                            : '无位置';
                        })()}
                      </span>
                    </div>
                    {item.hotness && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-orange-500" />
                        <span className="text-orange-500 font-medium">
                          {item.hotness}/10
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 内容预览区域 - 固定高度 */}
                <div className="min-h-[2.5rem] p-2 bg-muted/20 rounded border-l-2 border-primary/30">
                  {item.content ? (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {truncateText(item.content, 80)}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground/50 italic">
                      暂无内容预览
                    </p>
                  )}
                </div>

                {/* 标签区域 - 固定高度 */}
                <div className="min-h-[1.5rem] flex flex-wrap gap-1 items-start">
                  {item.tags && item.tags.length > 0 ? (
                    <>
                      {item.tags
                        .slice(0, 2)
                        .map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      {item.tags.length > 2 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                          +{item.tags.length - 2}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground/50 italic">
                      无标签
                    </span>
                  )}
                </div>

                {/* 操作按钮 - 底部横向布局 */}
                <div className="flex items-center justify-end gap-1 pt-2 border-t border-border/50 mt-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="h-7 w-7 p-0 text-primary hover:bg-primary hover:text-white"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item)}
                    className="h-7 w-7 p-0 text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="w-3 h-3" />
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
