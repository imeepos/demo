# @sker/hooks

基于 `@tanstack/react-query` 封装的 React hooks 库，用于舆情分析系统的 API 调用。

## ✨ 特性

- 🎯 **完整封装**：覆盖所有29个API接口
- 🔧 **TypeScript**：完整的类型支持和智能提示
- 🔑 **统一QueryKey**：层级化的查询键管理
- 🗄️ **自动缓存**：智能缓存失效和更新
- 📦 **模块化**：每个接口独立文件，支持按需引入
- ⚡ **高性能**：自动优化的查询和变更操作

## 📦 安装

```bash
pnpm add @sker/hooks @tanstack/react-query
```

## 🚀 快速开始

### 1. 设置 QueryClient

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

### 2. 使用 Hooks

```tsx
import {
  useQueryAgentFindAll,
  useMutationAgentCreate,
  queryKeys,
} from '@sker/hooks';

function AgentManagement() {
  // 查询智能体列表
  const {
    data: agents,
    isLoading,
    error,
  } = useQueryAgentFindAll({
    query: { page: 1, limit: 20 },
    config: {
      staleTime: 5 * 60 * 1000, // 5分钟缓存
      refetchOnWindowFocus: false,
    },
  });

  // 创建智能体
  const createAgent = useMutationAgentCreate({
    onSuccess: data => {
      console.log('创建成功:', data);
    },
    onError: error => {
      console.error('创建失败:', error);
    },
  });

  const handleCreateAgent = () => {
    createAgent.mutate({
      body: {
        code: 'agent-001',
        name: '新智能体',
        description: '智能体描述',
        systemPrompt: '你是一个专业的AI助手',
        temperature: 0.7,
        maxTokens: 1000,
        model: 'gpt-3.5-turbo',
      },
    });
  };

  return (
    <div>
      <h1>智能体管理</h1>

      {/* 加载状态 */}
      {isLoading && <div>正在加载...</div>}

      {/* 错误处理 */}
      {error && <div>错误: {error.message}</div>}

      {/* 智能体列表 */}
      {agents?.data?.map(agent => (
        <div key={agent.id}>
          <h3>{agent.name}</h3>
          <p>{agent.description}</p>
        </div>
      ))}

      {/* 创建按钮 */}
      <button onClick={handleCreateAgent} disabled={createAgent.isPending}>
        {createAgent.isPending ? '创建中...' : '创建智能体'}
      </button>
    </div>
  );
}
```

## 📚 API 参考

### 模块结构

#### App 模块 (1个接口)

- `useQueryGetHello` - 获取Hello消息

#### Agent 模块 (7个接口)

- `useQueryAgentFindAll` - 分页查询智能体列表
- `useQueryAgentFindOne` - 获取单个智能体详情
- `useQueryAgentGetStats` - 获取智能体统计信息
- `useMutationAgentCreate` - 创建智能体
- `useMutationAgentUpdate` - 更新智能体
- `useMutationAgentRemove` - 删除智能体
- `useMutationAgentToggleStatus` - 切换智能体启用状态

#### Agent Execution 模块 (10个接口)

- `useMutationAgentExecutionExecuteAgent` - 执行单个智能体
- `useMutationAgentExecutionBatchExecute` - 批量执行智能体
- `useQueryAgentExecutionFindExecutions` - 分页查询执行记录
- `useQueryAgentExecutionGetExecution` - 获取执行记录详情
- `useQueryAgentExecutionGetExecutionHistory` - 获取智能体执行历史
- `useQueryAgentExecutionGetExecutionStats` - 获取智能体执行统计
- `useQueryAgentExecutionGetExecutionsByAgent` - 根据智能体ID查询执行记录
- `useMutationAgentExecutionRetryExecution` - 重试失败的执行记录
- `useQueryAgentExecutionGetAnalyticsOverview` - 获取全局执行分析概览
- `useQueryAgentExecutionGetPerformanceAnalysis` - 获取智能体性能分析

#### Sentiment Intensity 模块 (5个接口)

- `useQuerySentimentIntensityFindAll` - 获取所有情感强度记录
- `useMutationSentimentIntensityCreate` - 创建情感强度记录
- `useQuerySentimentIntensitySearch` - 搜索情感强度记录
- `useMutationSentimentIntensityRemove` - 删除情感强度记录
- `useMutationSentimentIntensityUpdate` - 更新情感强度记录

#### Sentiment Event 模块 (6个接口)

- `useQuerySentimentEventFindAll` - 获取所有舆情事件记录
- `useMutationSentimentEventCreate` - 创建舆情事件记录
- `useQuerySentimentEventSearch` - 搜索舆情事件记录
- `useMutationSentimentEventRemove` - 删除舆情事件记录
- `useQuerySentimentEventFindOne` - 获取单个舆情事件记录
- `useMutationSentimentEventUpdate` - 更新舆情事件记录

#### Event Type 模块 (6个接口)

- `useQueryEventTypeFindAll` - 获取所有事件类型
- `useMutationEventTypeCreate` - 创建事件类型
- `useQueryEventTypeSearch` - 搜索事件类型
- `useMutationEventTypeRemove` - 删除事件类型
- `useQueryEventTypeFindOne` - 获取单个事件类型
- `useMutationEventTypeUpdate` - 更新事件类型

#### Media Type 模块 (6个接口)

- `useQueryMediaTypeFindAll` - 获取所有媒体类型
- `useMutationMediaTypeCreate` - 创建媒体类型
- `useQueryMediaTypeSearch` - 搜索媒体类型
- `useMutationMediaTypeRemove` - 删除媒体类型
- `useQueryMediaTypeFindOne` - 获取单个媒体类型
- `useMutationMediaTypeUpdate` - 更新媒体类型

### QueryKey 管理

```tsx
import { queryKeys, useQueryClient } from '@sker/hooks';

function MyComponent() {
  const queryClient = useQueryClient();

  // 使用统一的查询键
  const invalidateAgents = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.agent.all,
    });
  };

  const removeAgentCache = (agentId: string) => {
    queryClient.removeQueries({
      queryKey: queryKeys.agent.detail(agentId),
    });
  };

  // 查询键结构示例
  // queryKeys.agent.all -> ['agent']
  // queryKeys.agent.list(filters) -> ['agent', 'list', { filters }]
  // queryKeys.agent.detail(id) -> ['agent', 'detail', id]
}
```

## 🔧 高级用法

### 条件查询

```tsx
function ConditionalQuery({ agentId }: { agentId?: string }) {
  const { data: agent } = useQueryAgentFindOne(
    { path: { id: agentId! } },
    {
      enabled: !!agentId, // 只有当agentId存在时才执行查询
    }
  );
}
```

### 乐观更新

```tsx
function OptimisticUpdate() {
  const queryClient = useQueryClient();

  const updateAgent = useMutationAgentUpdate({
    onMutate: async variables => {
      // 取消相关的正在进行的查询
      await queryClient.cancelQueries({
        queryKey: queryKeys.agent.detail(variables.path.id),
      });

      // 获取当前数据
      const previousAgent = queryClient.getQueryData(
        queryKeys.agent.detail(variables.path.id)
      );

      // 乐观更新
      queryClient.setQueryData(queryKeys.agent.detail(variables.path.id), {
        ...previousAgent,
        ...variables.body,
      });

      return { previousAgent };
    },
    onError: (error, variables, context) => {
      // 如果失败，回滚到之前的数据
      if (context?.previousAgent) {
        queryClient.setQueryData(
          queryKeys.agent.detail(variables.path.id),
          context.previousAgent
        );
      }
    },
  });
}
```

### 分页查询

```tsx
function PaginatedAgents() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isPreviousData } = useQueryAgentFindAll({
    query: { page, limit: 20 },
    config: {
      keepPreviousData: true, // 保持上一页数据直到新数据加载完成
    },
  });

  return (
    <div>
      {data?.data?.map(agent => (
        <div key={agent.id}>{agent.name}</div>
      ))}

      <button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        上一页
      </button>

      <button
        onClick={() => {
          if (!isPreviousData && data?.hasNextPage) {
            setPage(old => old + 1);
          }
        }}
        disabled={isPreviousData || !data?.hasNextPage}
      >
        下一页
      </button>
    </div>
  );
}
```

## 🤝 开发指南

### 项目结构

```
src/
├── app/                    # App 模块
├── agent/                  # Agent 模块
├── agentExecution/         # Agent Execution 模块
├── sentimentIntensity/     # Sentiment Intensity 模块
├── sentimentEvent/         # Sentiment Event 模块
├── eventType/             # Event Type 模块
├── mediaType/             # Media Type 模块
├── constants/
│   └── queryKeys.ts       # 查询键管理
├── types/
│   └── index.ts          # 类型定义
└── index.ts              # 主入口
```

### 开发命令

```bash
# 开发模式
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 修复代码格式
pnpm lint:fix
```

## 📄 License

MIT

## 🤖 作者

由 Claude Code 自动生成，完整封装了舆情分析系统的所有API接口。
