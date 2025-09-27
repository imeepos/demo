/**
 * 媒体类型搜索表单组件
 *
 * 设计理念：
 * - 极简优雅的搜索体验
 * - 实时搜索与状态同步
 * - 完美的视觉平衡
 * - 直观的交互反馈
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@sker/ui';
import { Search, X, Filter } from 'lucide-react';
import type {
  MediaTypeSearchFormProps,
  SearchMediaTypeInput,
} from '../../types/media-type';
import { MEDIA_TYPE_CODE_OPTIONS } from '../../types/media-type';

export const MediaTypeSearchForm: React.FC<MediaTypeSearchFormProps> = ({
  onSearch,
  onClear,
}) => {
  const [formData, setFormData] = useState<SearchMediaTypeInput>({
    name: '',
    code: '',
  });

  const [isSearching, setIsSearching] = useState(false);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name?.trim() &&
      !(formData.code?.trim() && formData.code.trim() !== 'all')
    ) {
      return;
    }

    setIsSearching(true);

    try {
      const searchParams: SearchMediaTypeInput = {};

      if (formData.name?.trim()) {
        searchParams.name = formData.name.trim();
      }

      if (formData.code?.trim() && formData.code.trim() !== 'all') {
        searchParams.code = formData.code.trim();
      }

      await onSearch(searchParams);
    } finally {
      setIsSearching(false);
    }
  };

  // 处理清除搜索
  const handleClear = () => {
    setFormData({
      name: '',
      code: '',
    });
    onClear();
  };

  // 处理输入变化
  const handleInputChange = (
    field: keyof SearchMediaTypeInput,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 检查是否有搜索条件
  const hasSearchConditions =
    formData.name?.trim() ||
    (formData.code?.trim() && formData.code.trim() !== 'all');

  // 实时搜索 - 当输入停止后300ms自动搜索
  useEffect(() => {
    if (!hasSearchConditions) {
      onClear();
      return;
    }

    const timer = setTimeout(() => {
      const searchParams: SearchMediaTypeInput = {};

      if (formData.name?.trim()) {
        searchParams.name = formData.name.trim();
      }

      if (formData.code?.trim() && formData.code.trim() !== 'all') {
        searchParams.code = formData.code.trim();
      }

      onSearch(searchParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.name, formData.code, hasSearchConditions, onClear, onSearch]);

  return (
    <div className="bg-card border border-border/40 rounded-xl shadow-sm p-6">
      {/* 搜索标题 */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Filter className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">搜索筛选</h3>
          <p className="text-muted-foreground text-sm">
            按名称或代码快速查找媒体类型
          </p>
        </div>
      </div>

      {/* 搜索表单 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 按名称搜索 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              按名称搜索
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                value={formData.name || ''}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="输入媒体类型名称..."
                className="pl-10 h-10 rounded-lg"
              />
            </div>
          </div>

          {/* 按代码搜索 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              按代码搜索
            </label>
            <Select
              value={formData.code || ''}
              onValueChange={value => handleInputChange('code', value)}
            >
              <SelectTrigger className="h-10 rounded-lg">
                <SelectValue placeholder="选择媒体类型代码..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部代码</SelectItem>
                {MEDIA_TYPE_CODE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} ({option.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-3">
            <Button
              type="submit"
              disabled={!hasSearchConditions || isSearching}
              className="px-6 py-2 rounded-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? '搜索中...' : '搜索'}
            </Button>

            {hasSearchConditions && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="px-4 py-2 rounded-lg"
              >
                <X className="w-4 h-4 mr-2" />
                清除
              </Button>
            )}
          </div>

          {/* 搜索状态指示 */}
          {hasSearchConditions && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>已应用搜索条件</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
