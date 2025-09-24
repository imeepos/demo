/**
 * 地图相关数据类型定义
 * 职责：定义舆情事件地理位置相关的数据结构
 */

export interface GeoCoordinate {
  lat: number;
  lng: number;
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
  hotness: number; // 热度值，影响标记点大小 1-10
  tags?: string[];
}

export interface MapViewport {
  center: GeoCoordinate;
  zoom: number;
}

export interface MapProps {
  events: SentimentEvent[];
  viewport?: MapViewport;
  onEventClick?: (event: SentimentEvent) => void;
  showLegend?: boolean;
  height?: number;
  enableCluster?: boolean; // 是否启用聚合
  clusterRadius?: number; // 聚合半径，默认50
  minClusterSize?: number; // 最小聚合数量，默认2
}
