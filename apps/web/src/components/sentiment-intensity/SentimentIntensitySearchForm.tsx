import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input } from '@sker/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSentimentIntensityStore } from '../../stores/sentiment-intensity-store';
import {
  searchSentimentIntensitySchema,
  type SearchSentimentIntensityInput,
} from '../../types/sentiment-intensity';

interface SentimentIntensitySearchFormProps {
  onSearch: (params: SearchSentimentIntensityInput) => void;
  onClear: () => void;
}

export const SentimentIntensitySearchForm: React.FC<SentimentIntensitySearchFormProps> = ({
  onSearch,
  onClear,
}) => {
  const { searchTitle, searchMinIntensity, searchMaxIntensity } = useSentimentIntensityStore();

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
    <Card className="p-6 mb-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              标题搜索
            </label>
            <Input id="title" placeholder="请输入标题关键词" {...register('title')} />
          </div>
          <div>
            <label htmlFor="minIntensity" className="block text-sm font-medium mb-2">
              最小强度
            </label>
            <Input
              id="minIntensity"
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="最小值 (0-1)"
              {...register('minIntensity', {
                setValueAs: value => (value === '' ? undefined : parseFloat(value)),
              })}
            />
          </div>
          <div>
            <label htmlFor="maxIntensity" className="block text-sm font-medium mb-2">
              最大强度
            </label>
            <Input
              id="maxIntensity"
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="最大值 (0-1)"
              {...register('maxIntensity', {
                setValueAs: value => (value === '' ? undefined : parseFloat(value)),
              })}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            搜索
          </Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            清除
          </Button>
        </div>
      </form>
    </Card>
  );
};
