# @sker/sdk

TypeScript SDK for 舆情分析系统 API

## 安装

```bash
pnpm add @sker/sdk
```

## 使用方法

### 初始化客户端

```typescript
import { client } from '@sker/sdk';

// 配置基础 URL
client.setConfig({
  baseUrl: 'http://localhost:3000',
});
```

### 情感强度管理

```typescript
import { 
  sentimentIntensityControllerCreate,
  sentimentIntensityControllerFindAll,
  sentimentIntensityControllerSearch,
  sentimentIntensityControllerUpdate,
  sentimentIntensityControllerRemove
} from '@sker/sdk';

// 创建情感强度记录
const response = await sentimentIntensityControllerCreate({
  body: {
    title: '积极情感',
    intensity: 0.85,
    description: '表示积极正面的情感倾向'
  }
});

// 获取所有记录
const allRecords = await sentimentIntensityControllerFindAll();

// 搜索记录
const searchResults = await sentimentIntensityControllerSearch({
  query: {
    title: '积极',
    intensity: 0.85
  }
});

// 更新记录
const updated = await sentimentIntensityControllerUpdate({
  path: {
    id: '1'
  },
  body: {
    title: '更新后的标题',
    intensity: 0.90
  }
});

// 删除记录
await sentimentIntensityControllerRemove({
  path: {
    id: '1'
  }
});
```

### 舆情分析

```typescript
import {
  sentimentControllerGetAllEvents,
  sentimentControllerGetEventById,
  sentimentControllerGetMetrics,
  sentimentControllerGetHotWords
} from '@sker/sdk';

// 获取所有舆情事件
const events = await sentimentControllerGetAllEvents();

// 获取指定事件
const event = await sentimentControllerGetEventById({
  path: {
    id: 'event-001'
  }
});

// 获取统计指标
const metrics = await sentimentControllerGetMetrics();

// 获取热词
const hotWords = await sentimentControllerGetHotWords();
```

## 类型支持

SDK 提供完整的 TypeScript 类型支持：

```typescript
import type { 
  CreateSentimentIntensityDto,
  SentimentIntensityResponseDto,
  SentimentEventSchema,
  SentimentMetricsSchema 
} from '@sker/sdk';
```

## API 文档

完整的 API 文档请访问：http://localhost:3000/docs