import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IBattleEntry} from '../../types';

interface IProps {
  id: number;
  page: number;
  size: number;
  fieldDirection: 'RECEIVED' | 'SENT';
}

interface IFieldEntryBattle {
  battleEntries: IBattleEntry[];
  currentPageNumber: number;
  currentPageSize: number;
  totalCount: number;
}

const fetcher = async ({
  id,
  page,
  size,
  fieldDirection,
}: IProps): Promise<IFieldEntryBattle> =>
  await axios
    .get(`/field-entry/battle/${id}`, {
      params: {
        page,
        size,
        fieldDirection,
      },
    })
    .then(({data}) => data);

export const useGetInfiniteFieldEntryBattleDetail = ({
  id,
  page,
  size,
  fieldDirection,
}: IProps): UseInfiniteQueryResult<IFieldEntryBattle, Error> =>
  useInfiniteQuery({
    queryKey: KEYS.battle({id, page, size, fieldDirection}),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        id,
        size,
        page: pageParam,
        fieldDirection,
      }),
    getNextPageParam: lastPage => {
      const {currentPageNumber, currentPageSize, totalCount, battleEntries} =
        lastPage;

      const currentDataCount =
        currentPageNumber > 0
          ? (currentPageNumber - 1) * currentPageSize + battleEntries.length
          : battleEntries.length;
      const nextPage = currentPageNumber + 1;

      return totalCount > currentDataCount ? nextPage : undefined;
    },
    initialData: {
      pageParams: [],
      pages: [
        {
          battleEntries: [],
          totalCount: 0,
          currentPageNumber: 0,
          currentPageSize: 0,
        },
      ],
    },
  });
