/**
 * 地图组件库配置文件
 */

import type { MapConfig } from './types';

export const mapConfig: MapConfig = {
  defaultCenter: { lat: 39.9042, lng: 116.4074 }, // 北京
  defaultZoom: 10,
  apiKey:
    (globalThis as any).process?.env?.AMAP_API_KEY ||
    'd2f3394e4d2807b003a50a8a6f4bb6bb', // 环境变量或默认密钥
};

export const sentimentColors = {
  positive: '#52c41a',
  negative: '#ff4d4f',
  neutral: '#1890ff',
  default: '#d9d9d9',
} as const;

export const clusterColors = {
  small: '#52c41a',
  medium: '#faad14',
  large: '#fa8c16',
  xlarge: '#f5222d',
} as const;
