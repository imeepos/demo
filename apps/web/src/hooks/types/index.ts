import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';

export type QueryConfig<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationKey' | 'mutationFn'
>;

export * from '@sker/sdk';
