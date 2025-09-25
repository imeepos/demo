import { Button } from '@sker/ui';
import { Calendar, Clock } from 'lucide-react';
import React from 'react';

export interface DateRange {
  startTime?: Date;
  endTime?: Date;
}

interface QuickDateRangeProps {
  onSelect: (range: DateRange) => void;
  className?: string;
}

export const QuickDateRange: React.FC<QuickDateRangeProps> = ({
  onSelect,
  className = '',
}) => {
  const getDateRange = (
    type: 'today' | 'yesterday' | 'week' | 'month' | 'quarter'
  ): DateRange => {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    // 设置结束时间为当前时间
    end.setHours(23, 59, 59, 999);

    switch (type) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setTime(now.getTime());
        break;
      case 'yesterday':
        start.setDate(now.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week':
        start.setDate(now.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setMonth(now.getMonth() - 1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'quarter':
        start.setMonth(now.getMonth() - 3);
        start.setHours(0, 0, 0, 0);
        break;
    }

    return {
      startTime: start,
      endTime: end,
    };
  };

  const quickOptions = [
    { key: 'today', label: '今天', icon: Calendar },
    { key: 'yesterday', label: '昨天', icon: Calendar },
    { key: 'week', label: '近7天', icon: Clock },
    { key: 'month', label: '近30天', icon: Clock },
    { key: 'quarter', label: '近90天', icon: Clock },
  ] as const;

  const handleSelect = (key: (typeof quickOptions)[number]['key']) => {
    const range = getDateRange(key);
    onSelect(range);
  };

  const handleClear = () => {
    onSelect({});
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          快捷时间选择
        </span>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {quickOptions.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSelect(key)}
            className="text-xs h-8 px-2 sm:px-3 border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
          >
            <Icon className="w-3 h-3 mr-1" />
            {label}
          </Button>
        ))}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="col-span-2 sm:col-span-1 text-xs h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          清空时间
        </Button>
      </div>
    </div>
  );
};
