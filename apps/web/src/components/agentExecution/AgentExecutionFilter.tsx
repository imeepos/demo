import { Calendar, Filter } from 'lucide-react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@sker/ui';
import { useQueryAgentFindAll } from '../../hooks/agent';

interface AgentExecutionFilterProps {
  selectedAgent: string;
  selectedStatus: string;
  dateRange: [Date?, Date?];
  onAgentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateRangeChange: (range: [Date?, Date?]) => void;
}

export function AgentExecutionFilter({
  selectedAgent,
  selectedStatus,
  dateRange,
  onAgentChange,
  onStatusChange,
  onDateRangeChange,
}: AgentExecutionFilterProps) {
  const { data: agents } = useQueryAgentFindAll();
  const statusOptions = [
    { label: '全部状态', value: 'all' },
    { label: '运行中', value: 'running' },
    { label: '成功', value: 'success' },
    { label: '失败', value: 'failed' },
    { label: '已取消', value: 'cancelled' },
  ];

  const quickDateRanges = [
    { label: '今天', days: 1 },
    { label: '本周', days: 7 },
    { label: '本月', days: 30 },
    { label: '近3个月', days: 90 },
  ];

  const handleQuickDateRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onDateRangeChange([start, end]);
  };

  const clearDateRange = () => {
    onDateRangeChange([]);
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={selectedAgent} onValueChange={onAgentChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="选择Agent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部Agent</SelectItem>
          {agents?.data?.map((agent: any) => (
            <SelectItem key={agent.id} value={agent.id}>
              {agent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="状态" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {dateRange[0] && dateRange[1]
              ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
              : '选择时间范围'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">快速选择</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickDateRanges.map(range => (
                <Button
                  key={range.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickDateRange(range.days)}
                  className="text-sm"
                >
                  {range.label}
                </Button>
              ))}
            </div>
            {(dateRange[0] || dateRange[1]) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearDateRange}
                className="w-full text-sm"
              >
                清除时间范围
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>筛选</span>
      </div>
    </div>
  );
}
