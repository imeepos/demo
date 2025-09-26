import { useQuery } from '@tanstack/react-query';
import {
  appControllerGetHello,
  type AppControllerGetHelloData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryGetHello = (
  options?: AppControllerGetHelloData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.app.hello(),
    queryFn: async () => {
      const response = await appControllerGetHello(queryParams);
      return response.data;
    },
    ...config,
  });
};
