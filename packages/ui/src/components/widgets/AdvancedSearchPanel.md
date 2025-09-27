# AdvancedSearchPanel - 高级搜索面板组件

## 📋 组件概述

AdvancedSearchPanel 是专为舆情系统设计的智能搜索组件，提供多条件组合搜索、实时建议、历史记录等功能。支持复杂的搜索逻辑和过滤条件，帮助用户精准定位目标信息。

### 核心业务场景

- 舆情信息精准检索
- 多维度条件组合筛选
- 智能搜索建议和补全
- 搜索历史管理

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Command: 智能搜索和命令面板
- Form: 搜索条件表单容器
- Input: 关键词输入框
- Select: 下拉选择器
- Calendar: 时间范围选择
- Badge: 搜索标签和筛选条件
- Button: 搜索和清除操作
- Checkbox: 多选筛选条件
- Separator: 内容区域分隔
```

### 视觉一致性要求

- 清晰的搜索流程引导
- 统一的表单样式和间距
- 直观的条件标签展示
- 响应式布局适配

### 交互行为规范

- 实时搜索建议和匹配
- 条件标签的添加和移除
- 搜索历史的快速复用
- 高级条件的展开折叠

## 🔧 核心用途

### 主要功能

1. **智能搜索**: 关键词自动补全和建议
2. **条件筛选**: 多维度筛选条件组合
3. **历史记录**: 搜索历史保存和复用
4. **快速操作**: 预设搜索和快捷标签

### 适用业务场景

- 舆情信息检索
- 媒体内容筛选
- 数据分析查询
- 报告数据提取

### 用户交互流程

1. 输入关键词获取搜索建议
2. 添加筛选条件细化结果
3. 保存常用搜索组合
4. 查看和复用历史搜索
5. 导出搜索结果

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
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
import { Calendar } from '../ui/calendar';
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
```

### TypeScript 接口定义

```typescript
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
```

### 关键实现逻辑

```typescript
const AdvancedSearchPanel = forwardRef<HTMLDivElement, AdvancedSearchPanelProps>(
  ({
    searchConfig,
    onSearch,
    onSaveSearch,
    onLoadSearch,
    suggestions = [],
    recentSearches = [],
    presetFilters = [],
    className,
    placeholder = "搜索舆情信息...",
    showAdvanced = true,
    showHistory = true,
    showPresets = true,
    ...props
  }, ref) => {
    const [filters, setFilters] = useState<SearchFilters>({
      keyword: '',
      dataSources: [],
      timeRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
        preset: '7d'
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
        authorVerified: false
      }
    });

    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [commandOpen, setCommandOpen] = useState(false);

    const form = useForm<SearchFilters>({
      defaultValues: filters,
    });

    // 处理搜索提交
    const handleSearch = async () => {
      setIsSearching(true);
      try {
        await onSearch?.(filters);
      } finally {
        setIsSearching(false);
      }
    };

    // 处理过滤条件变更
    const updateFilters = (updates: Partial<SearchFilters>) => {
      const newFilters = { ...filters, ...updates };
      setFilters(newFilters);
      form.reset(newFilters);
    };

    // 添加筛选标签
    const addFilterTag = (type: keyof SearchFilters, value: string) => {
      if (type === 'dataSources' || type === 'sentiments' || type === 'regions' ||
          type === 'categories' || type === 'languages') {
        const current = filters[type] as string[];
        if (!current.includes(value)) {
          updateFilters({ [type]: [...current, value] });
        }
      }
    };

    // 移除筛选标签
    const removeFilterTag = (type: keyof SearchFilters, value: string) => {
      if (type === 'dataSources' || type === 'sentiments' || type === 'regions' ||
          type === 'categories' || type === 'languages') {
        const current = filters[type] as string[];
        updateFilters({ [type]: current.filter(item => item !== value) });
      }
    };

    // 清空所有筛选条件
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
          authorVerified: false
        }
      });
    };

    // 保存搜索
    const handleSaveSearch = () => {
      const savedSearch: SavedSearch = {
        id: Date.now().toString(),
        name: filters.keyword || '未命名搜索',
        filters,
        timestamp: new Date()
      };
      onSaveSearch?.(savedSearch);
    };

    // 渲染已选择的筛选标签
    const renderFilterTags = () => {
      const tags: React.ReactNode[] = [];

      // 数据源标签
      filters.dataSources.forEach(source => {
        const sourceConfig = searchConfig?.dataSources.find(s => s.id === source);
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

      // 情感标签
      filters.sentiments.forEach(sentiment => {
        const sentimentConfig = searchConfig?.sentimentTypes.find(s => s.id === sentiment);
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

      // 时间范围标签
      if (filters.timeRange.preset) {
        const timeConfig = searchConfig?.timeRanges.find(t => t.id === filters.timeRange.preset);
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
      <div className={cn("w-full space-y-4", className)} ref={ref} {...props}>
        {/* 主搜索区域 */}
        <div className="space-y-3">
          {/* 智能搜索输入 */}
          <Popover open={commandOpen} onOpenChange={setCommandOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  placeholder={placeholder}
                  value={filters.keyword}
                  onChange={(e) => updateFilters({ keyword: e.target.value })}
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
                            <Badge variant="outline" className="ml-auto text-xs">
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
                        {recentSearches.slice(0, 3).map((search) => (
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
                            <Badge variant="outline" className="ml-auto text-xs">
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
                        {presetFilters.slice(0, 3).map((preset) => (
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

          {/* 快速筛选按钮 */}
          <div className="flex flex-wrap gap-2">
            {searchConfig?.dataSources.slice(0, 4).map(source => (
              <Button
                key={source.id}
                variant={filters.dataSources.includes(source.id) ? "default" : "outline"}
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

          {/* 已选择的筛选标签 */}
          {renderFilterTags()}
        </div>

        {/* 高级搜索选项 */}
        {showAdvanced && (
          <Collapsible open={showAdvancedOptions} onOpenChange={setShowAdvancedOptions}>
            <CollapsibleContent className="space-y-4">
              <Separator />

              <Form {...form}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* 时间范围 */}
                  <FormField
                    control={form.control}
                    name="timeRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>时间范围</FormLabel>
                        <Select
                          value={filters.timeRange.preset}
                          onValueChange={(value) => {
                            const timeConfig = searchConfig?.timeRanges.find(t => t.id === value);
                            if (timeConfig) {
                              updateFilters({
                                timeRange: {
                                  ...filters.timeRange,
                                  preset: value
                                }
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

                  {/* 情感类型 */}
                  <FormField
                    control={form.control}
                    name="sentiments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>情感类型</FormLabel>
                        <div className="space-y-2">
                          {searchConfig?.sentimentTypes.map(sentiment => (
                            <div key={sentiment.id} className="flex items-center space-x-2">
                              <Checkbox
                                checked={filters.sentiments.includes(sentiment.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    addFilterTag('sentiments', sentiment.id);
                                  } else {
                                    removeFilterTag('sentiments', sentiment.id);
                                  }
                                }}
                              />
                              <label className="text-sm">{sentiment.name}</label>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* 地区选择 */}
                  <FormField
                    control={form.control}
                    name="regions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>地区</FormLabel>
                        <Select
                          onValueChange={(value) => addFilterTag('regions', value)}
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

                {/* 高级选项 */}
                <div className="space-y-3">
                  <h4 className="font-medium">高级选项</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.advanced.exactMatch}
                        onCheckedChange={(checked) =>
                          updateFilters({
                            advanced: { ...filters.advanced, exactMatch: !!checked }
                          })
                        }
                      />
                      <label className="text-sm">精确匹配</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.advanced.hasImages}
                        onCheckedChange={(checked) =>
                          updateFilters({
                            advanced: { ...filters.advanced, hasImages: !!checked }
                          })
                        }
                      />
                      <label className="text-sm">包含图片</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.advanced.hasVideos}
                        onCheckedChange={(checked) =>
                          updateFilters({
                            advanced: { ...filters.advanced, hasVideos: !!checked }
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

        {/* 操作按钮 */}
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

AdvancedSearchPanel.displayName = "AdvancedSearchPanel";
```

### 样式和动画规范

```css
/* 搜索建议动画 */
.search-suggestion {
  @apply transition-all duration-200 ease-in-out;
}

.search-suggestion:hover {
  @apply bg-muted transform scale-[1.02];
}

/* 筛选标签动画 */
.filter-tag {
  @apply transition-all duration-300 ease-in-out;
}

.filter-tag-enter {
  @apply opacity-0 scale-90;
}

.filter-tag-enter-active {
  @apply opacity-100 scale-100;
}

/* 高级选项展开动画 */
.advanced-options {
  @apply transition-all duration-300 ease-in-out;
}

/* 搜索加载状态 */
.search-loading {
  @apply animate-pulse;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { AdvancedSearchPanel } from "@/components/widgets";

function SearchPage() {
  const searchConfig = {
    dataSources: [
      { id: 'news', name: '新闻', type: 'news', enabled: true, icon: '📰' },
      { id: 'weibo', name: '微博', type: 'social', enabled: true, icon: '📱' },
      { id: 'forums', name: '论坛', type: 'forum', enabled: true, icon: '💬' }
    ],
    timeRanges: [
      { id: '1h', name: '最近1小时' },
      { id: '24h', name: '最近24小时' },
      { id: '7d', name: '最近7天' },
      { id: '30d', name: '最近30天' }
    ],
    sentimentTypes: [
      { id: 'positive', name: '正面' },
      { id: 'negative', name: '负面' },
      { id: 'neutral', name: '中性' }
    ],
    regions: [
      { id: 'beijing', name: '北京' },
      { id: 'shanghai', name: '上海' },
      { id: 'guangzhou', name: '广州' }
    ]
  };

  const handleSearch = (filters: SearchFilters) => {
    console.log('搜索条件:', filters);
    // 执行搜索逻辑
  };

  const handleSaveSearch = (search: SavedSearch) => {
    console.log('保存搜索:', search);
    // 保存到本地或服务器
  };

  return (
    <AdvancedSearchPanel
      searchConfig={searchConfig}
      onSearch={handleSearch}
      onSaveSearch={handleSaveSearch}
      placeholder="搜索舆情信息..."
      showAdvanced={true}
      showHistory={true}
      showPresets={true}
    />
  );
}
```

### 高级配置示例

```typescript
function AdvancedSearchExample() {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<SavedSearch[]>([]);

  // 获取搜索建议
  const fetchSuggestions = async (keyword: string) => {
    const suggestions = await getSuggestions(keyword);
    setSuggestions(suggestions);
  };

  // 处理搜索
  const handleSearch = async (filters: SearchFilters) => {
    const results = await searchSentiment(filters);
    // 添加到历史记录
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: filters.keyword,
      filters,
      timestamp: new Date(),
      resultCount: results.length
    };
    setRecentSearches(prev => [newSearch, ...prev.slice(0, 9)]);
  };

  return (
    <AdvancedSearchPanel
      searchConfig={searchConfig}
      suggestions={suggestions}
      recentSearches={recentSearches}
      onSearch={handleSearch}
      onSaveSearch={(search) => saveSearchToServer(search)}
      onLoadSearch={(searchId) => loadSearchFromServer(searchId)}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性           | 类型                             | 默认值            | 描述             |
| -------------- | -------------------------------- | ----------------- | ---------------- |
| searchConfig   | SearchConfig                     | -                 | 搜索配置选项     |
| onSearch       | (filters: SearchFilters) => void | -                 | 搜索执行回调     |
| onSaveSearch   | (search: SavedSearch) => void    | -                 | 保存搜索回调     |
| onLoadSearch   | (searchId: string) => void       | -                 | 加载搜索回调     |
| suggestions    | SearchSuggestion[]               | []                | 搜索建议列表     |
| recentSearches | SavedSearch[]                    | []                | 历史搜索列表     |
| presetFilters  | PresetFilter[]                   | []                | 预设筛选列表     |
| placeholder    | string                           | "搜索舆情信息..." | 搜索框占位文本   |
| showAdvanced   | boolean                          | true              | 是否显示高级选项 |
| showHistory    | boolean                          | true              | 是否显示历史记录 |
| showPresets    | boolean                          | true              | 是否显示预设筛选 |

### 事件回调

- `onSearch`: 执行搜索时触发
- `onSaveSearch`: 保存搜索时触发
- `onLoadSearch`: 加载历史搜索时触发

## 🎨 最佳实践

### 设计建议

1. 搜索建议要相关且有用
2. 筛选条件要分组清晰
3. 历史记录要易于管理
4. 高级选项要渐进展示

### 性能优化

1. 搜索建议使用防抖处理
2. 历史记录合理限制数量
3. 筛选条件异步加载
4. 搜索结果使用缓存机制
