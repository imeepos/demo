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
    <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-8 shadow-2xl shadow-slate-200/50">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex gap-6 items-end"
      >
        <div className="flex-1">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-slate-700 mb-3 block"
          >
            🔍 智能搜索
          </Label>
          <Input
            id="title"
            placeholder="输入关键词进行搜索..."
            className="border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 text-slate-700 placeholder:text-slate-400 bg-white/80 backdrop-blur-sm transition-all duration-300"
            {...register('title')}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium px-8 py-3 rounded-2xl shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:shadow-purple-300/40 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 h-12"
        >
          <Search className="w-4 h-4 mr-2" />
          搜索
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl h-12 px-6 transition-all duration-300"
        >
          <X className="w-4 h-4 mr-2" />
          清空
        </Button>
      </form>
    </div>
  );
};
