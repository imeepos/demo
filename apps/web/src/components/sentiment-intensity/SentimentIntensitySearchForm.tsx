import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label } from '@sker/ui';
import { Search, Filter, X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DashboardCard } from '../dashboard/DashboardComponents';
import { useSentimentIntensityStore } from '../../stores/sentiment-intensity-store';
import {
  searchSentimentIntensitySchema,
  type SearchSentimentIntensityInput,
} from '../../types/sentiment-intensity';

interface SentimentIntensitySearchFormProps {
  onSearch: (params: SearchSentimentIntensityInput) => void;
  onClear: () => void;
}

export const SentimentIntensitySearchForm: React.FC<
  SentimentIntensitySearchFormProps
> = ({ onSearch, onClear }) => {
  const { searchTitle, searchMinIntensity, searchMaxIntensity } =
    useSentimentIntensityStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchSentimentIntensityInput>({
    resolver: zodResolver(searchSentimentIntensitySchema),
    defaultValues: {
      title: searchTitle,
      minIntensity: searchMinIntensity || undefined,
      maxIntensity: searchMaxIntensity || undefined,
    },
  });

  const handleFormSubmit = (data: SearchSentimentIntensityInput) => {
    onSearch(data);
  };

  const handleClear = () => {
    reset({ title: '', minIntensity: undefined, maxIntensity: undefined });
    onClear();
  };

  return (
    <DashboardCard className="mb-8">
      <div className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-foreground"
              >
                🔍 标题关键词
              </Label>
              <Input
                id="title"
                placeholder="输入标题关键词进行模糊搜索"
                className="border-border focus:border-primary focus:ring-primary/20"
                {...register('title')}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="minIntensity"
                className="text-sm font-medium text-foreground"
              >
                📉 最小强度值
              </Label>
              <Input
                id="minIntensity"
                type="number"
                min="0"
                max="1"
                step="0.01"
                placeholder="0.00 - 1.00"
                className="border-border focus:border-primary focus:ring-primary/20"
                {...register('minIntensity', {
                  setValueAs: value =>
                    value === '' ? undefined : parseFloat(value),
                })}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="maxIntensity"
                className="text-sm font-medium text-foreground"
              >
                📈 最大强度值
              </Label>
              <Input
                id="maxIntensity"
                type="number"
                min="0"
                max="1"
                step="0.01"
                placeholder="0.00 - 1.00"
                className="border-border focus:border-primary focus:ring-primary/20"
                {...register('maxIntensity', {
                  setValueAs: value =>
                    value === '' ? undefined : parseFloat(value),
                })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4 mr-2" />
              {isSubmitting ? '搜索中...' : '开始搜索'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              清空条件
            </Button>
          </div>
        </form>
      </div>
    </DashboardCard>
  );
};
