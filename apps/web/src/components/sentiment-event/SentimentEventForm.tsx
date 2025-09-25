import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label, Textarea } from '@sker/ui';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createSentimentEventSchema,
  type CreateSentimentEventInput,
  type SentimentEvent,
} from '../../types/sentiment-event';

const REQUIRED_CLASS = 'text-red-500';
const ERROR_BORDER_CLASS = 'border-red-500';

interface SentimentEventFormProps {
  initialData?: SentimentEvent | null;
  onSubmit: (data: CreateSentimentEventInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const SentimentEventForm: React.FC<SentimentEventFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateSentimentEventInput>({
    resolver: zodResolver(createSentimentEventSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: '',
      score: initialData?.score || 0.5,
      latitude: 39.9042,
      longitude: 116.4074,
      address: '',
      source: initialData?.source || '',
      timestamp: initialData?.timestamp ? new Date(initialData.timestamp) : new Date(),
      hotness: 1,
    },
  });

  const handleFormSubmit = (data: CreateSentimentEventInput) => {
    onSubmit({
      ...data,
      tags: tags.length > 0 ? tags : undefined,
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // 情感分数相关函数暂时不使用
  // const getScoreColor = (score: number) => {
  //   if (score >= 0.7) return 'text-green-600';
  //   if (score >= 0.3) return 'text-yellow-600';
  //   return 'text-red-600';
  // };

  // const getScoreLabel = (score: number) => {
  //   if (score >= 0.7) return '正面';
  //   if (score >= 0.3) return '中性';
  //   return '负面';
  // };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit as any)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            事件标题 <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="title"
            placeholder="请输入事件标题"
            {...register('title')}
            className={errors.title ? ERROR_BORDER_CLASS : ''}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">
            信息来源 <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="source"
            placeholder="如：新浪微博、今日头条等"
            {...register('source')}
            className={errors.source ? ERROR_BORDER_CLASS : ''}
          />
          {errors.source && <p className="text-sm text-red-500">{errors.source.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">事件内容</Label>
        <Textarea
          id="content"
          rows={4}
          placeholder="请输入事件的详细内容描述"
          {...register('content')}
          className={errors.content ? ERROR_BORDER_CLASS : ''}
        />
        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="score">
            情感分数 <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="score"
            type="number"
            min="0"
            max="1"
            step="0.01"
            placeholder="0.00 - 1.00"
            {...register('score', {
              setValueAs: value => parseFloat(value),
              onChange: e => {
                const score = parseFloat(e.target.value) || 0;
                setValue('score', score);
              },
            })}
            className={errors.score ? ERROR_BORDER_CLASS : ''}
          />
          {errors.score && <p className="text-sm text-red-500">{errors.score.message}</p>}
          <p className="text-sm text-gray-500">0=最负面，0.5=中性，1=最正面</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hotness">事件热度</Label>
          <Input
            id="hotness"
            type="number"
            min="1"
            max="10"
            {...register('hotness', {
              setValueAs: value => (value === '' ? undefined : parseInt(value)),
            })}
            className={errors.hotness ? ERROR_BORDER_CLASS : ''}
          />
          {errors.hotness && <p className="text-sm text-red-500">{errors.hotness.message}</p>}
          <p className="text-sm text-gray-500">热度值：1-10，可选</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timestamp">
            事件时间 <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="timestamp"
            type="datetime-local"
            {...register('timestamp', {
              setValueAs: value => new Date(value),
            })}
            className={errors.timestamp ? ERROR_BORDER_CLASS : ''}
          />
          {errors.timestamp && <p className="text-sm text-red-500">{errors.timestamp.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="latitude">
            纬度 <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            placeholder="如：39.9042"
            {...register('latitude', {
              setValueAs: value => parseFloat(value),
            })}
            className={errors.latitude ? ERROR_BORDER_CLASS : ''}
          />
          {errors.latitude && <p className="text-sm text-red-500">{errors.latitude.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude">
            经度 <span className={REQUIRED_CLASS}>*</span>
          </Label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            placeholder="如：116.4074"
            {...register('longitude', {
              setValueAs: value => parseFloat(value),
            })}
            className={errors.longitude ? ERROR_BORDER_CLASS : ''}
          />
          {errors.longitude && <p className="text-sm text-red-500">{errors.longitude.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">地址描述</Label>
          <Input
            id="address"
            placeholder="如：北京市朝阳区某某路段"
            {...register('address')}
            className={errors.address ? ERROR_BORDER_CLASS : ''}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>事件标签</Label>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="输入标签后按回车或点击添加"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
          />
          <Button type="button" variant="outline" onClick={addTag}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : initialData ? '更新事件' : '创建事件'}
        </Button>
      </div>
    </form>
  );
};
