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
    <div className="bg-card border border-border/40 rounded-xl shadow-sm p-6">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex gap-4 items-end"
      >
        <div className="flex-1">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            智能搜索
          </Label>
          <Input
            id="title"
            placeholder="输入关键词进行搜索..."
            className="h-10"
            {...register('title')}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-10 px-4">
          <Search className="w-4 h-4 mr-2" />
          搜索
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="h-10 px-4"
        >
          <X className="w-4 h-4 mr-2" />
          清空
        </Button>
      </form>
    </div>
  );
};
