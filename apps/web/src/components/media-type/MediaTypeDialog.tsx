/**
 * 媒体类型创建/编辑对话框组件
 *
 * 设计理念：
 * - 优雅的表单设计
 * - 实时表单验证
 * - 流畅的交互体验
 * - 完善的错误处理
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@sker/ui';
import { Save, X, AlertCircle, Code, FileText, Tag } from 'lucide-react';
import type {
  MediaTypeDialogProps,
  MediaTypeFormData,
  MediaTypeFormErrors,
  CreateMediaTypeInput,
} from '../../types/media-type';
import {
  VALIDATION_RULES,
  MEDIA_TYPE_CODE_OPTIONS,
} from '../../types/media-type';

export const MediaTypeDialog: React.FC<MediaTypeDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
  title,
}) => {
  const [formData, setFormData] = useState<MediaTypeFormData>({
    code: '',
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState<MediaTypeFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 初始化表单数据
  useEffect(() => {
    if (isOpen) {
      setFormData({
        code: initialData?.code || '',
        name: initialData?.name || '',
        description: initialData?.description || '',
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, initialData]);

  // 表单验证
  const validateField = (
    field: keyof MediaTypeFormData,
    value: string
  ): string | undefined => {
    const rules = VALIDATION_RULES[field] as any;

    if (field === 'code' || field === 'name') {
      if (!value.trim()) {
        return rules.required;
      }
    }

    if (value.trim()) {
      if (rules.minLength && value.length < rules.minLength.value) {
        return rules.minLength.message;
      }

      if (rules.maxLength && value.length > rules.maxLength.value) {
        return rules.maxLength.message;
      }

      if (rules.pattern && !rules.pattern.value.test(value)) {
        return rules.pattern.message;
      }
    }

    return undefined;
  };

  // 验证整个表单
  const validateForm = (): boolean => {
    const newErrors: MediaTypeFormErrors = {};

    Object.keys(formData).forEach(key => {
      const field = key as keyof MediaTypeFormData;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleInputChange = (field: keyof MediaTypeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // 实时验证
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  // 处理字段失焦
  const handleBlur = (field: keyof MediaTypeFormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));

    const error = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 标记所有字段为已触摸
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    const submitData: CreateMediaTypeInput = {
      code: formData.code.trim(),
      name: formData.name.trim(),
      ...(formData.description.trim() && {
        description: formData.description.trim(),
      }),
    };

    try {
      await onSubmit(submitData);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  // 处理对话框关闭
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 bg-white rounded-2xl shadow-2xl border-0">
        {/* 对话框头部 */}
        <div className="px-8 py-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
                <FileText className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {title}
                </h2>
                <p className="text-slate-500 text-sm">
                  {initialData
                    ? '修改媒体类型配置信息'
                    : '添加新的媒体类型配置'}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 表单内容 */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* 媒体类型代码 */}
          <div className="space-y-3">
            <Label
              htmlFor="code"
              className="flex items-center space-x-2 text-sm font-medium text-slate-700"
            >
              <Code className="w-4 h-4" />
              <span>媒体类型代码 *</span>
            </Label>
            {initialData ? (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono text-sm text-slate-600">
                  {formData.code}
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  编辑时代码不可修改
                </p>
              </div>
            ) : (
              <>
                <Select
                  value={formData.code}
                  onValueChange={value => handleInputChange('code', value)}
                >
                  <SelectTrigger
                    className={`h-11 rounded-lg transition-all duration-200 ${
                      errors.code
                        ? 'border-red-300 bg-red-50'
                        : 'border-slate-200 bg-slate-50/50 focus:bg-white'
                    }`}
                  >
                    <SelectValue placeholder="选择媒体类型代码..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDIA_TYPE_CODE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <Tag className="w-3 h-3" />
                          <span>{option.label}</span>
                          <span className="text-xs text-slate-500">
                            ({option.value})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.code && (
                  <div className="flex items-center space-x-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.code}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 媒体类型名称 */}
          <div className="space-y-3">
            <Label
              htmlFor="name"
              className="flex items-center space-x-2 text-sm font-medium text-slate-700"
            >
              <FileText className="w-4 h-4" />
              <span>媒体类型名称 *</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="输入媒体类型名称..."
              className={`h-11 rounded-lg transition-all duration-200 ${
                errors.name
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-200 bg-slate-50/50 focus:bg-white'
              }`}
            />
            {errors.name && (
              <div className="flex items-center space-x-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* 媒体类型描述 */}
          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-slate-700"
            >
              媒体类型描述
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              placeholder="输入媒体类型的详细描述（可选）..."
              rows={3}
              className={`rounded-lg resize-none transition-all duration-200 ${
                errors.description
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-200 bg-slate-50/50 focus:bg-white'
              }`}
            />
            {errors.description && (
              <div className="flex items-center space-x-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.description}</span>
              </div>
            )}
            <p className="text-xs text-slate-500">
              {formData.description.length}/500 字符
            </p>
          </div>
        </form>

        {/* 对话框底部 */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg border-slate-300 text-slate-600 hover:bg-white transition-all duration-200"
            >
              取消
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                Object.keys(errors).some(
                  key => errors[key as keyof MediaTypeFormErrors]
                )
              }
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
