import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@sker/ui';
import { Edit, Trash2, Database, FileX } from 'lucide-react';
import React from 'react';
import { DashboardCard } from '../dashboard/DashboardComponents';
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
      <div className="p-16">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <Database className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center space-y-2">
            <div className="text-xl font-light text-foreground">数据加载中</div>
            <div className="text-muted-foreground">正在为您获取最新数据...</div>
          </div>
        </div>
      </div>
    );
  }

  if (safeItems.length === 0) {
    return (
      <div className="p-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full">
            <FileX className="w-16 h-16 text-muted-foreground" />
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-light text-foreground">暂无数据</h3>
            <p className="text-muted-foreground max-w-md">
              还没有任何情感强度配置，点击上方"新建配置"按钮开始创建
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 安全获取数字类型的 intensity
  const safeIntensity = (value: any): number => {
    const num = typeof value === 'number' ? value : parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // 获取强度状态颜色和渐变
  const getIntensityStyle = (
    intensity: number
  ): { color: string; bg: string; badge: string } => {
    if (intensity >= 0.7)
      return {
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        badge: 'bg-gradient-to-r from-emerald-500 to-green-500',
      };
    if (intensity >= 0.4)
      return {
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        badge: 'bg-gradient-to-r from-amber-500 to-orange-500',
      };
    if (intensity >= 0.2)
      return {
        color: 'text-blue-700',
        bg: 'bg-blue-50',
        badge: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      };
    return {
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      badge: 'bg-gradient-to-r from-rose-500 to-pink-500',
    };
  };

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-muted/30 to-muted/50 border-b border-border">
            <TableHead className="font-medium text-foreground py-4 px-6">
              标题
            </TableHead>
            <TableHead className="font-medium text-foreground py-4 px-6">
              强度值
            </TableHead>
            <TableHead className="font-medium text-foreground py-4 px-6">
              描述
            </TableHead>
            <TableHead className="font-medium text-slate-700 py-4 px-6 text-center">
              操作
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeItems.map((item, index) => {
            const intensityValue = safeIntensity(item.intensity);
            const intensityStyle = getIntensityStyle(intensityValue);

            return (
              <TableRow
                key={item.id}
                className="border-b border-border hover:bg-muted/50 transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="py-5 px-6">
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </div>
                </TableCell>

                <TableCell className="py-5 px-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${intensityStyle.badge}`}
                    ></div>
                    <span
                      className={`font-semibold text-lg ${intensityStyle.color}`}
                    >
                      {intensityValue.toFixed(3)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-5 px-6 max-w-xs">
                  <div className="text-muted-foreground truncate">
                    {item.description || '暂无描述'}
                  </div>
                </TableCell>

                <TableCell className="py-5 px-6">
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item)}
                      className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      删除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
