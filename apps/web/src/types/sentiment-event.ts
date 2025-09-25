import { z } from 'zod';
import type { SentimentEventResponseDto, CreateSentimentEventDto } from '@sker/sdk';

// 使用API返回的实际类型，包含基本字段
export type SentimentEvent = SentimentEventResponseDto;
export type CreateSentimentEventRequest = CreateSentimentEventDto;

// 创建舆情事件的表单验证schema
export const createSentimentEventSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(500, '标题不能超过500个字符'),
  content: z.string().optional().or(z.literal('')),
  score: z.number().min(0, '情感分数不能小于0').max(1, '情感分数不能大于1'),
  latitude: z.number().min(-90, '纬度必须在-90到90之间').max(90, '纬度必须在-90到90之间'),
  longitude: z.number().min(-180, '经度必须在-180到180之间').max(180, '经度必须在-180到180之间'),
  address: z.string().max(500, '地址不能超过500个字符').optional().or(z.literal('')),
  source: z.string().min(1, '信息来源不能为空').max(200, '信息来源不能超过200个字符'),
  timestamp: z.date(),
  hotness: z.number().min(1, '热度值不能小于1').max(10, '热度值不能大于10').optional(),
  tags: z.array(z.string()).optional(),
});

// 查询舆情事件的表单验证schema
export const querySentimentEventSchema = z.object({
  title: z.string().optional().or(z.literal('')),
  minScore: z.number().min(0, '最小情感分数不能小于0').max(1, '最小情感分数不能大于1').optional(),
  maxScore: z.number().min(0, '最大情感分数不能小于0').max(1, '最大情感分数不能大于1').optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
});

// 更新舆情事件的表单验证schema
export const updateSentimentEventSchema = createSentimentEventSchema.partial();

export type CreateSentimentEventInput = z.infer<typeof createSentimentEventSchema>;
export type QuerySentimentEventInput = z.infer<typeof querySentimentEventSchema>;
export type UpdateSentimentEventInput = z.infer<typeof updateSentimentEventSchema>;
