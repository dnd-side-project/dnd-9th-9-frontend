import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IBookmarkListInfo {
  bookmarks: Array<{
    id: number;
    sports: string;
  }>;
  totalCount: number;
}

const fetcher = async (): Promise<IBookmarkListInfo> =>
  await axios.get(`/bookmarks`).then(({data}) => data);

export const useGetBookmarkList = (
  options?: UseQueryOptions<IBookmarkListInfo, Error>,
): UseQueryResult<IBookmarkListInfo, Error> =>
  useQuery({
    queryKey: KEYS.list(),
    queryFn: async () => await fetcher(),
    initialData: {
      bookmarks: [
        {
          id: 0,
          sports: 'AMERICAN_FOOTBALL',
        },
      ],
      totalCount: 0,
    },
    ...options,
  });
