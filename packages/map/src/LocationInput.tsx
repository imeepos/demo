import { cn } from '@sker/ui';
import { useState, useCallback, useEffect } from 'react';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface LocationInputProps {
  value?: GeoCoordinate;
  onChange?: (location: GeoCoordinate) => void;
  placeholder?: {
    lat?: string;
    lng?: string;
  };
  disabled?: boolean;
  className?: string;
  precision?: number; // 小数位精度，默认6位
}

/**
 * 经纬度输入组件
 * 支持数值验证和格式化
 */
export function LocationInput({
  value,
  onChange,
  placeholder = {
    lat: '纬度 (-90 ~ 90)',
    lng: '经度 (-180 ~ 180)',
  },
  disabled = false,
  className,
  precision = 6,
}: LocationInputProps) {
  const [inputValues, setInputValues] = useState({
    lat: value?.lat?.toFixed(precision) || '',
    lng: value?.lng?.toFixed(precision) || '',
  });
  const [errors, setErrors] = useState({
    lat: '',
    lng: '',
  });

  // 验证纬度值
  const validateLatitude = useCallback((value: string): string => {
    if (!value.trim()) return '';

    const num = parseFloat(value);
    if (isNaN(num)) return '请输入有效数字';
    if (num < -90 || num > 90) return '纬度范围：-90 到 90';

    return '';
  }, []);

  // 验证经度值
  const validateLongitude = useCallback((value: string): string => {
    if (!value.trim()) return '';

    const num = parseFloat(value);
    if (isNaN(num)) return '请输入有效数字';
    if (num < -180 || num > 180) return '经度范围：-180 到 180';

    return '';
  }, []);

  // 处理输入变化
  const handleInputChange = useCallback(
    (field: 'lat' | 'lng', value: string) => {
      setInputValues(prev => ({ ...prev, [field]: value }));

      // 验证输入
      const error =
        field === 'lat' ? validateLatitude(value) : validateLongitude(value);

      setErrors(prev => ({ ...prev, [field]: error }));

      // 如果两个值都有效，触发onChange
      const otherField = field === 'lat' ? 'lng' : 'lat';
      const otherValue = field === 'lat' ? inputValues.lng : inputValues.lat;
      const otherError =
        field === 'lat'
          ? validateLongitude(otherValue)
          : validateLatitude(otherValue);

      if (!error && !otherError && value.trim() && otherValue.trim()) {
        const lat =
          field === 'lat' ? parseFloat(value) : parseFloat(inputValues.lat);
        const lng =
          field === 'lng' ? parseFloat(value) : parseFloat(inputValues.lng);

        onChange?.({ lat, lng });
      }
    },
    [inputValues, validateLatitude, validateLongitude, onChange]
  );

  // 处理失去焦点时的格式化
  const handleBlur = useCallback(
    (field: 'lat' | 'lng', value: string) => {
      if (value.trim() && !errors[field]) {
        const num = parseFloat(value);
        const formatted = num.toFixed(precision);
        setInputValues(prev => ({ ...prev, [field]: formatted }));
      }
    },
    [errors, precision]
  );

  // 监听外部value变化
  useEffect(() => {
    if (value) {
      setInputValues({
        lat: value.lat.toFixed(precision),
        lng: value.lng.toFixed(precision),
      });
      setErrors({ lat: '', lng: '' });
    }
  }, [value, precision]);

  // 清空输入
  const handleClear = useCallback(() => {
    setInputValues({ lat: '', lng: '' });
    setErrors({ lat: '', lng: '' });
    onChange?.(undefined as any);
  }, [onChange]);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 纬度输入 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            纬度 (Latitude)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.000001"
              value={inputValues.lat}
              onChange={e => handleInputChange('lat', e.target.value)}
              onBlur={e => handleBlur('lat', e.target.value)}
              placeholder={placeholder.lat}
              disabled={disabled}
              className={cn(
                'w-full h-10 px-3 py-2 border rounded-md text-sm transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                errors.lat
                  ? 'border-red-300 bg-red-50 focus:ring-red-500'
                  : 'border-gray-300 bg-white'
              )}
            />
            {/* 单位标识 */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
              °N/S
            </div>
          </div>
          {errors.lat && (
            <p className="text-xs text-red-600 mt-1">{errors.lat}</p>
          )}
        </div>

        {/* 经度输入 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            经度 (Longitude)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.000001"
              value={inputValues.lng}
              onChange={e => handleInputChange('lng', e.target.value)}
              onBlur={e => handleBlur('lng', e.target.value)}
              placeholder={placeholder.lng}
              disabled={disabled}
              className={cn(
                'w-full h-10 px-3 py-2 border rounded-md text-sm transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                errors.lng
                  ? 'border-red-300 bg-red-50 focus:ring-red-500'
                  : 'border-gray-300 bg-white'
              )}
            />
            {/* 单位标识 */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
              °E/W
            </div>
          </div>
          {errors.lng && (
            <p className="text-xs text-red-600 mt-1">{errors.lng}</p>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>精度: {precision} 位小数</span>
          {(inputValues.lat || inputValues.lng) && <span>•</span>}
          {inputValues.lat && inputValues.lng && !errors.lat && !errors.lng && (
            <span className="text-green-600">✓ 坐标有效</span>
          )}
        </div>

        {(inputValues.lat || inputValues.lng) && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="text-xs text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            清空
          </button>
        )}
      </div>

      {/* 坐标预览 */}
      {inputValues.lat && inputValues.lng && !errors.lat && !errors.lng && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-medium text-blue-800 mb-1">坐标预览</div>
          <div className="text-sm text-blue-700 font-mono">
            {parseFloat(inputValues.lat).toFixed(precision)},{' '}
            {parseFloat(inputValues.lng).toFixed(precision)}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            DMS格式:{' '}
            {convertToDMS(
              parseFloat(inputValues.lat),
              parseFloat(inputValues.lng)
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 转换为度分秒格式
function convertToDMS(lat: number, lng: number): string {
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
}
