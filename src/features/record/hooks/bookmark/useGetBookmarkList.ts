import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IBookmarkListInfo {
  bookmarks: Array<{
    id: 0;
    sports: 'AMERICAN_FOOTBALL';
  }>;
  totalCount: 0;
}

const fetcher = async (): Promise<IBookmarkListInfo> =>
  await axios.get(`/bookmarks`).then(({data}) => data);

export const useGetExerciseList = (
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
