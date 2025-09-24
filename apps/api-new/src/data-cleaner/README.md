# 数据清洗微服务

基于 NestJS 和 RabbitMQ 的数据清洗微服务，用于清洗原始数据中的 HTML 标签、URL、特殊字符等内容。

## 功能特性

- 🧹 **多规则清洗**: 支持 HTML 标签清除、URL 替换、空格规范化等
- 🐰 **RabbitMQ 集成**: 异步消息处理，支持批量处理
- ⚡ **高性能**: 支持并发处理和批量操作
- 🛡️ **错误处理**: 完善的错误处理和消息确认机制
- 📊 **监控友好**: 详细的日志和健康检查接口
- 🧪 **测试覆盖**: 完整的单元测试和集成测试

## 清洗规则

### 默认启用的规则
- **removeHtmlTags**: 移除 HTML 标签
- **removeUrls**: 将 URL 替换为 `[链接]` 占位符
- **normalizeWhitespace**: 规范化空白字符

### 可选规则
- **removeEmojis**: 移除表情符号（默认禁用）
- **removeSpecialChars**: 移除特殊字符（通过配置启用）

## API 接口

### RabbitMQ 消息监听

#### 1. 单条数据清洗
- **事件**: `raw_data_received`
- **队列**: `data_cleaner_queue`
- **数据格式**:
```typescript
interface RawDataDto {
  id: string;
  source: string;
  content: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}
```

#### 2. 批量数据清洗
- **事件**: `batch_data_clean_requested`
- **队列**: `data_cleaner_queue`
- **数据格式**: `RawDataDto[]`

### HTTP 测试接口

#### 发布测试数据
```bash
POST /api/data-cleaner/publish
{
  "content": "<div>测试内容 https://example.com</div>",
  "source": "test"
}
```

#### 同步清洗测试
```bash
POST /api/data-cleaner/clean-sync
{
  "content": "<p>需要清洗的内容</p>",
  "source": "test"
}
```

#### 本地清洗测试
```bash
POST /api/data-cleaner/clean-local
{
  "content": "<h1>本地测试</h1>",
  "source": "local_test"
}
```

#### 健康检查
```bash
GET /api/data-cleaner/health
```

#### 获取配置
```bash
GET /api/data-cleaner/config
```

## 环境配置

创建 `.env` 文件：
```bash
# RabbitMQ 配置
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=sker_admin
RABBITMQ_PASSWORD=sker_rabbitmq_password
RABBITMQ_VHOST=sker_vhost

# 应用配置
PORT=3002
NODE_ENV=development
```

## 启动服务

### 1. 启动 RabbitMQ
```bash
# 使用 Docker Compose
cd ../../
docker-compose up -d rabbitmq
```

### 2. 启动应用
```bash
npm run start:dev
```

## 使用示例

### 1. 通过 RabbitMQ 发送消息

```typescript
// 发布原始数据到清洗队列
const rawData: RawDataDto = {
  id: 'data_001',
  source: 'web_scraping',
  content: '<div>这是一个包含HTML的文本 <a href="https://example.com">链接</a></div>',
  timestamp: new Date()
};

// 通过 MessagePublisherService 发布
await messagePublisher.publishRawData(rawData);
```

### 2. 直接调用服务

```typescript
// 直接使用 DataCleanerService
const result = await dataCleanerService.cleanData(rawData);
console.log(result.cleanedContent); // "这是一个包含HTML的文本 [链接]"
```

### 3. 自定义清洗配置

```typescript
const customConfig: DataCleaningConfigDto = {
  rules: [
    {
      name: 'customRule',
      description: '自定义规则',
      pattern: '\\[.*?\\]',
      replacement: '',
      enabled: true
    }
  ],
  options: {
    removeHtml: true,
    removeUrls: false,
    removeEmojis: true,
    normalizeWhitespace: true,
    removeSpecialChars: true,
    minLength: 5,
    maxLength: 1000
  }
};

const result = await dataCleanerService.cleanData(rawData, customConfig);
```

## 清洗结果格式

```typescript
interface CleanedDataDto {
  id: string;
  source: string;
  cleanedContent: string;        // 清洗后的内容
  originalContent: string;       // 原始内容
  cleaningRules: string[];       // 应用的规则列表
  metadata?: Record<string, any>;
  processedAt: Date;             // 处理时间
  status: 'success' | 'failed' | 'partial';
  errors?: string[];             // 错误信息（如有）
}
```

## 监控与日志

服务提供详细的日志输出：
- 消息接收和处理状态
- 规则应用情况
- 处理时间统计
- 错误和异常信息

## 测试

运行所有测试：
```bash
npm run test
```

运行特定测试：
```bash
npm run test -- --testNamePattern="DataCleanerService"
```

## 性能优化

- 使用批量处理减少网络开销
- RabbitMQ 预取机制控制并发数
- 异步处理避免阻塞
- 配置灵活的消息确认机制

## 扩展性

可以通过以下方式扩展：
- 添加新的清洗规则
- 集成其他消息队列
- 添加数据存储层
- 集成监控和指标收集