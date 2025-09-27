/**
 * 媒体类型管理相关类型定义
 *
 * 设计理念：
 * - 严格的类型安全
 * - 清晰的数据结构
 * - 完整的表单验证支持
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import type {
  CreateMediaTypeDto,
  MediaTypeResponseDto,
  UpdateMediaTypeDto,
} from '@sker/sdk';

// ==================== 基础类型 ====================

/** 媒体类型数据项 */
export interface MediaTypeItem extends MediaTypeResponseDto {
  id: number;
  code: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** 创建媒体类型输入 */
export interface CreateMediaTypeInput {
  code: string;
  name: string;
  description?: string;
}

/** 更新媒体类型输入 */
export interface UpdateMediaTypeInput {
  code?: string;
  name?: string;
  description?: string;
}

/** 搜索媒体类型输入 */
export interface SearchMediaTypeInput {
  name?: string;
  code?: string;
}

// ==================== 表单状态类型 ====================

/** 媒体类型表单数据 */
export interface MediaTypeFormData {
  code: string;
  name: string;
  description: string;
}

/** 媒体类型表单错误 */
export interface MediaTypeFormErrors {
  code?: string;
  name?: string;
  description?: string;
}

// ==================== 组件Props类型 ====================

/** 媒体类型列表组件属性 */
export interface MediaTypeListProps {
  items: MediaTypeItem[];
  isLoading: boolean;
  onEdit: (item: MediaTypeItem) => void;
  onDelete: (item: MediaTypeItem) => void;
}

/** 媒体类型对话框组件属性 */
export interface MediaTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMediaTypeInput) => Promise<void>;
  initialData?: MediaTypeItem | null;
  isSubmitting: boolean;
  title: string;
}

/** 媒体类型搜索表单组件属性 */
export interface MediaTypeSearchFormProps {
  onSearch: (params: SearchMediaTypeInput) => void;
  onClear: () => void;
}

// ==================== 状态管理类型 ====================

/** 媒体类型Store状态 */
export interface MediaTypeStore {
  // 搜索参数
  searchName: string;
  searchCode: string;

  // 状态方法
  setSearchName: (name: string) => void;
  setSearchCode: (code: string) => void;
  clearSearch: () => void;
}

// ==================== 常量定义 ====================

/** 媒体类型代码预设值 */
export const MEDIA_TYPE_CODES = {
  GOVERNMENT: 'government',
  SELF_MEDIA: 'self_media',
  NEWS: 'news',
  SOCIAL: 'social',
  BLOG: 'blog',
  FORUM: 'forum',
  VIDEO: 'video',
  PODCAST: 'podcast',
} as const;

/** 媒体类型代码选项 */
export const MEDIA_TYPE_CODE_OPTIONS = [
  { value: MEDIA_TYPE_CODES.GOVERNMENT, label: '政府部门' },
  { value: MEDIA_TYPE_CODES.SELF_MEDIA, label: '自媒体' },
  { value: MEDIA_TYPE_CODES.NEWS, label: '新闻媒体' },
  { value: MEDIA_TYPE_CODES.SOCIAL, label: '社交媒体' },
  { value: MEDIA_TYPE_CODES.BLOG, label: '博客' },
  { value: MEDIA_TYPE_CODES.FORUM, label: '论坛' },
  { value: MEDIA_TYPE_CODES.VIDEO, label: '视频平台' },
  { value: MEDIA_TYPE_CODES.PODCAST, label: '播客' },
] as const;

// ==================== 验证规则 ====================

/** 表单验证规则 */
export const VALIDATION_RULES = {
  code: {
    required: '媒体类型代码不能为空',
    minLength: { value: 2, message: '代码长度至少2个字符' },
    maxLength: { value: 50, message: '代码长度不能超过50个字符' },
    pattern: {
      value: /^[a-z0-9_]+$/,
      message: '代码只能包含小写字母、数字和下划线',
    },
  },
  name: {
    required: '媒体类型名称不能为空',
    minLength: { value: 2, message: '名称长度至少2个字符' },
    maxLength: { value: 100, message: '名称长度不能超过100个字符' },
  },
  description: {
    maxLength: { value: 500, message: '描述长度不能超过500个字符' },
  },
} as const;

/** 验证规则类型 */
export type ValidationRule = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};
