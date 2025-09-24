/**
 * 数据清洗相关的 DTO 定义
 */

export interface RawDataDto {
  id: string;
  source: string;
  content: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface CleanedDataDto {
  id: string;
  source: string;
  cleanedContent: string;
  originalContent: string;
  cleaningRules: string[];
  metadata?: Record<string, any>;
  processedAt: Date;
  status: 'success' | 'failed' | 'partial';
  errors?: string[];
}

export interface DataCleaningRuleDto {
  name: string;
  description: string;
  pattern?: string;
  replacement?: string;
  enabled: boolean;
}

export interface DataCleaningConfigDto {
  rules: DataCleaningRuleDto[];
  options: {
    removeHtml: boolean;
    removeUrls: boolean;
    removeEmojis: boolean;
    normalizeWhitespace: boolean;
    removeSpecialChars: boolean;
    minLength: number;
    maxLength: number;
  };
}
