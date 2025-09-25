import { Button } from '@sker/ui';
import { Edit, MapPin, Trash2, Calendar, Database, FileX, TrendingUp, Activity, Hash } from 'lucide-react';
import React from 'react';
import { DashboardCard, ProgressBar, SentimentBadge, LiveIndicator } from '../dashboard/DashboardComponents';
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
            <div className="text-lg font-semibold text-foreground mb-1">数据加载中</div>
            <div className="text-sm text-muted-foreground">正在获取舆情事件信息...</div>
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
            <h3 className="text-lg font-semibold text-foreground">暂无事件数据</h3>
            <p className="text-muted-foreground max-w-md">
              尚未创建任何舆情事件，点击"新建舆情事件"按钮开始创建第一个事件记录
            </p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  const getSentimentVariant = (score: number): 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative' => {
    if (score >= 0.8) return 'very-positive';
    if (score >= 0.6) return 'positive';
    if (score >= 0.4) return 'neutral';
    if (score >= 0.2) return 'negative';
    return 'very-negative';
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 0.8) return '非常正面';
    if (score >= 0.6) return '正面';
    if (score >= 0.4) return '中性';
    if (score >= 0.2) return '负面';
    return '非常负面';
  };

  const getProgressVariant = (score: number): 'success' | 'warning' | 'primary' | 'danger' => {
    if (score >= 0.7) return 'success';
    if (score >= 0.4) return 'warning';
    if (score >= 0.2) return 'primary';
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
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="space-y-6">
      {safeItems.map((item, index) => {
        const sentimentVariant = getSentimentVariant(item.score);
        const progressVariant = getProgressVariant(item.score);
        
        return (
          <DashboardCard key={item.id} variant="default" className="hover:shadow-tech-lg transition-all duration-300 animate-card-float" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  {/* 标题和状态 */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-1">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {truncateText(item.title, 80)}
                        </h3>
                        <LiveIndicator status="online" size="sm" />
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <SentimentBadge sentiment={sentimentVariant}>
                          {getSentimentLabel(item.score)}
                        </SentimentBadge>
                        <div className="text-sm text-muted-foreground">
                          分数: <span className="data-value font-mono">{item.score.toFixed(3)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 情感分数进度条 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        情感评级
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {(item.score * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    <ProgressBar 
                      value={item.score * 100} 
                      variant={progressVariant} 
                      className="h-2"
                    />
                  </div>

                  {/* 事件信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">时间:</span>
                      <span className="font-medium text-foreground">{formatDate(item.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">来源:</span>
                      <span className="font-medium text-foreground">{item.source}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">位置:</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.latitude ? `${item.latitude?.toFixed(4)}, ${item.longitude?.toFixed(4)}` : '位置信息不可用'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">热度:</span>
                      <span className="font-medium text-foreground">
                        {item.hotness ? `${item.hotness}/10` : '未设置'}
                      </span>
                    </div>
                  </div>

                  {/* 内容预览 */}
                  {item.content && (
                    <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-primary/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {truncateText(item.content, 150)}
                      </p>
                    </div>
                  )}

                  {/* 标签 */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 5).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 5 && (
                        <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          +{item.tags.length - 5} 更多
                        </span>
                      )}
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