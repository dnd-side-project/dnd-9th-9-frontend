import {
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type ITeamEntry} from '../../types/fieldEntry';

interface IProps {
  id: number;
  size: number;
  page: number;
}

const initialData: {
  pageParams: any;
  pages: Array<{
    teamEntries: ITeamEntry[];
    totalCount: number;
    currentPageNumber: number;
    currentPageSize: number;
  }>;
} = {
  pageParams: [],
  pages: [
    {
      teamEntries: [],
      totalCount: 0,
      currentPageNumber: 0,
      currentPageSize: 0,
    },
  ],
};

const fetcher = async ({
  id,
  size,
  page,
}: IProps): Promise<{
  teamEntries: ITeamEntry[];
  totalCount: number;
  currentPageNumber: number;
  currentPageSize: number;
}> =>
  await axios
    .get(`/field-entry/team/${id}`, {
      params: {
        size,
        page,
      },
    })
    .then(({data}) => data);

/** GET: [팀 - 팀원] 페이지 - 팀 신청받은 내역 조회  */
export const useGetFieldEntryTeam = ({
  id,
  size,
  page,
}: IProps): UseInfiniteQueryResult<
  {
    teamEntries: ITeamEntry[];
    totalCount: number;
    currentPageNumber: number;
    currentPageSize: number;
  },
  Error
> =>
  useInfiniteQuery({
    queryKey: KEYS.entry({
      id,
      size,
      page,
    }),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        id,
        size,
        page: pageParam,
      }),
    getNextPageParam: lastPage => {
      const {currentPageNumber, currentPageSize, teamEntries, totalCount} =
        lastPage;

      const currentDataCount =
        currentPageNumber > 0
          ? (currentPageNumber - 1) * currentPageSize + teamEntries.length
          : teamEntries.length;
      const nextPage = currentPageNumber + 1;

      return totalCount > currentDataCount ? nextPage : null;
    },
    initialData,
  });
