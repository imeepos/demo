import { z } from 'zod';
import type { SentimentIntensityResponseDto, CreateSentimentIntensityDto } from '@sker/sdk';

// 创建情感强度的表单验证 schema
export const createSentimentIntensitySchema = z.object({
  title: z.string().min(1, '标题不能为空').max(255, '标题长度不能超过255个字符'),
  intensity: z.number().min(0, '强度值不能小于0').max(1, '强度值不能大于1'),
  description: z.string().optional(),
});

// 搜索表单验证 schema
export const searchSentimentIntensitySchema = z.object({
  title: z.string().optional(),
  minIntensity: z.number().min(0).max(1).optional(),
  maxIntensity: z.number().min(0).max(1).optional(),
});

// 类型定义
export type CreateSentimentIntensityInput = z.infer<typeof createSentimentIntensitySchema>;
export type SearchSentimentIntensityInput = z.infer<typeof searchSentimentIntensitySchema>;

// 情感强度响应类型（从 SDK 导入）
export type SentimentIntensityItem = SentimentIntensityResponseDto & {
  description?: string; // 可选的描述字段
  isActive?: boolean;   // 可选的状态字段
};
