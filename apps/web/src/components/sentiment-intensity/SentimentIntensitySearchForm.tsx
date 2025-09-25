import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Card } from '@sker/ui';
import {
  searchSentimentIntensitySchema,
  type SearchSentimentIntensityInput,
} from '../../types/sentiment-intensity';
import { useSentimentIntensityStore } from '../../stores/sentiment-intensity-store';

interface SentimentIntensitySearchFormProps {
  onSearch: (params: SearchSentimentIntensityInput) => void;
  onClear: () => void;
}

export const SentimentIntensitySearchForm: React.FC<SentimentIntensitySearchFormProps> = ({
  onSearch,
  onClear,
}) => {
  const { searchTitle, searchIntensity } = useSentimentIntensityStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchSentimentIntensityInput>({
    resolver: zodResolver(searchSentimentIntensitySchema),
    defaultValues: {
      title: searchTitle,
      intensity: searchIntensity || undefined,
    },
  });

  const handleFormSubmit = (data: SearchSentimentIntensityInput) => {
    onSearch(data);
  };

  const handleClear = () => {
    reset({ title: '', intensity: undefined });
    onClear();
  };

  return (
    <Card className="p-6 mb-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              标题搜索
            </label>
            <Input id="title" placeholder="请输入标题关键词" {...register('title')} />
          </div>
          <div>
            <label htmlFor="intensity" className="block text-sm font-medium mb-2">
              强度值
            </label>
            <Input
              id="intensity"
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="请输入强度值 (0-1)"
              {...register('intensity', {
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
