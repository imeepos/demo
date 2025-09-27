'use client';

import * as React from 'react';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '../../lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface AdvancedSearchPanelProps {
  searchConfig?: SearchConfig;
  onSearch?: (filters: SearchFilters) => void;
  onSaveSearch?: (search: SavedSearch) => void;
  onLoadSearch?: (searchId: string) => void;
  suggestions?: SearchSuggestion[];
  recentSearches?: SavedSearch[];
  presetFilters?: PresetFilter[];
  className?: string;
  placeholder?: string;
  showAdvanced?: boolean;
  showHistory?: boolean;
  showPresets?: boolean;
}

interface SearchConfig {
  dataSources: DataSourceOption[];
  timeRanges: TimeRangeOption[];
  sentimentTypes: SentimentOption[];
  regions: RegionOption[];
  categories: CategoryOption[];
  languages: LanguageOption[];
}

interface SearchFilters {
  keyword: string;
  dataSources: string[];
  timeRange: {
    start: Date;
    end: Date;
    preset?: string;
  };
  sentiments: string[];
  regions: string[];
  categories: string[];
  languages: string[];
  advanced: {
    exactMatch: boolean;
    excludeKeywords: string[];
    minEngagement: number;
    hasImages: boolean;
    hasVideos: boolean;
    authorVerified: boolean;
  };
}

interface SearchSuggestion {
  type: 'keyword' | 'entity' | 'topic' | 'hashtag';
  value: string;
  label: string;
  frequency?: number;
  category?: string;
}

interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  timestamp: Date;
  resultCount?: number;
  isPublic?: boolean;
}

interface PresetFilter {
  id: string;
  name: string;
  description: string;
  filters: Partial<SearchFilters>;
  icon?: string;
  category: string;
}

interface DataSourceOption {
  id: string;
  name: string;
  type: 'news' | 'social' | 'forum' | 'video' | 'blog';
  enabled: boolean;
  icon?: string;
}

interface TimeRangeOption {
  id: string;
  name: string;
}

interface SentimentOption {
  id: string;
  name: string;
}

interface RegionOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

interface LanguageOption {
  id: string;
  name: string;
}

const AdvancedSearchPanel = forwardRef<
  HTMLDivElement,
  AdvancedSearchPanelProps
>(
  (
    {
      searchConfig,
      onSearch,
      onSaveSearch,
      onLoadSearch,
      suggestions = [],
      recentSearches = [],
      presetFilters = [],
      className,
      placeholder = '搜索舆情信息...',
      showAdvanced = true,
      showHistory = true,
      showPresets = true,
      ...props
    },
    ref
  ) => {
    const [filters, setFilters] = useState<SearchFilters>({
      keyword: '',
      dataSources: [],
      timeRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
        preset: '7d',
      },
      sentiments: [],
      regions: [],
      categories: [],
      languages: ['zh'],
      advanced: {
        exactMatch: false,
        excludeKeywords: [],
        minEngagement: 0,
        hasImages: false,
        hasVideos: false,
        authorVerified: false,
      },
    });

    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [commandOpen, setCommandOpen] = useState(false);

    const form = useForm<SearchFilters>({
      defaultValues: filters,
    });

    const handleSearch = async () => {
      setIsSearching(true);
      try {
        await onSearch?.(filters);
      } finally {
        setIsSearching(false);
      }
    };

    const updateFilters = (updates: Partial<SearchFilters>) => {
      const newFilters = { ...filters, ...updates };
      setFilters(newFilters);
      form.reset(newFilters);
    };

    const addFilterTag = (type: keyof SearchFilters, value: string) => {
      if (
        type === 'dataSources' ||
        type === 'sentiments' ||
        type === 'regions' ||
        type === 'categories' ||
        type === 'languages'
      ) {
        const current = filters[type] as string[];
        if (!current.includes(value)) {
          updateFilters({ [type]: [...current, value] });
        }
      }
    };

    const removeFilterTag = (type: keyof SearchFilters, value: string) => {
      if (
        type === 'dataSources' ||
        type === 'sentiments' ||
        type === 'regions' ||
        type === 'categories' ||
        type === 'languages'
      ) {
        const current = filters[type] as string[];
        updateFilters({ [type]: current.filter(item => item !== value) });
      }
    };

    const clearAllFilters = () => {
      updateFilters({
        keyword: '',
        dataSources: [],
        sentiments: [],
        regions: [],
        categories: [],
        languages: ['zh'],
        advanced: {
          exactMatch: false,
          excludeKeywords: [],
          minEngagement: 0,
          hasImages: false,
          hasVideos: false,
          authorVerified: false,
        },
      });
    };

    const handleSaveSearch = () => {
      const savedSearch: SavedSearch = {
        id: Date.now().toString(),
        name: filters.keyword || '未命名搜索',
        filters,
        timestamp: new Date(),
      };
      onSaveSearch?.(savedSearch);
    };

    const renderFilterTags = () => {
      const tags: React.ReactNode[] = [];

      filters.dataSources.forEach(source => {
        const sourceConfig = searchConfig?.dataSources.find(
          s => s.id === source
        );
        if (sourceConfig) {
          tags.push(
            <Badge
              key={`source-${source}`}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeFilterTag('dataSources', source)}
            >
              {sourceConfig.icon} {sourceConfig.name} ×
            </Badge>
          );
        }
      });

      filters.sentiments.forEach(sentiment => {
        const sentimentConfig = searchConfig?.sentimentTypes.find(
          s => s.id === sentiment
        );
        if (sentimentConfig) {
          tags.push(
            <Badge
              key={`sentiment-${sentiment}`}
              variant="outline"
              className="cursor-pointer"
              onClick={() => removeFilterTag('sentiments', sentiment)}
            >
              {sentimentConfig.name} ×
            </Badge>
          );
        }
      });

      if (filters.timeRange.preset) {
        const timeConfig = searchConfig?.timeRanges.find(
          t => t.id === filters.timeRange.preset
        );
        if (timeConfig) {
          tags.push(
            <Badge key="timerange" variant="outline">
              {timeConfig.name}
            </Badge>
          );
        }
      }

      return tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            清空全部
          </Button>
        </div>
      ) : null;
    };

    return (
      <div className={cn('w-full space-y-4', className)} ref={ref} {...props}>
        <div className="space-y-3">
          <Popover open={commandOpen} onOpenChange={setCommandOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  placeholder={placeholder}
                  value={filters.keyword}
                  onChange={e => updateFilters({ keyword: e.target.value })}
                  onFocus={() => setCommandOpen(true)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? '⏳' : '🔍'}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-80">
              <Command>
                <CommandInput placeholder="搜索建议..." />
                <CommandList>
                  <CommandEmpty>暂无搜索建议</CommandEmpty>

                  {suggestions.length > 0 && (
                    <CommandGroup heading="搜索建议">
                      {suggestions.slice(0, 5).map((suggestion, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => {
                            updateFilters({ keyword: suggestion.value });
                            setCommandOpen(false);
                          }}
                        >
                          <span className="mr-2">
                            {suggestion.type === 'keyword' && '📝'}
                            {suggestion.type === 'entity' && '🏢'}
                            {suggestion.type === 'topic' && '💬'}
                            {suggestion.type === 'hashtag' && '#'}
                          </span>
                          {suggestion.label}
                          {suggestion.frequency && (
                            <Badge
                              variant="outline"
                              className="ml-auto text-xs"
                            >
                              {suggestion.frequency}
                            </Badge>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {showHistory && recentSearches.length > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup heading="历史搜索">
                        {recentSearches.slice(0, 3).map(search => (
                          <CommandItem
                            key={search.id}
                            onSelect={() => {
                              updateFilters(search.filters);
                              setCommandOpen(false);
                              onLoadSearch?.(search.id);
                            }}
                          >
                            <span className="mr-2">⏱️</span>
                            {search.name}
                            <Badge
                              variant="outline"
                              className="ml-auto text-xs"
                            >
                              {search.timestamp.toLocaleDateString()}
                            </Badge>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}

                  {showPresets && presetFilters.length > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup heading="预设筛选">
                        {presetFilters.slice(0, 3).map(preset => (
                          <CommandItem
                            key={preset.id}
                            onSelect={() => {
                              updateFilters(preset.filters);
                              setCommandOpen(false);
                            }}
                          >
                            <span className="mr-2">{preset.icon || '🔧'}</span>
                            {preset.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex flex-wrap gap-2">
            {searchConfig?.dataSources.slice(0, 4).map(source => (
              <Button
                key={source.id}
                variant={
                  filters.dataSources.includes(source.id)
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                onClick={() => {
                  if (filters.dataSources.includes(source.id)) {
                    removeFilterTag('dataSources', source.id);
                  } else {
                    addFilterTag('dataSources', source.id);
                  }
                }}
              >
                {source.icon} {source.name}
              </Button>
            ))}

            {showAdvanced && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              >
                高级筛选 {showAdvancedOptions ? '⬆️' : '⬇️'}
              </Button>
            )}
          </div>

          {renderFilterTags()}
        </div>

        {showAdvanced && (
          <Collapsible
            open={showAdvancedOptions}
            onOpenChange={setShowAdvancedOptions}
          >
            <CollapsibleContent className="space-y-4">
              <Separator />

              <Form {...form}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="timeRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>时间范围</FormLabel>
                        <Select
                          value={filters.timeRange.preset}
                          onValueChange={value => {
                            const timeConfig = searchConfig?.timeRanges.find(
                              t => t.id === value
                            );
                            if (timeConfig) {
                              updateFilters({
                                timeRange: {
                                  ...filters.timeRange,
                                  preset: value,
                                },
                              });
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择时间范围" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {searchConfig?.timeRanges.map(range => (
                              <SelectItem key={range.id} value={range.id}>
                                {range.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sentiments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>情感类型</FormLabel>
                        <div className="space-y-2">
                          {searchConfig?.sentimentTypes.map(sentiment => (
                            <div
                              key={sentiment.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                checked={filters.sentiments.includes(
                                  sentiment.id
                                )}
                                onCheckedChange={checked => {
                                  if (checked) {
                                    addFilterTag('sentiments', sentiment.id);
                                  } else {
                                    removeFilterTag('sentiments', sentiment.id);
                                  }
                                }}
                              />
                              <label className="text-sm">
                                {sentiment.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="regions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>地区</FormLabel>
                        <Select
                          onValueChange={value =>
                            addFilterTag('regions', value)
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择地区" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {searchConfig?.regions.map(region => (
                              <SelectItem key={region.id} value={region.id}>
                                {region.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">高级选项</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.advanced.exactMatch}
                        onCheckedChange={checked =>
                          updateFilters({
                            advanced: {
                              ...filters.advanced,
                              exactMatch: !!checked,
                            },
                          })
                        }
                      />
                      <label className="text-sm">精确匹配</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.advanced.hasImages}
                        onCheckedChange={checked =>
                          updateFilters({
                            advanced: {
                              ...filters.advanced,
                              hasImages: !!checked,
                            },
                          })
                        }
                      />
                      <label className="text-sm">包含图片</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.advanced.hasVideos}
                        onCheckedChange={checked =>
                          updateFilters({
                            advanced: {
                              ...filters.advanced,
                              hasVideos: !!checked,
                            },
                          })
                        }
                      />
                      <label className="text-sm">包含视频</label>
                    </div>
                  </div>
                </div>
              </Form>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? '搜索中...' : '搜索'}
            </Button>
            <Button variant="outline" onClick={handleSaveSearch}>
              保存搜索
            </Button>
          </div>

          <Button variant="ghost" onClick={clearAllFilters}>
            重置
          </Button>
        </div>
      </div>
    );
  }
);

AdvancedSearchPanel.displayName = 'AdvancedSearchPanel';

export { AdvancedSearchPanel };
export type {
  AdvancedSearchPanelProps,
  SearchConfig,
  SearchFilters,
  SearchSuggestion,
  SavedSearch,
  PresetFilter,
  DataSourceOption,
  TimeRangeOption,
  SentimentOption,
  RegionOption,
  CategoryOption,
  LanguageOption,
};
