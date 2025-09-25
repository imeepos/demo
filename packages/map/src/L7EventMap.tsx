import { GaodeMap, PointLayer, Popup, Scene, type ILayer, LayerPopup } from '@antv/l7';
import { cn } from '@sker/ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface MapProps {
  events: SentimentEvent[];
  enableCluster?: boolean; // 是否启用聚合
  clusterRadius?: number; // 聚合半径，默认50
  minClusterSize?: number; // 最小聚合数量，默认2
}

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
export interface L7MouseEvent {
  lngLat?: {
    lng: number;
    lat: number;
  };
  feature?: {
    properties?: {
      [key: string]: any;
    };
  };
}

/**
 * 基于 L7 引擎的舆情事件地图组件
 * 职责：使用L7地理空间数据可视化引擎展示中国地图和舆情事件的地理位置分布
 */
export function L7EventMap({
  events,
  className,
  enableCluster = true,
  clusterRadius = 50,
  minClusterSize = 2,
}: MapProps & { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const popupRef = useRef<Popup | null>(null);
  const layerPopupRef = useRef<LayerPopup | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // 缓存处理过的数据
  const processedData = useMemo(() => {
    const validEvents = events.filter(
      event =>
        event.location &&
        typeof event.location.lng === 'number' &&
        typeof event.location.lat === 'number' &&
        !isNaN(event.location.lng) &&
        !isNaN(event.location.lat) &&
        Math.abs(event.location.lng) <= 180 &&
        Math.abs(event.location.lat) <= 90
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
  }, [events]);

  // 优化的颜色获取函数
  const getSentimentColorOptimized = useCallback(
    (sentiment: SentimentEvent['sentiment']): string => {
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
    },
    []
  );

  // 创建弹窗内容函数 - 兼容LayerPopup格式
  const createPopupContent = useCallback(
    (properties: any) => {
      const sentimentText = {
        positive: '正面',
        negative: '负面',
        neutral: '中性',
      }[properties.sentiment] || '未知';

      const sentimentColor = getSentimentColorOptimized(properties.sentiment);

      return `
      <div style="padding: 12px; min-width: 280px; max-width: 320px; font-family: Arial, sans-serif;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-weight: 600; font-size: 14px; color: #333; margin: 0; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${properties.title || '未知标题'}</h3>
          <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; background-color: ${sentimentColor}20; color: ${sentimentColor};">
            ${sentimentText}
          </span>
        </div>
        <p style="font-size: 12px; color: #666; margin: 0 0 8px 0; line-height: 1.4; max-height: 60px; overflow: hidden;">${properties.content || '暂无内容'}</p>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #999; margin-bottom: 4px;">
          <span>🏢 ${properties.source || '未知来源'}</span>
          <span>📍 ${properties.address || '未知地址'}</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #999;">
          <span>🔥 热度: ${properties.hotness || 0}</span>
          <span>🕒 ${properties.timestamp || ''}</span>
        </div>
        ${
          properties.tags && properties.tags.length > 0
            ? `
          <div style="margin-top: 8px;">
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${properties.tags.map((tag: string) => `<span style="padding: 2px 6px; background-color: #e3f2fd; color: #1976d2; font-size: 12px; border-radius: 4px;">${tag}</span>`).join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
    },
    [getSentimentColorOptimized]
  );

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
        setLoading(false);
      });

      // 创建弹窗实例
      const popup = new Popup({
        closeButton: true,
        closeOnClick: false,
        className: 'custom-popup',
      });
      popupRef.current = popup;
      sceneRef.current = scene;
    } catch (error) {
      console.error('L7场景初始化失败:', error);
    }
  };
  // 初始化L7场景
  useEffect(() => {
    if (!containerRef.current) return;
    initScene();
    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
      }
    };
  }, []);

  // 更新事件数据图层（添加防抖机制）
  useEffect(() => {
    if (!sceneRef.current || !isReady || !processedData.validEvents.length)
      return;

    // 使用防抖延迟更新图层，避免频繁重建
    const scene = sceneRef.current;
    if (!scene) return;

    const { validEvents, pointData } = processedData;

    // 清理现有图层，但要确保场景状态稳定
    const existingLayers = scene.getLayers();
    const layersToRemove = existingLayers.filter(
      (layer: ILayer) =>
        layer.name === 'event-points' || layer.name === 'cluster-text'
    );

    // 批量移除图层，避免多次渲染
    layersToRemove.forEach((layer: ILayer) => {
      scene.removeLayer(layer);
    });

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
            field: 'point_count',
            method: 'sum',
            radius: clusterRadius,
            minZoom: 0,
            maxZoom: 20,
          },
        })
        .size('point_count', (count: number) => {
          if (count === 1) return 14;
          if (count <= 3) return 20;
          if (count <= 6) return 28;
          if (count <= 10) return 36;
          return 44;
        })
        .color('point_count', (count: number) => {
          if (count === 1) return getSentimentColorOptimized('neutral');
          if (count <= 3) return '#52c41a'; // 绿色
          if (count <= 6) return '#faad14'; // 黄色
          if (count <= 10) return '#fa8c16'; // 橙色
          return '#f5222d'; // 红色
        })
        .shape('circle')
        .style({
          opacity: 0.9,
          strokeWidth: 2,
          stroke: '#ffffff',
        })
        .select({
          color: '#1890ff',
        })
        .active({
          color: '#0050b3',
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
        .size('hotness', (hotness: number) => {
          // 根据热度值动态计算大小，范围在10-30之间
          return Math.max(10, Math.min(30, hotness * 2.5 + 5));
        })
        .color('sentiment', (sentiment: SentimentEvent['sentiment']) =>
          getSentimentColorOptimized(sentiment)
        )
        .shape('circle')
        .style({
          opacity: 0.8,
          strokeWidth: 2,
          stroke: '#ffffff',
        })
        .select({
          color: '#1890ff',
        })
        .active({
          color: '#0050b3',
        });
    }

    // 添加鼠标悬停效果
    pointLayer.on('mousemove', (e: L7MouseEvent) => {
      // 通过修改容器的CSS样式来改变鼠标样式
      if (containerRef.current) {
        containerRef.current.style.cursor = 'pointer';
      }
    });

    pointLayer.on('mouseleave', () => {
      // 恢复默认鼠标样式
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    });

    // 添加图层到场景
    scene.addLayer(pointLayer);

    // 如果启用聚合，添加单独的文本图层显示聚合数量
    if (enableCluster && validEvents.length >= minClusterSize) {
      // 延迟添加文本图层，确保点图层已经稳定渲染
      if (sceneRef.current) {
        const textLayer = new PointLayer({ name: 'cluster-text' })
          .source(pointData, {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat',
            },
            cluster: true,
            clusterOptions: {
              field: 'point_count',
              method: 'sum',
              radius: clusterRadius,
              minZoom: 0,
              maxZoom: 20,
            },
          })
          .shape('point_count', 'text')
          .size(14)
          .color('#ffffff')
          .style({
            opacity: 1,
            strokeWidth: 1,
            stroke: '#333333',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
          });

        sceneRef.current.addLayer(textLayer);
      }
    }
    return () => {};
  }, [
    processedData,
    isReady,
    enableCluster,
    clusterRadius,
    minClusterSize,
    getSentimentColorOptimized,
    createPopupContent,
  ]);

  return (
    <div
      className={cn(
        'relative w-full h-full bg-gradient-to-br from-blue-50 to-gray-100',
        className
      )}
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 加载状态 */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/90 to-gray-100/90 backdrop-blur-sm">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-3"></div>
          <div className="text-sm text-gray-700 font-medium">地图加载中...</div>
          <div className="text-xs text-gray-500 mt-1">正在初始化地理数据</div>
        </div>
      )}

      {/* 数据统计信息 */}
      {isReady && processedData.validEvents.length > 0 && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <div className="text-xs text-gray-600">
            事件总数:{' '}
            <span className="font-semibold text-blue-600">
              {processedData.validEvents.length}
            </span>
            {enableCluster && <span className="ml-2">聚合已启用</span>}
          </div>
        </div>
      )}

      {/* 图例 */}
      {isReady && !enableCluster && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs font-semibold text-gray-700 mb-2">
            情感分析
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>正面</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>负面</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>中性</span>
            </div>
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {isReady && processedData.validEvents.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg mb-2">📍</div>
            <div className="text-sm">暂无有效的地理数据</div>
          </div>
        </div>
      )}
    </div>
  );
}
