/**
 * 爬虫服务相关的 DTO 定义
 */

export interface CrawlTaskDto {
  id: string;
  url: string;
  type: 'post' | 'comment' | 'profile' | 'page';
  source: string; // 来源平台，如微博、知乎、小红书等
  config?: CrawlConfigDto;
  metadata?: Record<string, any>;
  createdAt: Date;
  priority?: number; // 优先级，1-10，数字越大优先级越高
}

export interface CrawlResultDto {
  id: string;
  taskId: string;
  url: string;
  source: string;
  type: 'post' | 'comment' | 'profile' | 'page';
  content: string;
  title?: string;
  author?: string;
  publishTime?: Date;
  metadata?: Record<string, any>;
  crawledAt: Date;
  status: 'success' | 'failed' | 'partial';
  errors?: string[];
  processingTime?: number;
}

export interface CrawlConfigDto {
  delay?: number; // 延迟时间（毫秒）
  timeout?: number; // 超时时间（毫秒）
  retries?: number; // 重试次数
  headers?: Record<string, string>; // 自定义请求头
  cookies?: string; // Cookie
  userAgent?: string; // User-Agent
  javascript?: boolean; // 是否执行JavaScript
  waitFor?: string; // 等待元素出现的选择器
  extractRules?: ExtractRuleDto[]; // 提取规则
}

export interface ExtractRuleDto {
  name: string;
  selector: string; // CSS选择器或XPath
  attribute?: string; // 提取属性，不指定则提取文本内容
  multiple?: boolean; // 是否提取多个元素
  required?: boolean; // 是否必需
}

export interface BatchCrawlTaskDto {
  batchId: string;
  tasks: CrawlTaskDto[];
  config?: CrawlConfigDto;
  createdAt: Date;
}