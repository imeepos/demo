# @sker/hooks - React Query Hooks Library

这是基于 @tanstack/react-query 封装的 React hooks 库，用于舆情分析系统的 API 调用。

## 特性

- ✅ 完整的 TypeScript 支持
- ✅ 统一的 queryKey 管理
- ✅ 自动缓存失效和更新
- ✅ 每个接口独立的 hook 文件
- ✅ 模块化设计，支持按需引入

## 安装

```bash
pnpm add @sker/hooks
```

## 使用示例

### 基础用法

```tsx
import { useQueryAgentFindAll, useMutationAgentCreate } from '@sker/hooks';

function AgentList() {
  // 查询智能体列表
  const { data: agents, isLoading } = useQueryAgentFindAll({
    query: { page: 1, limit: 10 },
    config: {
      staleTime: 5 * 60 * 1000, // 5分钟
      refetchOnWindowFocus: false,
    },
  });

  // 创建智能体
  const createAgent = useMutationAgentCreate({
    onSuccess: () => {
      console.log('Agent created successfully');
    },
    onError: error => {
      console.error('Failed to create agent:', error);
    },
  });

  const handleCreate = () => {
    createAgent.mutate({
      body: {
        name: 'New Agent',
        description: 'Agent description',
      },
    });
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {agents?.data?.map(agent => (
        <div key={agent.id}>{agent.name}</div>
      ))}
      <button onClick={handleCreate} disabled={createAgent.isPending}>
        Create Agent
      </button>
    </div>
  );
}
```

## 模块组织

### 文件结构

```
src/
├── app/                    # App 模块 (1个接口)
├── agent/                  # Agent 模块 (7个接口)
├── agentExecution/        # Agent Execution 模块 (10个接口)
├── sentimentIntensity/    # Sentiment Intensity 模块 (5个接口)
├── sentimentEvent/        # Sentiment Event 模块 (6个接口)
├── eventType/            # Event Type 模块 (6个接口)
├── mediaType/            # Media Type 模块 (6个接口)
├── constants/
│   └── queryKeys.ts      # 统一的查询键管理
├── types/
│   └── index.ts          # 类型定义
└── index.ts              # 主入口文件
```

### 导出的 Hooks

每个模块都遵循以下命名规范：

- Query hooks: `useQuery{Module}{Action}`
- Mutation hooks: `useMutation{Module}{Action}`

#### Agent 模块

- `useQueryAgentFindAll` - 查询智能体列表
- `useQueryAgentFindOne` - 获取单个智能体
- `useQueryAgentGetStats` - 获取智能体统计
- `useMutationAgentCreate` - 创建智能体
- `useMutationAgentUpdate` - 更新智能体
- `useMutationAgentRemove` - 删除智能体
- `useMutationAgentToggleStatus` - 切换状态

... （其他模块类似）

## QueryKey 管理

所有的查询键都在 `queryKeys` 常量中统一管理：

```typescript
import { queryKeys } from '@sker/hooks';

// 使用查询键进行手动缓存操作
queryClient.invalidateQueries({ queryKey: queryKeys.agent.all });
queryClient.removeQueries({ queryKey: queryKeys.agent.detail('agent-id') });
```

## 类型支持

库完全支持 TypeScript，提供了完整的类型推导和智能提示。
