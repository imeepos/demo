import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label, Textarea } from '@sker/ui';
import {
  Calendar,
  FileText,
  Hash,
  MapPin,
  Plus,
  Save,
  Tag,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createSentimentEventSchema,
  type CreateSentimentEventInput,
  type SentimentEvent,
} from '../../types/sentiment-event';

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
    watch,
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

  const score = watch('score');

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

  const getSentimentVariant = (
    score: number,
  ): 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative' => {
    if (score >= 0.8) return 'very-positive';
    if (score >= 0.6) return 'positive';
    if (score >= 0.4) return 'neutral';
    if (score >= 0.2) return 'negative';
    return 'very-negative';
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 0.8) return '非常正面';
    if (score >= 0.6) return '正面';
    if (score >= 0.4) return '中性';
    if (score >= 0.2) return '负面';
    return '非常负面';
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(handleFormSubmit as any)} className="space-y-8">
        {/* 基本信息部分 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">基本信息</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  事件标题 <span className="text-destructive">*</span>
                </Label>
              </div>
              <Input
                id="title"
                placeholder="输入舆情事件的标题"
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

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                <Label htmlFor="source" className="text-sm font-medium text-foreground">
                  信息来源 <span className="text-destructive">*</span>
                </Label>
              </div>
              <Input
                id="source"
                placeholder="如：新浪微博、今日头条等"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.source ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('source')}
              />
              {errors.source && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.source.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <Label htmlFor="content" className="text-sm font-medium text-foreground">
                事件内容描述 <span className="text-muted-foreground">(可选)</span>
              </Label>
            </div>
            <Textarea
              id="content"
              rows={4}
              placeholder="请输入事件的详细内容描述..."
              className="border-border focus:border-primary focus:ring-primary/20 resize-none transition-all duration-300"
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <X className="w-3 h-3" />
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        {/* 评分和时间部分 */}
        <div className="space-y-6 border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">评分设置</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <Label htmlFor="score" className="text-sm font-medium text-foreground">
                  情感分数 <span className="text-destructive">*</span>
                </Label>
              </div>
              <div className="space-y-3">
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  placeholder="0.00 - 1.00"
                  className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                    errors.score ? 'border-destructive focus:border-destructive' : ''
                  }`}
                  {...register('score', {
                    setValueAs: value => parseFloat(value),
                    onChange: e => {
                      const score = parseFloat(e.target.value) || 0;
                      setValue('score', score);
                    },
                  })}
                />
                {errors.score && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.score.message}
                  </p>
                )}

                {/* 情感分数预览 */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <div className="text-xs font-medium text-primary mb-2">
                    📊 当前情感评级: {getSentimentLabel(score || 0)}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        (score || 0) >= 0.7
                          ? 'bg-success'
                          : (score || 0) >= 0.4
                            ? 'bg-warning'
                            : (score || 0) >= 0.2
                              ? 'bg-primary'
                              : 'bg-destructive'
                      }`}
                      style={{ width: `${(score || 0) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <Label htmlFor="hotness" className="text-sm font-medium text-foreground">
                  事件热度 <span className="text-muted-foreground">(1-10)</span>
                </Label>
              </div>
              <Input
                id="hotness"
                type="number"
                min="1"
                max="10"
                placeholder="热度等级"
                className="border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                {...register('hotness', {
                  setValueAs: value => (value === '' ? undefined : parseInt(value)),
                })}
              />
              {errors.hotness && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.hotness.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <Label htmlFor="timestamp" className="text-sm font-medium text-foreground">
                  事件时间 <span className="text-destructive">*</span>
                </Label>
              </div>
              <Input
                id="timestamp"
                type="datetime-local"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.timestamp ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('timestamp', {
                  setValueAs: value => new Date(value),
                })}
              />
              {errors.timestamp && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.timestamp.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 地理位置部分 */}
        <div className="space-y-6 border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">地理位置</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="latitude" className="text-sm font-medium text-foreground">
                纬度 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                placeholder="39.9042"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.latitude ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('latitude', {
                  setValueAs: value => parseFloat(value),
                })}
              />
              {errors.latitude && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="longitude" className="text-sm font-medium text-foreground">
                经度 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                placeholder="116.4074"
                className={`border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 ${
                  errors.longitude ? 'border-destructive focus:border-destructive' : ''
                }`}
                {...register('longitude', {
                  setValueAs: value => parseFloat(value),
                })}
              />
              {errors.longitude && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.longitude.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="address" className="text-sm font-medium text-foreground">
                地址描述 <span className="text-muted-foreground">(可选)</span>
              </Label>
              <Input
                id="address"
                placeholder="如：北京市朝阳区某某路段"
                className="border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                {...register('address')}
              />
              {errors.address && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 标签部分 */}
        <div className="space-y-6 border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">事件标签</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="输入标签后按回车或点击添加"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                className="flex-1 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-primary hover:text-destructive transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-3 pt-8 border-t border-border">
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
            className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-2 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? '正在保存...' : initialData ? '更新事件' : '创建事件'}
          </Button>
        </div>
      </form>
    </div>
  );
};
