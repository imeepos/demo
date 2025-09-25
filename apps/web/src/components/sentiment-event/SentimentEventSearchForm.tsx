import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { AdvancedFilters } from '../common/AdvancedFilters';
import { CompactSearchBar } from '../common/CompactSearchBar';
import { QuickDateRange, type DateRange } from '../common/QuickDateRange';
import { RangeSlider } from '../common/RangeSlider';
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
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 1]);

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
    setScoreRange([0, 1]);
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

  const handleQuickDateSelect = useCallback(
    (range: DateRange) => {
      if (range.startTime) {
        setValue('startTime', range.startTime);
      } else {
        setValue('startTime', undefined);
      }
      if (range.endTime) {
        setValue('endTime', range.endTime);
      } else {
        setValue('endTime', undefined);
      }
    },
    [setValue]
  );

  const handleScoreRangeChange = useCallback(
    (range: [number, number]) => {
      setScoreRange(range);
      setValue('minScore', range[0] === 0 ? undefined : range[0]);
      setValue('maxScore', range[1] === 1 ? undefined : range[1]);
    },
    [setValue]
  );

  const handleSearch = useCallback(() => {
    handleSubmit(handleFormSubmit)();
  }, [handleSubmit]);

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

      {/* 高级筛选区域 */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
        register={register}
        errors={errors}
        onClear={handleClear}
        hasActiveFilters={hasAdvancedFilters}
      />

      {/* 快捷时间选择和情感分数滑块 - 仅在展开时显示 */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickDateRange onSelect={handleQuickDateSelect} />
          <RangeSlider
            label="情感分数范围"
            min={0}
            max={1}
            step={0.01}
            value={scoreRange}
            onChange={handleScoreRangeChange}
            formatValue={v => v.toFixed(2)}
          />
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
