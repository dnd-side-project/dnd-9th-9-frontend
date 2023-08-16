import {useQuery, type UseQueryResult} from '@tanstack/react-query';

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

export const useGetBookmarkList = (): UseQueryResult<
  IBookmarkListInfo,
  Error
> =>
  useQuery({
    queryKey: KEYS.list(),
    queryFn: async () => await fetcher(),
    initialData: {
      bookmarks: [],
      totalCount: 0,
    },
  });
