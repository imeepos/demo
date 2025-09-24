interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'pie';
  height?: number;
}

/**
 * 简化图表组件
 * 职责：展示基础的数据可视化
 * 注：这是一个简化版本，实际项目中建议使用 Chart.js 或 ECharts
 */
export function SimpleChart({ data, type, height = 200 }: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className="chart-container" style={{ height }}>
        <div className="flex items-end justify-between h-full gap-2 p-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                style={{
                  height: `${(item.value / maxValue) * 80}%`,
                  backgroundColor: item.color || 'var(--primary)',
                }}
              />
              <div className="text-xs mt-2 text-center">{item.label}</div>
              <div className="text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    return (
      <div
        className="chart-container flex items-center justify-center"
        style={{ height }}
      >
        <div className="grid grid-cols-2 gap-4 w-full">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor:
                      item.color || `var(--chart-${(index % 6) + 1})`,
                  }}
                />
                <div className="text-sm">
                  <div>{item.label}</div>
                  <div className="font-semibold">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="chart-container flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-muted-foreground">图表加载中...</div>
    </div>
  );
}
