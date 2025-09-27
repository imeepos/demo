import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CompactSearchBar } from '../common/CompactSearchBar';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@sker/ui';
import { X, Filter, Hash } from 'lucide-react';
import { z } from 'zod';
import type { EventTypeSearchParams } from '../../types/event-type';

const eventTypeSearchSchema = z.object({
  keyword: z.string().optional(),
  isActive: z.boolean().optional(),
  sortBy: z.enum(['name', 'createdAt', 'sortOrder']).optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional(),
});

type EventTypeSearchInput = z.infer<typeof eventTypeSearchSchema>;

interface EventTypeSearchFormProps {
  onSearch: (data: EventTypeSearchParams) => void;
  onClear: () => void;
  isSearching?: boolean;
}

export const EventTypeSearchForm: React.FC<EventTypeSearchFormProps> = ({
  onSearch,
  onClear,
  isSearching = false,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<EventTypeSearchInput>({
    resolver: zodResolver(eventTypeSearchSchema),
    defaultValues: {
      keyword: '',
      isActive: undefined,
      sortBy: 'sortOrder',
      sortOrder: 'DESC',
    },
  });

  const watchedValues = watch();

  const hasAdvancedFilters =
    watchedValues.isActive !== undefined ||
    watchedValues.sortBy !== 'sortOrder' ||
    watchedValues.sortOrder !== 'DESC';

  const handleFormSubmit = (data: EventTypeSearchInput) => {
    const filteredData: EventTypeSearchParams = {};

    if (data.keyword && data.keyword.trim()) {
      filteredData.keyword = data.keyword.trim();
    }
    if (data.isActive !== undefined) {
      filteredData.isActive = data.isActive;
    }
    if (data.sortBy) {
      filteredData.sortBy = data.sortBy;
    }
    if (data.sortOrder) {
      filteredData.sortOrder = data.sortOrder;
    }

    onSearch(filteredData);
  };

  const handleClear = useCallback(() => {
    setKeywordSearch('');
    reset({
      keyword: '',
      isActive: undefined,
      sortBy: 'sortOrder',
      sortOrder: 'DESC',
    });
    onClear();
  }, [reset, onClear]);

  const handleKeywordChange = useCallback(
    (value: string) => {
      setKeywordSearch(value);
      setValue('keyword', value);
    },
    [setValue]
  );

  const handleSearch = useCallback(() => {
    handleSubmit(handleFormSubmit)();
  }, [handleSubmit, handleFormSubmit]);

  return (
    <div className="bg-card border border-border/40 rounded-xl shadow-sm p-6">
      <div className="space-y-4">
        <CompactSearchBar
          placeholder="搜索事件类型名称或代码..."
          value={keywordSearch}
          onChange={handleKeywordChange}
          onSearch={handleSearch}
          onClear={handleClear}
          onToggleFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
          showFilters={showAdvancedFilters}
          hasActiveFilters={hasAdvancedFilters}
          isSearching={isSearching}
        />

        {showAdvancedFilters && (
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  筛选条件
                </span>
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  状态筛选
                </Label>
                <Select
                  value={
                    watchedValues.isActive === undefined
                      ? 'all'
                      : watchedValues.isActive.toString()
                  }
                  onValueChange={value => {
                    if (value === 'all') {
                      setValue('isActive', undefined);
                    } else {
                      setValue('isActive', value === 'true');
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="true">启用</SelectItem>
                    <SelectItem value="false">禁用</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  排序字段
                </Label>
                <Select
                  value={watchedValues.sortBy || 'sortOrder'}
                  onValueChange={value =>
                    setValue(
                      'sortBy',
                      value as 'name' | 'createdAt' | 'sortOrder'
                    )
                  }
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="选择排序" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sortOrder">排序权重</SelectItem>
                    <SelectItem value="name">名称</SelectItem>
                    <SelectItem value="createdAt">创建时间</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  排序方向
                </Label>
                <Select
                  value={watchedValues.sortOrder || 'DESC'}
                  onValueChange={value =>
                    setValue('sortOrder', value as 'ASC' | 'DESC')
                  }
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="选择方向" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DESC">降序</SelectItem>
                    <SelectItem value="ASC">升序</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="hidden">
          <input {...register('keyword')} />
          <input {...register('isActive')} />
          <input {...register('sortBy')} />
          <input {...register('sortOrder')} />
        </form>
      </div>
    </div>
  );
};
