import { Button, Input } from '@sker/ui';
import { Search, Filter, X } from 'lucide-react';
import React, { useState } from 'react';

interface CompactSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear?: () => void;
  onToggleFilters?: () => void;
  showFilters?: boolean;
  hasActiveFilters?: boolean;
  isSearching?: boolean;
  className?: string;
}

export const CompactSearchBar: React.FC<CompactSearchBarProps> = ({
  placeholder = '搜索...',
  value = '',
  onChange,
  onSearch,
  onClear,
  onToggleFilters,
  showFilters = false,
  hasActiveFilters = false,
  isSearching = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    onClear?.();
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* 主搜索输入框 */}
        <div className="relative flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              className="pl-10 pr-10 h-10 md:h-12 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 筛选按钮 */}
        {onToggleFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={onToggleFilters}
            className={`h-10 md:h-12 px-3 md:px-4 border-border hover:bg-accent transition-all duration-300 relative ${
              hasActiveFilters || showFilters
                ? 'bg-primary/10 border-primary text-primary'
                : ''
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">筛选</span>
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </Button>
        )}

        {/* 搜索按钮 */}
        <Button
          type="submit"
          disabled={isSearching}
          className="h-10 md:h-12 px-4 md:px-6 bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300"
        >
          <Search className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">
            {isSearching ? '搜索中...' : '搜索'}
          </span>
        </Button>
      </form>
    </div>
  );
};
