import { cn } from '@sker/ui';
import { useState, useCallback, useRef, useEffect } from 'react';
import type { SearchResult } from './types';
import { AmapService, storage } from './utils';

export interface AddressSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: SearchResult) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxResults?: number;
  showHistory?: boolean;
}

/**
 * 地址搜索组件
 * 支持实时搜索、历史记录、搜索建议
 */
export function AddressSearch({
  value = '',
  onChange,
  onSelect,
  placeholder = '输入地址搜索位置...',
  disabled = false,
  className,
  maxResults = 10,
  showHistory = true,
}: AddressSearchProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 从localStorage加载搜索历史
  useEffect(() => {
    if (showHistory) {
      const history = storage.get<SearchResult[]>('addressSearchHistory', []);
      setSearchHistory(history?.slice(0, 5) || []);
    }
  }, [showHistory]);

  // 保存搜索历史
  const saveToHistory = useCallback(
    (result: SearchResult) => {
      if (!showHistory) return;

      const newHistory = [
        result,
        ...searchHistory.filter(item => item.id !== result.id),
      ].slice(0, 5);

      setSearchHistory(newHistory);
      storage.set('addressSearchHistory', newHistory);
    },
    [searchHistory, showHistory]
  );

  // 地址搜索
  const searchAddress = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await AmapService.searchPlaces(
          searchQuery,
          maxResults
        );
        setResults(searchResults);
      } catch (error) {
        console.warn('地址搜索失败:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [maxResults]
  );

  // 处理输入变化
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setQuery(newValue);
      onChange?.(newValue);
      setSelectedIndex(-1);

      // 清除之前的搜索定时器
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // 防抖搜索
      if (newValue.trim()) {
        setShowDropdown(true);
        searchTimeoutRef.current = setTimeout(() => {
          searchAddress(newValue);
        }, 300);
      } else {
        setResults([]);
        setShowDropdown(showHistory && searchHistory.length > 0);
      }
    },
    [onChange, searchAddress, showHistory, searchHistory.length]
  );

  // 处理输入框焦点
  const handleFocus = useCallback(() => {
    if (query.trim()) {
      setShowDropdown(true);
    } else if (showHistory && searchHistory.length > 0) {
      setShowDropdown(true);
    }
  }, [query, showHistory, searchHistory.length]);

  // 处理选择结果
  const handleSelect = useCallback(
    (result: SearchResult) => {
      setQuery(result.name);
      setShowDropdown(false);
      setSelectedIndex(-1);
      onChange?.(result.name);
      onSelect?.(result);
      saveToHistory(result);
      inputRef.current?.blur();
    },
    [onChange, onSelect, saveToHistory]
  );

  // 处理键盘导航
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown) return;

      const totalItems =
        results.length +
        (showHistory && !query.trim() ? searchHistory.length : 0);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % totalItems);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev <= 0 ? totalItems - 1 : prev - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            const allItems = query.trim() ? results : [...searchHistory];
            const selectedItem = allItems[selectedIndex];
            if (selectedItem) {
              handleSelect(selectedItem);
            }
          } else if (results.length > 0) {
            handleSelect(results[0]);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [
      showDropdown,
      results,
      searchHistory,
      selectedIndex,
      query,
      handleSelect,
      showHistory,
    ]
  );

  // 清空搜索历史
  const clearHistory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
    storage.remove('addressSearchHistory');
  }, []);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 监听外部value变化
  useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value, query]);

  return (
    <div className={cn('relative w-full', className)}>
      {/* 搜索输入框 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full h-10 pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        />

        {/* 搜索图标 */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 加载/清空按钮 */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
          ) : query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                onChange?.('');
                setResults([]);
                setShowDropdown(false);
                inputRef.current?.focus();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      {/* 搜索结果下拉框 */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {/* 搜索历史 */}
          {showHistory && !query.trim() && searchHistory.length > 0 && (
            <>
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">
                  搜索历史
                </span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  清空
                </button>
              </div>
              {searchHistory.map((item, index) => (
                <div
                  key={`history_${item.id}`}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'px-3 py-2 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0',
                    selectedIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* 搜索结果 */}
          {query.trim() && (
            <>
              {results.length > 0 ? (
                <>
                  {showHistory && searchHistory.length > 0 && (
                    <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-600">
                        搜索结果
                      </span>
                    </div>
                  )}
                  {results.map((result, index) => {
                    const actualIndex =
                      showHistory && !query.trim()
                        ? searchHistory.length + index
                        : index;
                    return (
                      <div
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className={cn(
                          'px-3 py-2 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0',
                          selectedIndex === actualIndex
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {result.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {result.address}
                            </div>
                            {(result.city || result.province) && (
                              <div className="text-xs text-blue-600 mt-1">
                                {[result.province, result.city, result.district]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                !isLoading && (
                  <div className="px-3 py-6 text-center text-gray-500">
                    <svg
                      className="w-8 h-8 mx-auto mb-2 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <div className="text-sm">未找到相关地址</div>
                    <div className="text-xs text-gray-400 mt-1">
                      尝试使用不同的关键词
                    </div>
                  </div>
                )
              )}
            </>
          )}

          {/* 加载状态 */}
          {isLoading && (
            <div className="px-3 py-6 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 mx-auto mb-2 border-2 border-blue-500 border-t-transparent rounded-full" />
              <div className="text-sm">搜索中...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
