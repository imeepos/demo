# @sker/map

基于 L7 + 高德地图的地理位置选择器组件库

## 功能特性

- 🗺️ **LocationPicker**: 完整的地图位置选择器
- 📍 **LocationInput**: 经纬度手动输入组件
- 🔍 **AddressSearch**: 地址搜索定位组件
- 📊 **L7EventMap**: 舆情事件地图展示组件

## 安装

```bash
npm install @sker/map
# 或
pnpm add @sker/map
```

## 核心组件

### LocationPicker - 地理位置选择器

完整的地图位置选择器，支持点击选择、拖拽标记、地址搜索等功能。

```tsx
import { LocationPicker, type GeoCoordinate } from '@sker/map';

function MyComponent() {
  const [location, setLocation] = useState<GeoCoordinate>();

  return (
    <LocationPicker
      value={location}
      onChange={(coords, address) => {
        setLocation(coords);
        console.log('选择位置:', coords, '地址:', address);
      }}
      defaultCenter={{ lat: 39.9042, lng: 116.4074 }}
      zoom={10}
      enableSearch={true}
      enableAddressDisplay={true}
      placeholder="点击地图选择位置"
      height="400px"
    />
  );
}
```

#### Props

| 属性                   | 类型                           | 默认值  | 说明             |
| ---------------------- | ------------------------------ | ------- | ---------------- |
| `value`                | `GeoCoordinate?`               | -       | 当前选择的坐标   |
| `onChange`             | `(location, address?) => void` | -       | 位置变化回调     |
| `defaultCenter`        | `GeoCoordinate`                | 北京    | 地图默认中心点   |
| `zoom`                 | `number`                       | 10      | 地图默认缩放级别 |
| `enableSearch`         | `boolean`                      | true    | 是否启用搜索功能 |
| `enableAddressDisplay` | `boolean`                      | true    | 是否显示地址信息 |
| `placeholder`          | `string`                       | -       | 提示文本         |
| `height`               | `string \| number`             | "400px" | 地图高度         |

### LocationInput - 坐标输入组件

纯输入组件，支持经纬度手动输入、数值验证、格式化等功能。

```tsx
import { LocationInput, type GeoCoordinate } from '@sker/map';

function MyComponent() {
  const [location, setLocation] = useState<GeoCoordinate>();

  return (
    <LocationInput
      value={location}
      onChange={setLocation}
      precision={6}
      placeholder={{
        lat: '请输入纬度 (-90 ~ 90)',
        lng: '请输入经度 (-180 ~ 180)',
      }}
    />
  );
}
```

#### Props

| 属性          | 类型                           | 默认值 | 说明         |
| ------------- | ------------------------------ | ------ | ------------ |
| `value`       | `GeoCoordinate?`               | -      | 当前坐标值   |
| `onChange`    | `(location) => void`           | -      | 坐标变化回调 |
| `placeholder` | `{lat?: string, lng?: string}` | -      | 输入框占位符 |
| `disabled`    | `boolean`                      | false  | 是否禁用     |
| `precision`   | `number`                       | 6      | 小数位精度   |

### AddressSearch - 地址搜索组件

地址搜索组件，支持实时搜索、历史记录、键盘导航等功能。

```tsx
import { AddressSearch, type SearchResult } from '@sker/map';

function MyComponent() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AddressSearch
      value={searchValue}
      onChange={setSearchValue}
      onSelect={(result: SearchResult) => {
        console.log('选择地址:', result);
      }}
      placeholder="搜索地址或地点..."
      maxResults={10}
      showHistory={true}
    />
  );
}
```

#### Props

| 属性          | 类型               | 默认值 | 说明             |
| ------------- | ------------------ | ------ | ---------------- |
| `value`       | `string`           | -      | 搜索框当前值     |
| `onChange`    | `(value) => void`  | -      | 搜索值变化回调   |
| `onSelect`    | `(result) => void` | -      | 选择搜索结果回调 |
| `placeholder` | `string`           | -      | 搜索框占位符     |
| `maxResults`  | `number`           | 10     | 最大搜索结果数量 |
| `showHistory` | `boolean`          | true   | 是否显示搜索历史 |

## 类型定义

```typescript
interface GeoCoordinate {
  lat: number; // 纬度
  lng: number; // 经度
}

interface SearchResult {
  id: string;
  name: string; // 地点名称
  address: string; // 详细地址
  location: GeoCoordinate;
  district: string; // 区县
  city: string; // 城市
  province: string; // 省份
}
```

## 使用示例

### 基础用法

```tsx
import { LocationPicker } from '@sker/map';

export function BasicExample() {
  const [location, setLocation] = useState();

  return (
    <LocationPicker value={location} onChange={setLocation} height="400px" />
  );
}
```

### 只读模式

```tsx
import { LocationPicker } from '@sker/map';

export function ReadOnlyExample() {
  const location = { lat: 39.9042, lng: 116.4074 };

  return (
    <LocationPicker value={location} enableSearch={false} height="300px" />
  );
}
```

### 组合使用

```tsx
import { useState } from 'react';
import { LocationPicker, LocationInput, AddressSearch } from '@sker/map';

export function CombinedExample() {
  const [location, setLocation] = useState();
  const [inputLocation, setInputLocation] = useState();

  return (
    <div className="space-y-6">
      {/* 地址搜索 */}
      <AddressSearch
        onSelect={result => setLocation(result.location)}
        placeholder="搜索地址定位"
      />

      {/* 地图选择 */}
      <LocationPicker value={location} onChange={setLocation} height="400px" />

      {/* 手动输入 */}
      <LocationInput
        value={inputLocation}
        onChange={setInputLocation}
        precision={6}
      />
    </div>
  );
}
```

## 注意事项

1. **高德地图 Token**: 组件使用预设的高德地图 token，生产环境建议使用自己的 token
2. **网络依赖**: 地址搜索和逆地理编码功能需要网络连接
3. **坐标系统**: 使用 WGS84 坐标系统 (GPS 标准)
4. **浏览器兼容**: 支持现代浏览器，需要 ES6+ 支持

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 构建
pnpm run build

# 类型检查
pnpm run typecheck
```

## License

MIT
