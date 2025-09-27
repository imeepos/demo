/**
 * 地图组件库工具函数
 */

import type { GeoCoordinate, SearchResult, SentimentEvent } from './types';
import { mapConfig, sentimentColors } from './config';

/**
 * 高德地图API工具类
 */
export class AmapService {
  private static readonly BASE_URL = 'https://restapi.amap.com/v3';
  private static readonly API_KEY = mapConfig.apiKey;

  /**
   * 地理编码 - 地址转坐标
   */
  static async geocode(address: string): Promise<GeoCoordinate | null> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/geocode/geo?key=${this.API_KEY}&address=${encodeURIComponent(address)}&city=全国`
      );
      const data = await response.json();

      if (data.status === '1' && data.geocodes?.length > 0) {
        const [lng, lat] = data.geocodes[0].location.split(',').map(Number);
        return { lng, lat };
      }
      return null;
    } catch (error) {
      console.warn('地理编码失败:', error);
      return null;
    }
  }

  /**
   * 逆地理编码 - 坐标转地址
   */
  static async reverseGeocode(coords: GeoCoordinate): Promise<string> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/geocode/regeo?key=${this.API_KEY}&location=${coords.lng},${coords.lat}&extensions=base&batch=false&roadlevel=0`
      );
      const data = await response.json();

      return data.status === '1' && data.regeocode
        ? data.regeocode.formatted_address || ''
        : '';
    } catch (error) {
      console.warn('逆地理编码失败:', error);
      return '';
    }
  }

  /**
   * 地址搜索
   */
  static async searchPlaces(
    query: string,
    maxResults = 10
  ): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    try {
      const response = await fetch(
        `${this.BASE_URL}/place/text?key=${this.API_KEY}&keywords=${encodeURIComponent(query)}&types=&city=&children=1&offset=${maxResults}&page=1&extensions=base`
      );
      const data = await response.json();

      if (data.status === '1' && data.pois) {
        return data.pois.map((poi: any, index: number) => ({
          id: poi.id || `search_${index}`,
          name: poi.name || query,
          address: poi.address || `${poi.pname}${poi.cityname}${poi.adname}`,
          location: {
            lng: parseFloat(poi.location.split(',')[0]),
            lat: parseFloat(poi.location.split(',')[1]),
          },
          district: poi.adname || '',
          city: poi.cityname || '',
          province: poi.pname || '',
        }));
      }
      return [];
    } catch (error) {
      console.warn('地址搜索失败:', error);
      return [];
    }
  }
}

/**
 * 坐标验证
 */
export const validateCoordinate = {
  latitude: (lat: number): boolean => !isNaN(lat) && lat >= -90 && lat <= 90,
  longitude: (lng: number): boolean => !isNaN(lng) && lng >= -180 && lng <= 180,
  coordinate: (coord: GeoCoordinate): boolean =>
    validateCoordinate.latitude(coord.lat) &&
    validateCoordinate.longitude(coord.lng),
};

/**
 * 获取情感颜色
 */
export const getSentimentColor = (
  sentiment: SentimentEvent['sentiment']
): string => sentimentColors[sentiment] || sentimentColors.default;

/**
 * 坐标格式化
 */
export const formatCoordinate = (coord: number, precision = 6): string =>
  coord.toFixed(precision);

/**
 * 转换为度分秒格式
 */
export const convertToDMS = (lat: number, lng: number): string => {
  const formatDMS = (coord: number, isLat: boolean): string => {
    const absolute = Math.abs(coord);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
    const direction = isLat ? (coord >= 0 ? 'N' : 'S') : coord >= 0 ? 'E' : 'W';
    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  return `${formatDMS(lat, true)} ${formatDMS(lng, false)}`;
};

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * 处理事件数据
 */
export const processEventData = (events: SentimentEvent[]) => {
  const validEvents = events.filter(
    event => event.location && validateCoordinate.coordinate(event.location)
  );

  const pointData = validEvents.map(event => ({
    lng: event.location.lng,
    lat: event.location.lat,
    title: event.title,
    sentiment: event.sentiment,
    hotness: event.hotness || 1,
    address: event.address,
    timestamp: event.timestamp,
    score: event.score || 0,
    source: event.source,
    content: event.content,
    tags: event.tags || [],
  }));

  return { validEvents, pointData };
};

/**
 * 本地存储工具
 */
export const storage = {
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`存储失败: ${key}`, error);
    }
  },

  get: <T = any>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.warn(`读取失败: ${key}`, error);
      return defaultValue || null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`删除失败: ${key}`, error);
    }
  },
};
