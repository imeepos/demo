export const queryKeys = {
  app: {
    all: ['app'] as const,
    hello: () => [...queryKeys.app.all, 'hello'] as const,
  },
  agent: {
    all: ['agent'] as const,
    list: (filters?: any) =>
      [...queryKeys.agent.all, 'list', { filters }] as const,
    detail: (id: string) => [...queryKeys.agent.all, 'detail', id] as const,
    stats: (id: string) => [...queryKeys.agent.all, 'stats', id] as const,
  },
  agentExecution: {
    all: ['agentExecution'] as const,
    list: (filters?: any) =>
      [...queryKeys.agentExecution.all, 'list', { filters }] as const,
    detail: (id: string) =>
      [...queryKeys.agentExecution.all, 'detail', id] as const,
    history: (agentCode: string) =>
      [...queryKeys.agentExecution.all, 'history', agentCode] as const,
    stats: (agentCode: string) =>
      [...queryKeys.agentExecution.all, 'stats', agentCode] as const,
    byAgent: (agentId: string) =>
      [...queryKeys.agentExecution.all, 'byAgent', agentId] as const,
    analyticsOverview: () =>
      [...queryKeys.agentExecution.all, 'analytics', 'overview'] as const,
    performanceAnalysis: (agentCode: string) =>
      [
        ...queryKeys.agentExecution.all,
        'analytics',
        'performance',
        agentCode,
      ] as const,
  },
  sentimentIntensity: {
    all: ['sentimentIntensity'] as const,
    list: (filters?: any) =>
      [...queryKeys.sentimentIntensity.all, 'list', { filters }] as const,
    search: (filters?: any) =>
      [...queryKeys.sentimentIntensity.all, 'search', { filters }] as const,
  },
  sentimentEvent: {
    all: ['sentimentEvent'] as const,
    list: (filters?: any) =>
      [...queryKeys.sentimentEvent.all, 'list', { filters }] as const,
    detail: (id: string) =>
      [...queryKeys.sentimentEvent.all, 'detail', id] as const,
    search: (filters?: any) =>
      [...queryKeys.sentimentEvent.all, 'search', { filters }] as const,
  },
  eventType: {
    all: ['eventType'] as const,
    list: (filters?: any) =>
      [...queryKeys.eventType.all, 'list', { filters }] as const,
    detail: (id: string) => [...queryKeys.eventType.all, 'detail', id] as const,
    search: (filters?: any) =>
      [...queryKeys.eventType.all, 'search', { filters }] as const,
  },
  mediaType: {
    all: ['mediaType'] as const,
    list: (filters?: any) =>
      [...queryKeys.mediaType.all, 'list', { filters }] as const,
    detail: (id: string) => [...queryKeys.mediaType.all, 'detail', id] as const,
    search: (filters?: any) =>
      [...queryKeys.mediaType.all, 'search', { filters }] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
