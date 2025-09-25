import { Label } from '@sker/ui';
import React, { useState, useEffect } from 'react';

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  className?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue = v => v.toFixed(2),
  className = '',
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(e.target.value);
    const newValue: [number, number] = [
      newMin,
      Math.max(newMin, localValue[1]),
    ];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    const newValue: [number, number] = [
      Math.min(localValue[0], newMax),
      newMax,
    ];
    setLocalValue(newValue);
    onChange(newValue);
  };

  // 计算滑块位置百分比
  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;
  const leftPercentage = getPercentage(localValue[0]);
  const rightPercentage = getPercentage(localValue[1]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span className="text-xs text-muted-foreground">
          {formatValue(localValue[0])} - {formatValue(localValue[1])}
        </span>
      </div>

      <div className="relative">
        {/* 滑块轨道 */}
        <div className="relative h-2 bg-border rounded-full">
          {/* 选中范围 */}
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{
              left: `${leftPercentage}%`,
              width: `${rightPercentage - leftPercentage}%`,
            }}
          />
        </div>

        {/* 最小值滑块 */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-10"
          style={{ background: 'none' }}
        />

        {/* 最大值滑块 */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-20"
          style={{ background: 'none' }}
        />

        {/* 滑块手柄 */}
        <div
          className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm -top-1 transform -translate-x-1/2 pointer-events-none z-30"
          style={{ left: `${leftPercentage}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm -top-1 transform -translate-x-1/2 pointer-events-none z-30"
          style={{ left: `${rightPercentage}%` }}
        />
      </div>

      {/* 数值显示标签 */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};
