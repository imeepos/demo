/**
 * 舆情基本信息管理系统 - 核心数据类型定义
 *
 * 本文件定义了舆情管理系统中使用的所有核心数据类型，
 * 确保类型安全和数据一致性。
 */

// ============================================================================
// 基础类型定义
// ============================================================================

/** 情感类型 */
export type SentimentType =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'mixed'
  | 'unknown';

/** 紧急程度等级 */
export type UrgencyLevel = 'very-low' | 'low' | 'medium' | 'high' | 'critical';

/** 趋势方向 */
export type TrendDirection = 'up' | 'down' | 'stable';

/** 媒体类型 */
export type MediaType =
  | 'news'
  | 'social'
  | 'forum'
  | 'video'
  | 'blog'
  | 'wechat';

/** 地理层级 */
export type GeographicLevel = 'country' | 'province' | 'city' | 'district';

/** 状态类型 */
export type StatusType =
  | 'online'
  | 'offline'
  | 'busy'
  | 'away'
  | 'error'
  | 'success'
  | 'warning'
  | 'loading';

// ============================================================================
// 舆情数据类型
// ============================================================================

/** 舆情数据项 */
export interface SentimentData {
  /** 唯一标识符 */
  id: string;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 情感类型 */
  sentiment: SentimentType;
  /** 情感分数 (0-1) */
  sentimentScore: number;
  /** 置信度 (0-1) */
  confidence: number;
  /** 数据源信息 */
  source: SourceInfo;
  /** 发布时间 */
  timestamp: Date;
  /** 地理位置信息 */
  location?: LocationInfo;
  /** 关键词 */
  keywords: string[];
  /** 指标数据 */
  metrics: MetricsData;
  /** 标签 */
  tags: string[];
  /** 附件信息 */
  attachments?: AttachmentInfo[];
}

/** 数据源信息 */
export interface SourceInfo {
  /** 数据源ID */
  id: string;
  /** 数据源名称 */
  name: string;
  /** 媒体类型 */
  type: MediaType;
  /** 原始URL */
  url?: string;
  /** 图标 */
  icon?: string;
  /** 是否认证 */
  verified?: boolean;
  /** 关注者数量 */
  followers?: number;
  /** 影响力评分 */
  influence?: number;
}

/** 地理位置信息 */
export interface LocationInfo {
  /** 地区名称 */
  region: string;
  /** 地理层级 */
  level: GeographicLevel;
  /** 坐标 [经度, 纬度] */
  coordinates?: [number, number];
  /** 行政区划代码 */
  areaCode?: string;
}

/** 指标数据 */
export interface MetricsData {
  /** 阅读量/浏览量 */
  views: number;
  /** 互动量（点赞、评论、转发等） */
  engagement: number;
  /** 覆盖范围 */
  reach: number;
  /** 影响力评分 */
  influence: number;
  /** 传播速度 */
  velocity?: number;
  /** 病毒性系数 */
  virality?: number;
}

/** 附件信息 */
export interface AttachmentInfo {
  /** 附件ID */
  id: string;
  /** 文件名 */
  name: string;
  /** 文件类型 */
  type: 'image' | 'video' | 'audio' | 'document';
  /** 文件大小（字节） */
  size: number;
  /** 文件URL */
  url: string;
  /** 缩略图URL */
  thumbnail?: string;
}

// ============================================================================
// 趋势分析类型
// ============================================================================

/** 趋势数据点 */
export interface TrendDataPoint {
  /** 时间戳 */
  timestamp: Date;
  /** 数值映射 */
  values: Record<string, number>;
  /** 元数据 */
  metadata?: {
    /** 事件标记 */
    events?: EventMarker[];
    /** 异常点 */
    anomalies?: AnomalyPoint[];
  };
}

/** 事件标记 */
export interface EventMarker {
  /** 事件ID */
  id: string;
  /** 时间戳 */
  timestamp: Date;
  /** 事件标题 */
  title: string;
  /** 事件描述 */
  description?: string;
  /** 事件类型 */
  type: SentimentType | 'crisis';
  /** 影响程度 */
  impact: 'low' | 'medium' | 'high';
  /** 事件标签 */
  tags?: string[];
}

/** 异常点数据 */
export interface AnomalyPoint {
  /** 时间戳 */
  timestamp: Date;
  /** 实际值 */
  value: number;
  /** 预期值 */
  expectedValue: number;
  /** 偏差程度 */
  deviation: number;
  /** 异常严重程度 */
  severity: 'low' | 'medium' | 'high';
  /** 异常原因 */
  reason?: string;
}

// ============================================================================
// 预警系统类型
// ============================================================================

/** 预警信息 */
export interface AlertInfo {
  /** 预警ID */
  id: string;
  /** 预警标题 */
  title: string;
  /** 预警描述 */
  description: string;
  /** 预警等级 */
  level: AlertLevel;
  /** 预警状态 */
  status: AlertStatus;
  /** 紧急程度 */
  urgency: UrgencyLevel;
  /** 数据源 */
  source: SourceInfo;
  /** 触发时间 */
  timestamp: Date;
  /** 相关关键词 */
  keywords: string[];
  /** 情感倾向 */
  sentiment: SentimentType;
  /** 地理位置 */
  location?: LocationInfo;
  /** 指标数据 */
  metrics: MetricsData;
  /** 处理人员 */
  assignee?: UserInfo;
  /** 优先级 */
  priority: 'low' | 'medium' | 'high' | 'urgent';
  /** 标签 */
  tags: string[];
  /** 处理进度 */
  processing?: ProcessingInfo;
}

/** 预警等级 */
export type AlertLevel = 'info' | 'warning' | 'error' | 'critical';

/** 预警状态 */
export type AlertStatus =
  | 'new'
  | 'acknowledged'
  | 'processing'
  | 'resolved'
  | 'closed'
  | 'escalated';

/** 用户信息 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 用户名 */
  name: string;
  /** 头像URL */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 角色 */
  role?: string;
}

/** 处理进度信息 */
export interface ProcessingInfo {
  /** 进度百分比 (0-100) */
  progress: number;
  /** 当前步骤 */
  currentStep: string;
  /** 预估完成时间（分钟） */
  estimatedTime?: number;
  /** 处理历史 */
  history?: ProcessingStep[];
}

/** 处理步骤 */
export interface ProcessingStep {
  /** 步骤ID */
  id: string;
  /** 步骤名称 */
  name: string;
  /** 完成时间 */
  completedAt: Date;
  /** 处理人 */
  operator: UserInfo;
  /** 备注 */
  notes?: string;
}

// ============================================================================
// 地理分布类型
// ============================================================================

/** 地理数据 */
export interface GeographicData {
  /** 地区ID */
  regionId: string;
  /** 地区名称 */
  regionName: string;
  /** 坐标 [经度, 纬度] */
  coordinates: [number, number];
  /** 地理层级 */
  level: GeographicLevel;
  /** 父级地区 */
  parentRegion?: string;
  /** 数值映射 */
  values: Record<string, number>;
  /** 元数据 */
  metadata?: {
    /** 人口数量 */
    population?: number;
    /** 面积（平方公里） */
    area?: number;
    /** 相关事件 */
    events?: EventInfo[];
  };
}

/** 地区信息 */
export interface RegionInfo {
  /** 地区ID */
  id: string;
  /** 地区名称 */
  name: string;
  /** 地理层级 */
  level: GeographicLevel;
  /** 坐标 [经度, 纬度] */
  coordinates: [number, number];
  /** 边界框 [[西南经度, 西南纬度], [东北经度, 东北纬度]] */
  bounds: [[number, number], [number, number]];
  /** 数据映射 */
  data: Record<string, number>;
  /** 排名信息 */
  ranking?: {
    /** 指标类型 */
    metric: string;
    /** 排名 */
    rank: number;
    /** 总数 */
    total: number;
  };
}

/** 事件信息 */
export interface EventInfo {
  /** 事件ID */
  id: string;
  /** 事件标题 */
  title: string;
  /** 发生时间 */
  timestamp: Date;
  /** 严重程度 */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** 坐标 [经度, 纬度] */
  coordinates: [number, number];
  /** 影响范围（公里） */
  radius?: number;
}

// ============================================================================
// 搜索和筛选类型
// ============================================================================

/** 搜索筛选条件 */
export interface SearchFilters {
  /** 关键词 */
  keyword: string;
  /** 数据源 */
  dataSources: string[];
  /** 时间范围 */
  timeRange: {
    start: Date;
    end: Date;
    preset?: string;
  };
  /** 情感类型 */
  sentiments: SentimentType[];
  /** 地区 */
  regions: string[];
  /** 分类 */
  categories: string[];
  /** 语言 */
  languages: string[];
  /** 高级选项 */
  advanced: {
    /** 精确匹配 */
    exactMatch: boolean;
    /** 排除关键词 */
    excludeKeywords: string[];
    /** 最小互动量 */
    minEngagement: number;
    /** 包含图片 */
    hasImages: boolean;
    /** 包含视频 */
    hasVideos: boolean;
    /** 作者已认证 */
    authorVerified: boolean;
  };
}

/** 搜索建议 */
export interface SearchSuggestion {
  /** 建议类型 */
  type: 'keyword' | 'entity' | 'topic' | 'hashtag';
  /** 建议值 */
  value: string;
  /** 显示标签 */
  label: string;
  /** 频次 */
  frequency?: number;
  /** 分类 */
  category?: string;
}

/** 保存的搜索 */
export interface SavedSearch {
  /** 搜索ID */
  id: string;
  /** 搜索名称 */
  name: string;
  /** 筛选条件 */
  filters: SearchFilters;
  /** 创建时间 */
  timestamp: Date;
  /** 结果数量 */
  resultCount?: number;
  /** 是否公开 */
  isPublic?: boolean;
  /** 创建者 */
  creator?: UserInfo;
}

// ============================================================================
// 报告生成类型
// ============================================================================

/** 报告配置 */
export interface ReportConfig {
  /** 报告标题 */
  title: string;
  /** 报告描述 */
  description?: string;
  /** 时间范围 */
  dateRange: {
    start: Date;
    end: Date;
  };
  /** 数据源 */
  dataSources: string[];
  /** 报告章节 */
  sections: ReportSection[];
  /** 样式配置 */
  style: ReportStyle;
  /** 导出格式 */
  format: ExportFormat;
}

/** 报告章节 */
export interface ReportSection {
  /** 章节ID */
  id: string;
  /** 章节类型 */
  type: 'overview' | 'chart' | 'table' | 'text' | 'timeline';
  /** 章节标题 */
  title: string;
  /** 是否启用 */
  enabled: boolean;
  /** 章节配置 */
  config: Record<string, any>;
}

/** 报告样式 */
export interface ReportStyle {
  /** 主题 */
  theme: 'light' | 'dark' | 'minimal';
  /** 主色调 */
  primaryColor: string;
  /** 字体系列 */
  fontFamily: string;
  /** Logo URL */
  logoUrl?: string;
  /** 页眉页脚 */
  headerFooter: boolean;
}

/** 导出格式 */
export type ExportFormat =
  | 'pdf'
  | 'docx'
  | 'html'
  | 'excel'
  | 'pptx'
  | 'csv'
  | 'json';

/** 报告模板 */
export interface ReportTemplate {
  /** 模板ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板描述 */
  description?: string;
  /** 报告配置 */
  config: ReportConfig;
  /** 缩略图 */
  thumbnail?: string;
  /** 是否默认 */
  isDefault?: boolean;
  /** 创建者 */
  creator?: UserInfo;
  /** 创建时间 */
  createdAt: Date;
}

// ============================================================================
// 组件通用类型
// ============================================================================

/** 分页信息 */
export interface PaginationInfo {
  /** 当前页码 */
  current: number;
  /** 每页数量 */
  pageSize: number;
  /** 总数 */
  total: number;
  /** 总页数 */
  totalPages: number;
}

/** 排序配置 */
export interface SortConfig {
  /** 排序字段 */
  field: string;
  /** 排序方向 */
  direction: 'asc' | 'desc';
}

/** 筛选配置 */
export interface FilterConfig {
  /** 字段名 */
  field: string;
  /** 操作符 */
  operator:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'greaterThan'
    | 'lessThan'
    | 'between';
  /** 筛选值 */
  value: any;
}

/** API 响应包装 */
export interface ApiResponse<T = any> {
  /** 是否成功 */
  success: boolean;
  /** 响应数据 */
  data?: T;
  /** 错误信息 */
  error?: string;
  /** 错误代码 */
  code?: string;
  /** 分页信息 */
  pagination?: PaginationInfo;
  /** 时间戳 */
  timestamp: Date;
}

/** 加载状态 */
export interface LoadingState {
  /** 是否加载中 */
  loading: boolean;
  /** 错误信息 */
  error?: string;
  /** 重试次数 */
  retryCount?: number;
}
