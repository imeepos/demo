import { PointLayer, Scene, type ILayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { cn } from '@sker/ui';
import { useEffect, useRef, useState } from 'react';
import type { MapProps, SentimentEvent } from '../../types/map';

// L7 点击事件类型定义
interface L7ClickEvent {
  lngLat?: {
    lng: number;
    lat: number;
  };
  feature?: unknown;
}

/**
 * 基于 L7 引擎的舆情事件地图组件
 * 职责：使用L7地理空间数据可视化引擎展示中国地图和舆情事件的地理位置分布
 */
export function L7EventMap({
  events,
  onEventClick,
  height = 400,
  className,
  enableCluster = true,
  clusterRadius = 50,
  minClusterSize = 2,
}: MapProps & { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 初始化L7场景
  useEffect(() => {
    if (!containerRef.current) return;

    const initScene = () => {
      try {
        const scene = new Scene({
          id: containerRef.current!,
          map: new GaodeMap({
            style: 'light',
            center: [104, 35.5],
            zoom: 4,
            token: 'd2f3394e4d2807b003a50a8a6f4bb6bb',
          }),
        });

        scene.on('loaded', () => {
          setIsReady(true);
        });

        sceneRef.current = scene;
      } catch (error) {
        console.error('L7场景初始化失败:', error);
      }
    };

    initScene();

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
      }
    };
  }, []);

  // 更新事件数据图层
  useEffect(() => {
    if (!sceneRef.current || !isReady || !events.length) return;

    const scene = sceneRef.current;

    // 移除现有的事件图层
    const layers = scene.getLayers();
    layers.forEach((layer: ILayer) => {
      if (layer.name === 'event-points') {
        scene.removeLayer(layer);
      }
    });

    // 准备点数据，过滤掉无效的位置数据
    const validEvents = events.filter(
      event =>
        event.location &&
        typeof event.location.lng === 'number' &&
        typeof event.location.lat === 'number',
    );

    const pointData = validEvents.map(event => ({
      lng: event.location.lng,
      lat: event.location.lat,
      title: event.title,
      sentiment: event.sentiment,
      hotness: event.hotness,
      address: event.address,
      timestamp: event.timestamp,
    }));

    // 创建事件点图层，根据是否启用聚合采用不同配置
    const pointLayer = new PointLayer({ name: 'event-points' });

    if (enableCluster && validEvents.length >= minClusterSize) {
      // 启用聚合
      pointLayer
        .source(pointData, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
          cluster: true,
          clusterOptions: {
            radius: clusterRadius,
          },
        })
        .size('point_count', [12, 40])
        .color('point_count', [
          '#51cf66', // 1-3个事件：绿色
          '#ffd43b', // 4-6个事件：黄色
          '#ff8c42', // 7-10个事件：橙色
          '#ff6b6b', // 10+个事件：红色
        ])
        .shape('circle')
        .style({
          opacity: 0.8,
          strokeWidth: 2,
          stroke: '#fff',
        });
    } else {
      // 不启用聚合，按情感类型着色
      pointLayer
        .source(pointData, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        })
        .size('hotness', [8, 24])
        .color('sentiment', (sentiment: SentimentEvent['sentiment']) =>
          getSentimentColor(sentiment),
        )
        .shape('circle')
        .style({
          opacity: 0.8,
          strokeWidth: 2,
          stroke: '#fff',
        });
    }

    // 添加点击事件
    pointLayer.on('click', (e: L7ClickEvent) => {
      if (onEventClick) {
        const lngLat = e.lngLat;
        if (lngLat) {
          const event = validEvents.find(
            event =>
              Math.abs(event.location.lng - lngLat.lng) < 0.0001 &&
              Math.abs(event.location.lat - lngLat.lat) < 0.0001,
          );
          if (event) {
            onEventClick(event);
          }
        }
      }
    });

    scene.addLayer(pointLayer);
  }, [events, isReady, onEventClick]);

  return (
    <div className={cn('relative w-full h-full bg-gray-100', className)} style={{ height }}>
      <div ref={containerRef} className="w-full h-full" />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <div className="text-sm text-gray-600">L7 地图加载中...</div>
        </div>
      )}
    </div>
  );
}

// 辅助函数：根据情感类型获取颜色
function getSentimentColor(sentiment: SentimentEvent['sentiment']): string {
  switch (sentiment) {
    case 'positive':
      return '#52c41a'; // 绿色
    case 'negative':
      return '#ff4d4f'; // 红色
    case 'neutral':
      return '#1890ff'; // 蓝色
    default:
      return '#d9d9d9'; // 灰色
  }
}
