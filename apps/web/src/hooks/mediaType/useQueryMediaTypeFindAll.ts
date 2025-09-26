import { useQuery } from '@tanstack/react-query';
import {
  mediaTypeControllerFindAll,
  type MediaTypeControllerFindAllData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryMediaTypeFindAll = (
  options?: MediaTypeControllerFindAllData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.mediaType.list(queryParams),
    queryFn: async () => {
      const response = await mediaTypeControllerFindAll(queryParams);
      return response.data;
    },
    ...config,
  });
};
