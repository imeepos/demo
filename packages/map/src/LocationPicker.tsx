import { GaodeMap, Marker, Scene } from '@antv/l7';
import { cn } from '@sker/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface LocationPickerProps {
  value?: GeoCoordinate;
  onChange?: (location: GeoCoordinate, address?: string) => void;
  defaultCenter?: GeoCoordinate;
  zoom?: number;
  enableSearch?: boolean;
  enableAddressDisplay?: boolean;
  placeholder?: string;
  className?: string;
  height?: string | number;
}

export interface L7MouseEvent {
  lngLat?: {
    lng: number;
    lat: number;
  };
}

/**
 * 基于 L7 + 高德地图的地理位置选择器组件
 */
export function LocationPicker({
  value,
  onChange,
  defaultCenter = { lat: 39.9042, lng: 116.4074 }, // 北京
  zoom = 10,
  enableSearch = true,
  enableAddressDisplay = true,
  placeholder = '点击地图选择位置',
  className,
  height = '400px',
}: LocationPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<GeoCoordinate | null>(
    value || null
  );
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [manualInput, setManualInput] = useState({
    lat: value?.lat?.toString() || '',
    lng: value?.lng?.toString() || '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 高德地图地理编码API
  const getAddressFromCoords = useCallback(
    async (coords: GeoCoordinate) => {
      if (!enableAddressDisplay) return '';

      try {
        // 使用高德地图逆地理编码API
        const response = await fetch(
          `https://restapi.amap.com/v3/geocode/regeo?key=d2f3394e4d2807b003a50a8a6f4bb6bb&location=${coords.lng},${coords.lat}&extensions=base&batch=false&roadlevel=0`
        );
        const data = await response.json();

        if (data.status === '1' && data.regeocode) {
          return data.regeocode.formatted_address || '';
        }
        return '';
      } catch (error) {
        console.warn('获取地址信息失败:', error);
        return '';
      }
    },
    [enableAddressDisplay]
  );

  // 搜索地址并定位
  const searchAddress = useCallback(
    async (query: string) => {
      if (!query.trim() || !enableSearch) return;

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://restapi.amap.com/v3/geocode/geo?key=d2f3394e4d2807b003a50a8a6f4bb6bb&address=${encodeURIComponent(query)}&city=全国`
        );
        const data = await response.json();

        if (data.status === '1' && data.geocodes && data.geocodes.length > 0) {
          const location = data.geocodes[0].location.split(',');
          const coords = {
            lng: parseFloat(location[0]),
            lat: parseFloat(location[1]),
          };

          await updateLocation(coords);

          // 移动地图中心到搜索结果
          if (sceneRef.current) {
            sceneRef.current.setCenter([coords.lng, coords.lat]);
            sceneRef.current.setZoom(15);
          }
        }
      } catch (error) {
        console.warn('地址搜索失败:', error);
      } finally {
        setIsSearching(false);
      }
    },
    [enableSearch]
  );

  // 更新位置标记
  const updateLocationMarker = useCallback((coords: GeoCoordinate) => {
    if (!sceneRef.current) return;

    // 移除现有标记
    if (markerRef.current) {
      sceneRef.current.removeAllMarkers();
    }

    // 创建新标记
    const marker = new Marker({
      color: '#ff4757',
      draggable: true,
    })
      .setLnglat({ lng: coords.lng, lat: coords.lat })
      .on('dragend', (e: any) => {
        const lngLat = e.target.getLnglat();
        const newCoords = { lng: lngLat.lng, lat: lngLat.lat };
        updateLocation(newCoords);
      });

    sceneRef.current.addMarker(marker);
    markerRef.current = marker;
  }, []);

  // 更新位置信息
  const updateLocation = useCallback(
    async (coords: GeoCoordinate) => {
      setCurrentLocation(coords);
      setManualInput({
        lat: coords.lat.toFixed(6),
        lng: coords.lng.toFixed(6),
      });

      // 更新标记位置
      updateLocationMarker(coords);

      // 获取地址信息
      if (enableAddressDisplay) {
        const address = await getAddressFromCoords(coords);
        setCurrentAddress(address);
        onChange?.(coords, address);
      } else {
        onChange?.(coords);
      }
    },
    [onChange, enableAddressDisplay, getAddressFromCoords, updateLocationMarker]
  );

  // 手动输入坐标
  const handleManualInput = useCallback(() => {
    const lat = parseFloat(manualInput.lat);
    const lng = parseFloat(manualInput.lng);

    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      updateLocation({ lat, lng });

      // 移动地图中心到输入坐标
      if (sceneRef.current) {
        sceneRef.current.setCenter([lng, lat]);
      }
    }
  }, [manualInput, updateLocation]);

  // 初始化场景
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const scene = new Scene({
        id: containerRef.current,
        map: new GaodeMap({
          style: 'light',
          center: [defaultCenter.lng, defaultCenter.lat],
          zoom: zoom,
          token: 'd2f3394e4d2807b003a50a8a6f4bb6bb',
        }),
      });

      scene.on('loaded', () => {
        setIsReady(true);
        setLoading(false);

        // 如果有初始值，显示标记
        if (value) {
          updateLocationMarker(value);
        }
      });

      // 地图点击事件
      scene.on('click', (e: L7MouseEvent) => {
        if (e.lngLat) {
          const coords = {
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
          };
          updateLocation(coords);
        }
      });

      sceneRef.current = scene;

      return () => {
        if (markerRef.current && scene) {
          scene.removeAllMarkers();
        }
        if (scene) {
          scene.destroy();
        }
      };
    } catch (error) {
      console.error('地图初始化失败:', error);
      setLoading(false);
    }
  }, [defaultCenter, zoom, value, updateLocation, updateLocationMarker]);

  // 监听外部value变化
  useEffect(() => {
    if (
      value &&
      (!currentLocation ||
        value.lat !== currentLocation.lat ||
        value.lng !== currentLocation.lng)
    ) {
      setCurrentLocation(value);
      setManualInput({
        lat: value.lat.toFixed(6),
        lng: value.lng.toFixed(6),
      });

      if (isReady) {
        updateLocationMarker(value);
        if (enableAddressDisplay) {
          getAddressFromCoords(value).then(setCurrentAddress);
        }
      }
    }
  }, [
    value,
    currentLocation,
    isReady,
    enableAddressDisplay,
    getAddressFromCoords,
    updateLocationMarker,
  ]);

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* 搜索栏 */}
      {enableSearch && (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="输入地址搜索定位"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  searchAddress(searchQuery);
                }
              }}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
          <button
            onClick={() => searchAddress(searchQuery)}
            disabled={isSearching || !searchQuery.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            搜索
          </button>
        </div>
      )}

      {/* 地图容器 */}
      <div
        className="relative border border-gray-200 rounded-lg overflow-hidden"
        style={{ height }}
      >
        <div ref={containerRef} className="w-full h-full cursor-crosshair" />

        {/* 加载状态 */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-3"></div>
            <div className="text-sm text-gray-700 font-medium">
              地图加载中...
            </div>
          </div>
        )}

        {/* 提示信息 */}
        {isReady && !currentLocation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              {placeholder}
            </div>
          </div>
        )}
      </div>

      {/* 坐标输入和地址显示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 手动输入坐标 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            手动输入坐标
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                step="0.000001"
                value={manualInput.lat}
                onChange={e =>
                  setManualInput(prev => ({ ...prev, lat: e.target.value }))
                }
                placeholder="纬度 (Lat)"
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                step="0.000001"
                value={manualInput.lng}
                onChange={e =>
                  setManualInput(prev => ({ ...prev, lng: e.target.value }))
                }
                placeholder="经度 (Lng)"
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleManualInput}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
            >
              定位
            </button>
          </div>
        </div>

        {/* 地址信息 */}
        {enableAddressDisplay && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              地址信息
            </label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[36px] flex items-center">
              {currentAddress ? (
                <span className="text-sm text-gray-700">{currentAddress}</span>
              ) : (
                <span className="text-sm text-gray-400">请选择位置</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 当前坐标显示 */}
      {currentLocation && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-medium text-blue-800 mb-1">
            当前选择位置
          </div>
          <div className="text-sm text-blue-700">
            纬度: {currentLocation.lat.toFixed(6)}, 经度:{' '}
            {currentLocation.lng.toFixed(6)}
          </div>
        </div>
      )}
    </div>
  );
}
