import { Input, Label } from '@sker/ui';
import { TrendingUp, X } from 'lucide-react';
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface NumberRangeInputProps {
  // 标签配置
  label: string;
  icon?: React.ComponentType<{ className?: string }>;

  // 字段名
  minFieldName: string;
  maxFieldName: string;

  // 输入框配置
  min?: number;
  max?: number;
  step?: number;
  minPlaceholder?: string;
  maxPlaceholder?: string;

  // react-hook-form 集成
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;

  // 自定义样式
  className?: string;
}

export const NumberRangeInput: React.FC<NumberRangeInputProps> = ({
  label,
  icon: Icon = TrendingUp,
  minFieldName,
  maxFieldName,
  min = 0,
  max = 1,
  step = 0.01,
  minPlaceholder = '最小值',
  maxPlaceholder = '最大值',
  register,
  errors = {},
  className = '',
}) => {
  const minError = errors[minFieldName];
  const maxError = errors[maxFieldName];

  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    return error?.message || '输入有误';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* 标签 */}
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <Label className="text-sm font-medium text-foreground">{label}</Label>
      </div>

      {/* 输入框组合 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 最小值输入框 */}
        <div className="space-y-2">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            placeholder={minPlaceholder}
            className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
              minError ? 'border-destructive focus:border-destructive' : ''
            }`}
            {...register(minFieldName, {
              setValueAs: value =>
                value === '' ? undefined : parseFloat(value),
            })}
          />
          {minError && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {getErrorMessage(minError)}
            </p>
          )}
        </div>

        {/* 最大值输入框 */}
        <div className="space-y-2">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            placeholder={maxPlaceholder}
            className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
              maxError ? 'border-destructive focus:border-destructive' : ''
            }`}
            {...register(maxFieldName, {
              setValueAs: value =>
                value === '' ? undefined : parseFloat(value),
            })}
          />
          {maxError && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {getErrorMessage(maxError)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
