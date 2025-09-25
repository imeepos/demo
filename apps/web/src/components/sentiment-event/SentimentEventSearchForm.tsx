import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input, Label } from '@sker/ui';
import { Search, X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  querySentimentEventSchema,
  type QuerySentimentEventInput,
} from '../../types/sentiment-event';

interface SentimentEventSearchFormProps {
  onSearch: (data: QuerySentimentEventInput) => void;
  onClear: () => void;
  isSearching?: boolean;
}

export const SentimentEventSearchForm: React.FC<SentimentEventSearchFormProps> = ({
  onSearch,
  onClear,
  isSearching = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
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
  const hasValues = Object.values(watchedValues).some(value => 
    value !== undefined && value !== '' && value !== null
  );

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

  const handleClear = () => {
    reset({
      title: '',
      minScore: undefined,
      maxScore: undefined,
      startTime: undefined,
      endTime: undefined,
    });
    onClear();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium">搜索舆情事件</h3>
      </div>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">标题关键词</Label>
            <Input
              id="title"
              placeholder="输入标题关键词进行模糊搜索"
              {...register('title')}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="minScore">最小情感分数</Label>
            <Input
              id="minScore"
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.00 - 1.00"
              {...register('minScore', {
                setValueAs: value => value === '' ? undefined : parseFloat(value),
              })}
              className={errors.minScore ? 'border-red-500' : ''}
            />
            {errors.minScore && (
              <p className="text-sm text-red-500">{errors.minScore.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxScore">最大情感分数</Label>
            <Input
              id="maxScore"
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.00 - 1.00"
              {...register('maxScore', {
                setValueAs: value => value === '' ? undefined : parseFloat(value),
              })}
              className={errors.maxScore ? 'border-red-500' : ''}
            />
            {errors.maxScore && (
              <p className="text-sm text-red-500">{errors.maxScore.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">开始时间</Label>
            <Input
              id="startTime"
              type="datetime-local"
              {...register('startTime', {
                setValueAs: value => value ? new Date(value) : undefined,
              })}
              className={errors.startTime ? 'border-red-500' : ''}
            />
            {errors.startTime && (
              <p className="text-sm text-red-500">{errors.startTime.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">结束时间</Label>
            <Input
              id="endTime"
              type="datetime-local"
              {...register('endTime', {
                setValueAs: value => value ? new Date(value) : undefined,
              })}
              className={errors.endTime ? 'border-red-500' : ''}
            />
            {errors.endTime && (
              <p className="text-sm text-red-500">{errors.endTime.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {hasValues && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={isSearching}
            >
              <X className="w-4 h-4 mr-2" />
              清空
            </Button>
          )}
          <Button type="submit" disabled={isSearching}>
            <Search className="w-4 h-4 mr-2" />
            {isSearching ? '搜索中...' : '搜索'}
          </Button>
        </div>
      </form>
    </Card>
  );
};