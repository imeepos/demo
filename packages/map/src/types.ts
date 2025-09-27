/**
 * 地图组件库公共类型定义
 */

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface L7MouseEvent {
  lngLat?: {
    lng: number;
    lat: number;
  };
  feature?: {
    properties?: Record<string, unknown>;
  };
}

export interface SentimentEvent {
  id: string;
  title: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  location: GeoCoordinate;
  address: string;
  source: string;
  timestamp: string;
  hotness: number;
  tags?: string[];
}

export interface SearchResult {
  id: string;
  name: string;
  address: string;
  location: GeoCoordinate;
  district: string;
  city: string;
  province: string;
}

export interface MapConfig {
  defaultCenter: GeoCoordinate;
  defaultZoom: number;
  apiKey: string;
}

export interface ClusterOptions {
  enabled: boolean;
  radius: number;
  minSize: number;
}
