import {
  GaodeMap,
  LayerPopup,
  PointLayer,
  Popup,
  Scene,
  type ILayer,
} from '@antv/l7';
import { cn } from '@sker/ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SentimentEvent, L7MouseEvent, ClusterOptions } from './types';
import { mapConfig, clusterColors } from './config';
import { getSentimentColor, processEventData, debounce } from './utils';

export interface MapProps {
  events: SentimentEvent[];
  enableCluster?: boolean;
  clusterRadius?: number;
  minClusterSize?: number;
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
  const processedData = useMemo(() => processEventData(events), [events]);

  // 创建弹窗内容函数 - 兼容LayerPopup格式
  const createPopupContent = useCallback(
    (properties: Record<string, unknown>) => {
      const sentimentMap = new Map([
        ['positive', '正面'],
        ['negative', '负面'],
        ['neutral', '中性'],
      ]);
      const sentiment = String(properties.sentiment || '');
      const sentimentText = sentimentMap.get(sentiment) || '未知';

      const sentimentColor = getSentimentColor(
        properties.sentiment as SentimentEvent['sentiment']
      );

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
          Array.isArray(properties.tags) && properties.tags.length > 0
            ? `
          <div style="margin-top: 8px;">
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${properties.tags.map((tag: unknown) => `<span style="padding: 2px 6px; background-color: #e3f2fd; color: #1976d2; font-size: 12px; border-radius: 4px;">${String(tag)}</span>`).join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
    },
    []
  );

  const initScene = () => {
    try {
      const scene = new Scene({
        id: containerRef.current!,
        map: new GaodeMap({
          style: 'light',
          center: [mapConfig.defaultCenter.lng, mapConfig.defaultCenter.lat],
          zoom: mapConfig.defaultZoom,
          token: mapConfig.apiKey,
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
      if (layerPopupRef.current && sceneRef.current) {
        sceneRef.current.removePopup(layerPopupRef.current);
        layerPopupRef.current = null;
      }
      if (popupRef.current && sceneRef.current) {
        sceneRef.current.removePopup(popupRef.current);
        popupRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, []);

  // 更新图层的防抖函数
  const updateLayersDebounced = useMemo(
    () =>
      debounce(() => {
        const scene = sceneRef.current;
        if (!scene || !isReady || !processedData.validEvents.length) return;

        const { validEvents, pointData } = processedData;

        // 清理现有图层
        const existingLayers = scene.getLayers();
        const layersToRemove = existingLayers.filter(
          (layer: ILayer) =>
            layer.name === 'event-points' || layer.name === 'cluster-text'
        );

        layersToRemove.forEach((layer: ILayer) => {
          scene.removeLayer(layer);
        });

        // 创建事件点图层
        const pointLayer = new PointLayer({ name: 'event-points' });

        if (enableCluster && validEvents.length >= minClusterSize) {
          // 启用聚合
          pointLayer
            .source(pointData, {
              parser: { type: 'json', x: 'lng', y: 'lat' },
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
              if (count === 1) return getSentimentColor('neutral');
              if (count <= 3) return clusterColors.small;
              if (count <= 6) return clusterColors.medium;
              if (count <= 10) return clusterColors.large;
              return clusterColors.xlarge;
            })
            .shape('circle')
            .style({ opacity: 0.9, strokeWidth: 2, stroke: '#ffffff' })
            .select({ color: '#1890ff' })
            .active({ color: '#0050b3' });
        } else {
          // 不启用聚合
          pointLayer
            .source(pointData, {
              parser: { type: 'json', x: 'lng', y: 'lat' },
            })
            .size('hotness', (hotness: number) =>
              Math.max(10, Math.min(30, hotness * 2.5 + 5))
            )
            .color('sentiment', getSentimentColor)
            .shape('circle')
            .style({ opacity: 0.8, strokeWidth: 2, stroke: '#ffffff' })
            .select({ color: '#1890ff' })
            .active({ color: '#0050b3' });
        }

        // 鼠标事件
        pointLayer.on('mousemove', () => {
          if (containerRef.current) {
            containerRef.current.style.cursor = 'pointer';
          }
        });

        pointLayer.on('mouseleave', () => {
          if (containerRef.current) {
            containerRef.current.style.cursor = 'grab';
          }
        });

        scene.addLayer(pointLayer);

        // 创建弹窗
        if (layerPopupRef.current) {
          scene.removePopup(layerPopupRef.current);
        }

        const layerPopupFields =
          enableCluster && validEvents.length >= minClusterSize
            ? [
                {
                  field: 'point_count',
                  formatField: (props: any) =>
                    props?.point_count === 1 ? '事件标题' : '事件数量',
                  formatValue: (val: number, props: any) =>
                    val === 1
                      ? props?.title || '单个事件（放大查看详情）'
                      : `${val} 个事件`,
                },
                {
                  field: 'point_count',
                  formatField: (props: any) =>
                    props?.point_count === 1 ? '情感倾向' : '聚合类型',
                  formatValue: (val: number, props: any) => {
                    if (val === 1) {
                      const sentimentMap = {
                        positive: '正面',
                        negative: '负面',
                        neutral: '中性',
                      };
                      return (
                        sentimentMap[
                          props?.sentiment as keyof typeof sentimentMap
                        ] || '未知'
                      );
                    }
                    if (val <= 3) return '小型聚合';
                    if (val <= 6) return '中型聚合';
                    if (val <= 10) return '大型聚合';
                    return '超大聚合';
                  },
                },
                {
                  field: 'point_count',
                  formatField: () => '区域概览',
                  formatValue: (val: number) => {
                    const percentage = (
                      (val / validEvents.length) *
                      100
                    ).toFixed(1);
                    return `包含该区域${percentage}%的事件`;
                  },
                },
                {
                  field: 'point_count',
                  formatField: () => '操作提示',
                  formatValue: (val: number) =>
                    val === 1
                      ? '放大地图查看完整事件详情'
                      : `放大地图查看${val}个具体事件`,
                },
              ]
            : [
                { field: 'title', formatField: () => '标题' },
                {
                  field: 'sentiment',
                  formatField: () => '情感',
                  formatValue: (val: string) => {
                    const map = {
                      positive: '正面',
                      negative: '负面',
                      neutral: '中性',
                    };
                    return map[val as keyof typeof map] || '未知';
                  },
                },
                {
                  field: 'content',
                  formatField: () => '内容',
                  formatValue: (val: string) =>
                    val?.length > 50
                      ? val.substring(0, 50) + '...'
                      : val || '暂无内容',
                },
                { field: 'source', formatField: () => '来源' },
                { field: 'address', formatField: () => '地址' },
                { field: 'hotness', formatField: () => '热度' },
                { field: 'timestamp', formatField: () => '时间' },
              ];

        const layerPopup = new LayerPopup({
          items: [{ layer: pointLayer, fields: layerPopupFields }],
        });

        layerPopupRef.current = layerPopup;
        scene.addPopup(layerPopup);

        // 聚合文本图层
        if (enableCluster && validEvents.length >= minClusterSize) {
          const textLayer = new PointLayer({ name: 'cluster-text' })
            .source(pointData, {
              parser: { type: 'json', x: 'lng', y: 'lat' },
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

          scene.addLayer(textLayer);
        }
      }, 300),
    [processedData, isReady, enableCluster, clusterRadius, minClusterSize]
  );

  // 更新事件数据图层
  useEffect(() => {
    updateLayersDebounced();
  }, [updateLayersDebounced]);

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
