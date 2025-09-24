import { cn } from '@sker/ui';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { SentimentEvent, MapProps } from '../../types/map';

/**
 * 基于 ECharts 的舆情事件地图组件
 * 职责：展示中国地图和舆情事件的地理位置分布
 */
export function EventMap({
  events,
  onEventClick,
  height = 400,
  className,
}: MapProps & { className?: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ECharts | null>(null);
  const [mapData, setMapData] = useState<object | null>(null);

  // 加载中国地图数据
  useEffect(() => {
    const loadChinaMap = async () => {
      try {
        // 使用 ECharts 内置的中国地图数据
        const response = await fetch(
          'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
        );
        const chinaGeoJSON = await response.json();

        // 注册地图
        echarts.registerMap('china', chinaGeoJSON);
        setMapData(chinaGeoJSON);
      } catch (error) {
        console.error('加载中国地图数据失败:', error);
        // 如果网络加载失败，使用简化的地图配置
        setMapData({}); // 空对象表示使用默认配置
      }
    };

    loadChinaMap();
  }, []);

  // 初始化和更新图表
  useEffect(() => {
    if (!chartRef.current || !mapData) return;

    // 初始化 ECharts 实例
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    const chart = chartInstanceRef.current;

    // 准备数据：将事件转换为 ECharts 散点数据
    const scatterData = events.map(event => ({
      name: event.title,
      value: [event.location.lng, event.location.lat, event.hotness],
      itemStyle: {
        color: getSentimentColor(event.sentiment),
        shadowBlur: 10,
        shadowColor: getSentimentColor(event.sentiment),
      },
      event: event, // 保存完整事件数据用于点击处理
    }));

    // 配置图表选项
    const option = {
      backgroundColor: '#f5f5f5',
      title: {
        text: '舆情事件地理分布',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.seriesType === 'scatter' && params.data?.event) {
            const event = params.data.event;
            return `
              <div style="max-width: 200px;">
                <div style="font-weight: bold; margin-bottom: 5px;">${event.title}</div>
                <div style="font-size: 12px; color: #666; margin-bottom: 3px;">地址: ${event.address}</div>
                <div style="font-size: 12px; color: #666; margin-bottom: 3px;">热度: ${event.hotness}/10</div>
                <div style="font-size: 12px; color: #666; margin-bottom: 3px;">情感: ${getSentimentText(event.sentiment)}</div>
                <div style="font-size: 12px; color: #666;">时间: ${new Date(event.timestamp).toLocaleString()}</div>
              </div>
            `;
          }
          return params.name;
        },
      },
      geo: {
        map: 'china',
        roam: true, // 允许缩放和平移
        zoom: 1.2,
        center: [104.195397, 35.86166], // 中国地理中心
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1,
          areaColor: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 20,
        },
        emphasis: {
          itemStyle: {
            areaColor: '#f0f0f0',
          },
        },
      },
      series: [
        {
          name: '舆情事件',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: scatterData,
          symbolSize: (val: number[]) => Math.max(6, (val[2] || 1) * 2), // 根据热度调整点的大小
          symbol: 'circle',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
          emphasis: {
            scale: true,
            scaleSize: 1.5,
          },
        },
      ],
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        data: [
          { name: '正面', icon: 'circle', textStyle: { color: '#52c41a' } },
          { name: '负面', icon: 'circle', textStyle: { color: '#ff4d4f' } },
          { name: '中性', icon: 'circle', textStyle: { color: '#1890ff' } },
        ],
      },
    };

    // 设置图表配置
    chart.setOption(option);

    // 添加点击事件监听器
    const handleClick = (params: any) => {
      if (params.seriesType === 'scatter' && params.data?.event) {
        onEventClick?.(params.data.event);
      }
    };

    chart.on('click', handleClick);

    // 清理函数
    return () => {
      chart.off('click', handleClick);
    };
  }, [events, mapData, height, onEventClick]);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 组件卸载时清理图表实例
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={cn('relative w-full', className)} style={{ height }}>
      <div ref={chartRef} className="w-full h-full" />

      {/* 事件统计信息 */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-md">
        <div className="text-sm font-medium text-gray-800">
          共 {events.length} 个事件
        </div>
        <div className="text-xs text-gray-600 mt-1">
          正面: {events.filter(e => e.sentiment === 'positive').length} · 负面:{' '}
          {events.filter(e => e.sentiment === 'negative').length} · 中性:{' '}
          {events.filter(e => e.sentiment === 'neutral').length}
        </div>
      </div>
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

// 辅助函数：获取情感文本
function getSentimentText(sentiment: SentimentEvent['sentiment']): string {
  switch (sentiment) {
    case 'positive':
      return '正面';
    case 'negative':
      return '负面';
    case 'neutral':
      return '中性';
    default:
      return '未知';
  }
}
