import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label, Textarea } from '@sker/ui';
import { Save, X, Zap, Hash, FileText } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { SentimentIntensityItem } from '../../types/sentiment-intensity';
import {
  createSentimentIntensitySchema,
  type CreateSentimentIntensityInput,
} from '../../types/sentiment-intensity';

interface SentimentIntensityFormProps {
  initialData?: SentimentIntensityItem | null | undefined;
  onSubmit: (data: CreateSentimentIntensityInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const SentimentIntensityForm: React.FC<SentimentIntensityFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSentimentIntensityInput>({
    resolver: zodResolver(createSentimentIntensitySchema),
    defaultValues: {
      title: initialData?.title || '',
      intensity: initialData?.intensity || 0,
      description: initialData?.description || '',
    },
  });

  const handleFormSubmit = (data: CreateSentimentIntensityInput) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* 标题输入 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-primary" />
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              配置标题 <span className="text-destructive">*</span>
            </Label>
          </div>
          <Input
            id="title"
            placeholder="输入情感强度的名称标识"
            className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
              errors.title ? 'border-destructive focus:border-destructive' : ''
            }`}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.title.message}
            </p>
          )}
        </div>

        {/* 强度值输入 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <Label
              htmlFor="intensity"
              className="text-sm font-medium text-foreground"
            >
              强度数值 <span className="text-destructive">*</span>
            </Label>
          </div>
          <div className="relative">
            <Input
              id="intensity"
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="0.00 - 1.00"
              className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                errors.intensity
                  ? 'border-destructive focus:border-destructive'
                  : ''
              }`}
              {...register('intensity', {
                setValueAs: value => parseFloat(value),
              })}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
              强度
            </div>
          </div>
          {errors.intensity && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.intensity.message}
            </p>
          )}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-xs text-primary font-medium mb-1">
              强度参考范围
            </p>
            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="text-center">
                <div className="text-success font-semibold">0.0-0.2</div>
                <div className="text-muted-foreground">很低</div>
              </div>
              <div className="text-center">
                <div className="text-warning font-semibold">0.2-0.4</div>
                <div className="text-muted-foreground">较低</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-semibold">0.4-0.6</div>
                <div className="text-muted-foreground">中等</div>
              </div>
              <div className="text-center">
                <div className="text-warning font-semibold">0.6-0.8</div>
                <div className="text-muted-foreground">较高</div>
              </div>
              <div className="text-center">
                <div className="text-destructive font-semibold">0.8-1.0</div>
                <div className="text-muted-foreground">很高</div>
              </div>
            </div>
          </div>
        </div>

        {/* 描述输入 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <Label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              详细描述 <span className="text-muted-foreground">(可选)</span>
            </Label>
          </div>
          <Textarea
            id="description"
            rows={4}
            placeholder="描述该情感强度的具体含义、应用场景或备注信息..."
            className="border-border focus:border-primary focus:ring-primary/20 resize-none transition-all duration-300"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-3 h-3" />
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
        >
          <X className="w-4 h-4 mr-2" />
          取消操作
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-tech-gradient hover:shadow-tech text-white font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? '正在保存...' : initialData ? '更新配置' : '创建配置'}
        </Button>
      </div>
    </form>
  );
};
