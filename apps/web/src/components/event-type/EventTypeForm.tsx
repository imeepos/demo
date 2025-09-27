import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label, Textarea, Switch } from '@sker/ui';
import {
  FileText,
  Hash,
  Save,
  X,
  Palette,
  ToggleLeft,
  Tag,
  ArrowUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { EventType, EventTypeCreateInput } from '../../types/event-type';

const eventTypeFormSchema = z.object({
  code: z
    .string()
    .min(1, '事件类型代码不能为空')
    .max(50, '代码长度不能超过50字符'),
  name: z
    .string()
    .min(1, '事件类型名称不能为空')
    .max(100, '名称长度不能超过100字符'),
  description: z.string().optional(),
  color: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().min(0, '排序权重不能小于0'),
});

type EventTypeFormInput = z.infer<typeof eventTypeFormSchema>;

interface EventTypeFormProps {
  initialData?: EventType | null;
  onSubmit: (data: EventTypeCreateInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ERROR_STYLE = 'border-destructive focus:border-destructive';
const INPUT_BASE_STYLE =
  'border-border focus:border-primary focus:ring-primary/20 transition-all duration-300';

const PRESET_COLORS = [
  '#88f5fa', // 主色调 - 青色
  '#ff6b6b', // 红色
  '#51cf66', // 绿色
  '#ffd43b', // 黄色
  '#ff8cc8', // 粉色
  '#845ef7', // 紫色
  '#ffa726', // 橙色
  '#26c6da', // 青色
  '#66bb6a', // 亮绿色
  '#ab47bc', // 品红色
  '#78909c', // 蓝灰色
  '#8d6e63', // 棕色
];

export const EventTypeForm: React.FC<EventTypeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color || '#88f5fa'
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventTypeFormInput>({
    resolver: zodResolver(eventTypeFormSchema),
    defaultValues: {
      code: initialData?.code || '',
      name: initialData?.name || '',
      description: initialData?.description || '',
      color: initialData?.color || '#88f5fa',
      isActive: initialData?.isActive ?? true,
      sortOrder: initialData?.sortOrder || 0,
    },
  });

  const isActive = watch('isActive');

  const handleFormSubmit = (data: EventTypeFormInput) => {
    onSubmit({
      ...data,
      color: selectedColor,
    });
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue('color', color);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* 基本信息部分 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">基本信息</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <Label
                  htmlFor="code"
                  className="text-sm font-medium text-foreground"
                >
                  事件类型代码 <span className="text-destructive">*</span>
                </Label>
              </div>
              <Input
                id="code"
                placeholder="如：political, economic"
                className={`${INPUT_BASE_STYLE} font-mono ${
                  errors.code ? ERROR_STYLE : ''
                }`}
                {...register('code')}
              />
              <p className="text-xs text-muted-foreground">
                用于系统内部标识，建议使用英文，不能重复
              </p>
              {errors.code && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  事件类型名称 <span className="text-destructive">*</span>
                </Label>
              </div>
              <Input
                id="name"
                placeholder="如：政治事件、经济事件"
                className={`${INPUT_BASE_STYLE} ${
                  errors.name ? ERROR_STYLE : ''
                }`}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

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
              rows={3}
              placeholder="请输入该事件类型的详细描述..."
              className={`${INPUT_BASE_STYLE} resize-none`}
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

        {/* 显示设置部分 */}
        <div className="space-y-6 border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">显示设置</h3>
          </div>

          <div className="space-y-6">
            {/* 颜色选择 */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-foreground">
                标识颜色
              </Label>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: selectedColor }}
                >
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-3">
                    {PRESET_COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorSelect(color)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                          selectedColor === color
                            ? 'border-foreground ring-2 ring-primary/50'
                            : 'border-border hover:border-primary/50'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`选择颜色 ${color}`}
                      />
                    ))}
                  </div>
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={e => handleColorSelect(e.target.value)}
                    className="w-20 h-8 p-1 rounded cursor-pointer"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                选择一个颜色用于在界面中标识该事件类型
              </p>
            </div>

            {/* 状态和排序 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ToggleLeft className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-medium text-foreground">
                    启用状态
                  </Label>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                  <Switch
                    checked={isActive}
                    onCheckedChange={checked => setValue('isActive', checked)}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? 'text-success' : 'text-muted-foreground'
                    }`}
                  >
                    {isActive ? '已启用' : '已禁用'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  禁用后该事件类型将不会在前端显示
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-primary" />
                  <Label
                    htmlFor="sortOrder"
                    className="text-sm font-medium text-foreground"
                  >
                    排序权重 <span className="text-destructive">*</span>
                  </Label>
                </div>
                <Input
                  id="sortOrder"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={`${INPUT_BASE_STYLE} ${
                    errors.sortOrder ? ERROR_STYLE : ''
                  }`}
                  {...register('sortOrder', {
                    setValueAs: value => parseInt(value) || 0,
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  数值越大排序越靠前，相同时按创建时间排序
                </p>
                {errors.sortOrder && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>
            </div>
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
            {isSubmitting
              ? '正在保存...'
              : initialData
                ? '更新类型'
                : '创建类型'}
          </Button>
        </div>
      </form>
    </div>
  );
};
