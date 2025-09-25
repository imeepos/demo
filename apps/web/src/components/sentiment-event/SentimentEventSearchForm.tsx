import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CompactSearchBar } from '../common/CompactSearchBar';
import { Button, Input, Label } from '@sker/ui';
import { ChevronDown, ChevronUp, X, Calendar, TrendingUp } from 'lucide-react';
import {
  querySentimentEventSchema,
  type QuerySentimentEventInput,
} from '../../types/sentiment-event';

interface SentimentEventSearchFormProps {
  onSearch: (data: QuerySentimentEventInput) => void;
  onClear: () => void;
  isSearching?: boolean;
}

export const SentimentEventSearchForm: React.FC<
  SentimentEventSearchFormProps
> = ({ onSearch, onClear, isSearching = false }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [titleSearch, setTitleSearch] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<QuerySentimentEventInput>({
    resolver: zodResolver(querySentimentEventSchema),
    defaultValues: {
      title: '',
      minScore: undefined,
      maxScore: undefined,
      startTime: undefined,
      endTime: undefined,
    },
  });

  const watchedValues = watch();

  const hasAdvancedFilters =
    watchedValues.minScore !== undefined ||
    watchedValues.maxScore !== undefined ||
    watchedValues.startTime !== undefined ||
    watchedValues.endTime !== undefined;

  const handleFormSubmit = (data: QuerySentimentEventInput) => {
    // 过滤掉空值
    const filteredData: QuerySentimentEventInput = {};

    if (data.title && data.title.trim()) {
      filteredData.title = data.title.trim();
    }
    if (data.minScore !== undefined && data.minScore !== null) {
      filteredData.minScore = data.minScore;
    }
    if (data.maxScore !== undefined && data.maxScore !== null) {
      filteredData.maxScore = data.maxScore;
    }
    if (data.startTime) {
      filteredData.startTime = data.startTime;
    }
    if (data.endTime) {
      filteredData.endTime = data.endTime;
    }

    onSearch(filteredData);
  };

  const handleClear = useCallback(() => {
    setTitleSearch('');
    reset({
      title: '',
      minScore: undefined,
      maxScore: undefined,
      startTime: undefined,
      endTime: undefined,
    });
    onClear();
  }, [reset, onClear]);

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitleSearch(value);
      setValue('title', value);
    },
    [setValue]
  );

  const handleSearch = useCallback(() => {
    handleSubmit(handleFormSubmit)();
  }, [handleSubmit]);

  // 快捷时间选择
  const handleQuickDateSelect = useCallback(
    (type: 'today' | 'week' | 'month') => {
      const now = new Date();
      const start = new Date();

      switch (type) {
        case 'today':
          start.setHours(0, 0, 0, 0);
          break;
        case 'week':
          start.setDate(now.getDate() - 7);
          start.setHours(0, 0, 0, 0);
          break;
        case 'month':
          start.setMonth(now.getMonth() - 1);
          start.setHours(0, 0, 0, 0);
          break;
      }

      setValue('startTime', start);
      setValue('endTime', now);
    },
    [setValue]
  );

  return (
    <div className="space-y-4 mb-8">
      {/* 主搜索栏 */}
      <CompactSearchBar
        placeholder="搜索舆情事件标题..."
        value={titleSearch}
        onChange={handleTitleChange}
        onSearch={handleSearch}
        onClear={handleClear}
        onToggleFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
        showFilters={showAdvancedFilters}
        hasActiveFilters={hasAdvancedFilters}
        isSearching={isSearching}
      />

      {/* 简化的高级筛选 */}
      {showAdvancedFilters && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">
              筛选条件
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedFilters(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* 快捷时间选择 */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">
                时间范围
              </Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'today', label: '今天' },
                  { key: 'week', label: '近7天' },
                  { key: 'month', label: '近30天' },
                ].map(({ key, label }) => (
                  <Button
                    key={key}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleQuickDateSelect(key as 'today' | 'week' | 'month')
                    }
                    className="text-xs h-7 px-3"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 情感分数 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="minScore"
                  className="text-xs text-muted-foreground"
                >
                  最小分数
                </Label>
                <Input
                  id="minScore"
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  placeholder="0.0"
                  className="mt-1 text-sm h-8"
                  {...register('minScore', {
                    setValueAs: value =>
                      value === '' ? undefined : parseFloat(value),
                  })}
                />
              </div>
              <div>
                <Label
                  htmlFor="maxScore"
                  className="text-xs text-muted-foreground"
                >
                  最大分数
                </Label>
                <Input
                  id="maxScore"
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  placeholder="1.0"
                  className="mt-1 text-sm h-8"
                  {...register('maxScore', {
                    setValueAs: value =>
                      value === '' ? undefined : parseFloat(value),
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 隐藏的表单处理 */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="hidden">
        <input {...register('title')} />
        <input {...register('minScore')} />
        <input {...register('maxScore')} />
        <input {...register('startTime')} />
        <input {...register('endTime')} />
      </form>
    </div>
  );
};
