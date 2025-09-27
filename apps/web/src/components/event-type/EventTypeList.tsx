import { Button } from '@sker/ui';
import {
  Edit,
  Trash2,
  Calendar,
  Database,
  FileX,
  Hash,
  Palette,
  ToggleLeft,
  ToggleRight,
  Tag,
} from 'lucide-react';
import React from 'react';
import { DashboardCard } from '../dashboard/DashboardComponents';
import type { EventType } from '../../types/event-type';

interface EventTypeListProps {
  items: EventType[];
  isLoading: boolean;
  onEdit: (item: EventType) => void;
  onDelete: (item: EventType) => void;
  onToggleStatus: (item: EventType) => void;
}

export const EventTypeList: React.FC<EventTypeListProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
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
              正在获取事件类型信息...
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
              暂无事件类型
            </h3>
            <p className="text-muted-foreground max-w-md">
              尚未创建任何事件类型，点击"新建事件类型"按钮开始创建第一个类型分类
            </p>
          </div>
        </div>
      </DashboardCard>
    );
  }

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

  const getStatusVariant = (isActive: boolean): 'positive' | 'neutral' => {
    return isActive ? 'positive' : 'neutral';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[70vh] overflow-y-auto pr-2">
      {safeItems.map((item, index) => {
        return (
          <DashboardCard
            key={item.id}
            variant="default"
            className="hover:shadow-tech-lg transition-all duration-300 animate-card-float min-h-[320px] flex flex-col"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="min-h-[4rem] flex items-start gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: item.color || '#88f5fa',
                        color: '#ffffff',
                      }}
                    >
                      <Tag className="w-4 h-4" />
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                      <Hash className="w-3 h-3 mr-1" />
                      {item.sortOrder}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                    <h3 className="text-base font-bold text-foreground leading-tight mb-2 line-clamp-2">
                      {truncateText(item.name, 30)}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium font-mono">
                        {item.code}
                      </span>
                    </div>
                  </div>
                </div>

                {item.description && (
                  <div className="min-h-[3rem] p-3 bg-muted/20 rounded border-l-2 border-primary/30">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {truncateText(item.description, 80)}
                    </p>
                  </div>
                )}

                {!item.description && (
                  <div className="min-h-[3rem] p-3 bg-muted/20 rounded border-l-2 border-muted/50">
                    <p className="text-xs text-muted-foreground/50 italic">
                      暂无描述信息
                    </p>
                  </div>
                )}

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {item.createdAt
                          ? formatDate(item.createdAt).split(' ')[0]
                          : '未知'}
                      </span>
                    </div>
                    {item.color && (
                      <div className="flex items-center gap-1">
                        <Palette className="w-3 h-3 text-muted-foreground" />
                        <div
                          className="w-4 h-4 rounded border border-border"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground font-mono text-xs">
                          {item.color}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleStatus(item)}
                    className={`h-7 px-2 text-xs ${
                      item.isActive
                        ? 'text-orange-600 hover:bg-orange-50 hover:text-orange-700'
                        : 'text-green-600 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    {item.isActive ? (
                      <ToggleRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ToggleLeft className="w-3 h-3 mr-1" />
                    )}
                    {item.isActive ? '禁用' : '启用'}
                  </Button>

                  <div className="flex items-center gap-1">
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
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
};
