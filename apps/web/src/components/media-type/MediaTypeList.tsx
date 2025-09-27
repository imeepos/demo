/**
 * 媒体类型数据列表组件
 *
 * 设计理念：
 * - 优雅的表格展示
 * - 渐进式动画效果
 * - 直观的操作按钮
 * - 完善的加载与空状态
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@sker/ui';
import { Edit, Trash2, Database, FileX, Code, Tag } from 'lucide-react';
import React from 'react';
import type { MediaTypeListProps } from '../../types/media-type';

export const MediaTypeList: React.FC<MediaTypeListProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
}) => {
  // 确保 items 是数组
  const safeItems = Array.isArray(items) ? items : [];

  if (isLoading) {
    return (
      <div className="p-8">
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
              正在获取媒体类型信息...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (safeItems.length === 0) {
    return (
      <div className="p-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="p-4 bg-muted/30 rounded-full">
            <FileX className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              暂无媒体类型
            </h3>
            <p className="text-muted-foreground max-w-md">
              尚未创建任何媒体类型，点击"新建配置"按钮开始创建第一个类型分类
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 border-b border-border">
            <TableHead className="font-medium text-foreground py-3 px-4">
              代码
            </TableHead>
            <TableHead className="font-medium text-foreground py-3 px-4">
              名称
            </TableHead>
            <TableHead className="font-medium text-foreground py-3 px-4">
              描述
            </TableHead>
            <TableHead className="font-medium text-foreground py-3 px-4 text-center">
              操作
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeItems.map((item, index) => {
            return (
              <TableRow
                key={item.id}
                className="border-b border-border hover:bg-muted/30 transition-all duration-200"
              >
                {/* 代码列 */}
                <TableCell className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-primary/10 rounded">
                      <Tag className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-mono text-sm font-medium text-foreground">
                      {item.code}
                    </span>
                  </div>
                </TableCell>

                {/* 名称列 */}
                <TableCell className="py-4 px-4">
                  <div className="font-medium text-foreground">{item.name}</div>
                </TableCell>

                {/* 描述列 */}
                <TableCell className="py-4 px-4 max-w-xs">
                  <div
                    className="text-muted-foreground truncate"
                    title={item.description || '暂无描述'}
                  >
                    {item.description || (
                      <span className="text-muted-foreground/50 italic">
                        暂无描述
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* 操作列 */}
                <TableCell className="py-4 px-4">
                  <div className="flex gap-1 justify-center">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
