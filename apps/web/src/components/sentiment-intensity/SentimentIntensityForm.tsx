import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea, Label } from '@sker/ui';
import {
  createSentimentIntensitySchema,
  type CreateSentimentIntensityInput,
} from '../../types/sentiment-intensity';
import type { SentimentIntensityItem } from '../../types/sentiment-intensity';

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
      description: '',
    },
  });

  const handleFormSubmit = (data: CreateSentimentIntensityInput) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">
          标题 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="请输入情感标题"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="intensity">
          强度值 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="intensity"
          type="number"
          min="0"
          max="1"
          step="0.01"
          placeholder="请输入强度值 (0-1)"
          {...register('intensity', {
            setValueAs: value => parseFloat(value),
          })}
          className={errors.intensity ? 'border-red-500' : ''}
        />
        {errors.intensity && <p className="text-sm text-red-500">{errors.intensity.message}</p>}
        <p className="text-sm text-gray-500">强度值范围：0.00 - 1.00，数值越大表示情感强度越高</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">描述</Label>
        <Textarea
          id="description"
          rows={3}
          placeholder="请输入情感描述（可选）"
          {...register('description')}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : initialData ? '更新' : '创建'}
        </Button>
      </div>
    </form>
  );
};
