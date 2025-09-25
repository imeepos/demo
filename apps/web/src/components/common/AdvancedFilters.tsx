import { Button, Input, Label } from '@sker/ui';
import { ChevronUp, ChevronDown, X, TrendingUp, Calendar } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { QuerySentimentEventInput } from '../../types/sentiment-event';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  register: UseFormRegister<QuerySentimentEventInput>;
  errors: FieldErrors<QuerySentimentEventInput>;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onToggle,
  register,
  errors,
  onClear,
  hasActiveFilters,
}) => {
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 1]);

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const getQuickDateRange = (type: 'today' | 'week' | 'month') => {
    const now = new Date();
    const start = new Date();

    switch (type) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        start.setDate(now.getDate() - 7);
        break;
      case 'month':
        start.setMonth(now.getMonth() - 1);
        break;
    }

    return {
      startTime: formatDate(start),
      endTime: formatDate(now),
    };
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300">
      {/* 折叠标题栏 */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium text-foreground">高级筛选</span>
          {hasActiveFilters && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-xs text-primary">已启用</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation();
                onClear();
              }}
              className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              清空
            </Button>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* 筛选内容 */}
      {isOpen && (
        <div className="border-t border-border p-3 md:p-4 space-y-4 bg-background/50">
          {/* 情感分数范围 - 滑块 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium text-foreground">
                情感分数范围
              </Label>
              <span className="text-xs text-muted-foreground">
                ({scoreRange[0].toFixed(2)} - {scoreRange[1].toFixed(2)})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                min={0}
                max={1}
                step={0.01}
                placeholder="0.00"
                className="text-sm"
                {...register('minScore', {
                  setValueAs: value =>
                    value === '' ? undefined : parseFloat(value),
                  onChange: e => {
                    const val = parseFloat(e.target.value) || 0;
                    setScoreRange([val, scoreRange[1]]);
                  },
                })}
              />
              <Input
                type="number"
                min={0}
                max={1}
                step={0.01}
                placeholder="1.00"
                className="text-sm"
                {...register('maxScore', {
                  setValueAs: value =>
                    value === '' ? undefined : parseFloat(value),
                  onChange: e => {
                    const val = parseFloat(e.target.value) || 1;
                    setScoreRange([scoreRange[0], val]);
                  },
                })}
              />
            </div>
            {(errors.minScore || errors.maxScore) && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <X className="w-3 h-3" />
                分数范围无效
              </p>
            )}
          </div>

          {/* 时间范围 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium text-foreground">
                时间范围
              </Label>
            </div>

            {/* 快捷时间选择 */}
            <div className="flex gap-2 mb-3">
              {[
                { key: 'today', label: '今天' },
                { key: 'week', label: '最近7天' },
                { key: 'month', label: '最近30天' },
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-3 border-border hover:border-primary hover:text-primary transition-colors"
                  onClick={() => {
                    // 这里需要通过其他方式设置表单值，因为register不支持程序化设置
                    console.log('Quick date selected:', key);
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="startTime"
                  className="text-xs text-muted-foreground"
                >
                  开始时间
                </Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  className="text-sm"
                  {...register('startTime', {
                    setValueAs: value => (value ? new Date(value) : undefined),
                  })}
                />
                {errors.startTime && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <X className="w-2 h-2" />
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endTime"
                  className="text-xs text-muted-foreground"
                >
                  结束时间
                </Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  className="text-sm"
                  {...register('endTime', {
                    setValueAs: value => (value ? new Date(value) : undefined),
                  })}
                />
                {errors.endTime && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <X className="w-2 h-2" />
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
