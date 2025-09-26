# OpenAI 智能代理工具包

## 概述

这是一个基于 NestJS 的 OpenAI 工具包，用于执行智能代理 (Agent) 并自动记录执行结果到 AgentExecution 表中。工具包遵循 NestJS 最佳实践，使用 `@nestjs/config` 管理环境变量，并提供完整的 OpenAPI 文档支持。

## 功能特性

### 🤖 智能代理执行

- 根据 Agent 实体配置自动调用 OpenAI API
- 支持自定义系统提示词、温度、最大 token 等参数
- 自动记录输入输出内容和 token 消耗

### 📊 执行记录管理

- 完整的执行生命周期追踪 (pending → running → completed/failed)
- 详细的 token 使用统计和成本估算
- 执行时间监控和性能分析

### 🚀 批量处理

- 支持批量执行多个智能代理任务
- 并发执行提升处理效率
- 详细的成功/失败统计

### 📈 统计分析

- 智能代理使用统计
- Token 消耗分析
- 执行成功率监控

## 目录结构

```
packages/openai/
├── src/
│   ├── config/
│   │   └── openai.config.ts      # OpenAI 配置
│   ├── services/
│   │   └── openai.service.ts     # 核心服务类
│   ├── types/
│   │   └── index.ts              # 类型定义和 DTO
│   ├── openai.module.ts          # 模块定义
│   └── index.ts                  # 导出文件
├── package.json
├── tsconfig.json
└── prompt.md                     # 本文档
```

## 环境变量配置

在使用前需要配置以下环境变量：

```bash
# 必需配置
OPENAI_API_KEY=sk-your-openai-api-key

# 可选配置
OPENAI_BASE_URL=https://api.openai.com/v1  # 自定义 API 端点
OPENAI_TIMEOUT=60000                       # 请求超时时间（毫秒）
OPENAI_DEFAULT_MODEL=gpt-3.5-turbo         # 默认模型
OPENAI_MAX_RETRIES=3                       # 最大重试次数
```

## 使用方法

### 1. 模块导入

```typescript
import { Module } from '@nestjs/common';
import { OpenAIModule } from '@sker/openai';

@Module({
  imports: [
    OpenAIModule,
    // 其他模块...
  ],
})
export class AppModule {}
```

### 2. 服务注入

```typescript
import { Injectable } from '@nestjs/common';
import { OpenAIService } from '@sker/openai';

@Injectable()
export class YourService {
  constructor(private readonly openaiService: OpenAIService) {}

  async analyzeText(text: string) {
    const result = await this.openaiService.executeAgent({
      agentCode: 'sentiment-analyzer',
      input: text,
      context: '用户评论分析',
    });

    return result;
  }
}
```

### 3. 控制器使用

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenAIService, ExecuteAgentDto } from '@sker/openai';

@ApiTags('AI 智能代理')
@Controller('agents')
export class AgentController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('execute')
  @ApiOperation({ summary: '执行智能代理' })
  async executeAgent(@Body() dto: ExecuteAgentDto) {
    return this.openaiService.executeAgent(dto);
  }

  @Post('batch-execute')
  @ApiOperation({ summary: '批量执行智能代理' })
  async batchExecute(@Body() requests: ExecuteAgentDto[]) {
    return this.openaiService.executeAgentBatch(requests);
  }
}
```

## API 接口

### ExecuteAgentDto

执行智能代理的请求参数：

```typescript
{
  agentCode: string;    // 智能代理代码（如：sentiment-analyzer）
  input: string;        // 输入内容
  context?: string;     // 可选的上下文信息
}
```

### AgentExecutionResult

智能代理执行结果：

```typescript
{
  executionId: number; // 执行记录 ID
  output: string; // AI 生成的输出内容
  inputTokens: number; // 输入 token 数量
  outputTokens: number; // 输出 token 数量
  totalTokens: number; // 总 token 数量
  executionTime: number; // 执行时间（毫秒）
  model: string; // 使用的模型
}
```

## 核心方法

### executeAgent()

执行单个智能代理任务

```typescript
async executeAgent(dto: ExecuteAgentDto, options?: OpenAIExecutionOptions): Promise<AgentExecutionResult>
```

### executeAgentBatch()

批量执行智能代理任务

```typescript
async executeAgentBatch(requests: ExecuteAgentDto[], options?: OpenAIExecutionOptions): Promise<AgentExecutionResult[]>
```

### getExecutionHistory()

获取智能代理执行历史

```typescript
async getExecutionHistory(agentCode: string, limit: number = 50): Promise<AgentExecution[]>
```

### getExecutionStats()

获取智能代理执行统计

```typescript
async getExecutionStats(agentCode: string): Promise<{
  total: number;
  completed: number;
  failed: number;
  running: number;
  successRate: number;
  totalTokens: number;
  averageExecutionTime: number;
}>
```

## 执行流程

1. **验证智能代理**：查找指定代码的活跃智能代理
2. **创建执行记录**：在 AgentExecution 表中创建记录，状态为 pending
3. **开始执行**：更新状态为 running，记录开始时间
4. **调用 OpenAI**：使用智能代理配置调用 OpenAI API
5. **记录结果**：更新执行记录，包含输出、token 消耗、执行时间等
6. **返回结果**：返回格式化的执行结果

## 错误处理

- **智能代理未找到**：抛出 `NotFoundException`
- **API 调用失败**：抛出 `InternalServerErrorException`
- **配置错误**：在服务初始化时抛出配置错误

## 性能优化

- 批量执行使用 `Promise.allSettled()` 并发处理
- Token 估算减少不必要的 API 调用
- 执行记录异步更新避免阻塞主流程

## 扩展功能

- 支持自定义执行选项覆盖默认配置
- 提供详细的执行统计和分析
- 支持成本估算和预算控制

## 依赖关系

- `@nestjs/common`: NestJS 核心功能
- `@nestjs/config`: 配置管理
- `@nestjs/typeorm`: 数据库 ORM
- `@nestjs/swagger`: API 文档
- `openai`: OpenAI 官方 SDK
- `@sker/orm`: 项目 ORM 实体

## 注意事项

⚠️ **重要**：

- 确保在生产环境中正确设置 `OPENAI_API_KEY`
- 监控 token 使用量避免超出预算
- 定期检查执行失败的记录并处理错误
- 注意 OpenAI API 的速率限制
