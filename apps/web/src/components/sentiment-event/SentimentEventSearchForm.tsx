import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label } from '@sker/ui';
import { Search, X, Filter, Hash, TrendingUp, Calendar } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DashboardCard } from '../dashboard/DashboardComponents';
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
    <DashboardCard className="mb-8">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">高级搜索</h3>
            <p className="text-sm text-muted-foreground">根据多个条件筛选舆情事件</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3 lg:col-span-3">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  🔍 标题关键词
                </Label>
              </div>
              <Input
                id="title"
                placeholder="输入事件标题关键词进行模糊搜索"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.title ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <Label htmlFor="minScore" className="text-sm font-medium text-foreground">
                  📉 最小情感分数
                </Label>
              </div>
              <Input
                id="minScore"
                type="number"
                min="0"
                max="1"
                step="0.01"
                placeholder="0.00"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.minScore ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('minScore', {
                  setValueAs: value => value === '' ? undefined : parseFloat(value),
                })}
              />
              {errors.minScore && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.minScore.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <Label htmlFor="maxScore" className="text-sm font-medium text-foreground">
                  📈 最大情感分数
                </Label>
              </div>
              <Input
                id="maxScore"
                type="number"
                min="0"
                max="1"
                step="0.01"
                placeholder="1.00"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.maxScore ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('maxScore', {
                  setValueAs: value => value === '' ? undefined : parseFloat(value),
                })}
              />
              {errors.maxScore && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.maxScore.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <Label htmlFor="startTime" className="text-sm font-medium text-foreground">
                  🗺️ 开始时间
                </Label>
              </div>
              <Input
                id="startTime"
                type="datetime-local"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.startTime ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('startTime', {
                  setValueAs: value => value ? new Date(value) : undefined,
                })}
              />
              {errors.startTime && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <Label htmlFor="endTime" className="text-sm font-medium text-foreground">
                  🗺️ 结束时间
                </Label>
              </div>
              <Input
                id="endTime"
                type="datetime-local"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.endTime ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('endTime', {
                  setValueAs: value => value ? new Date(value) : undefined,
                })}
              />
              {errors.endTime && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            {hasValues && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                disabled={isSearching}
                className="border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                清空条件
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isSearching}
              className="bg-tech-gradient hover:shadow-tech text-white font-medium px-6 py-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? '搜索中...' : '开始搜索'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardCard>
  );
};