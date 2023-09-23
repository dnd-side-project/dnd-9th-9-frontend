import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IBattleEntry, type TFieldType} from '../../types';

interface IProps {
  fieldType: TFieldType;
  page: number;
  size: number;
}

interface IUseGetFieldEntry {
  battleEntries: IBattleEntry[];
  currentPageNumber: number;
  currentPageSize: number;
  totalCount: number;
}

const fetcher = async ({
  fieldType,
  page,
  size,
}: IProps): Promise<IUseGetFieldEntry> =>
  await axios
    .get(`/field-entry`, {params: {fieldType, page, size}})
    .then(({data}) => data);

export const useGetInfiniteFieldEntry = ({
  fieldType,
  page = 0,
  size = 3,
}: IProps): UseInfiniteQueryResult<IUseGetFieldEntry, Error> =>
  useInfiniteQuery({
    queryKey: KEYS.fieldEntry({
      fieldType,
      page,
      size,
    }),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        fieldType,
        page: pageParam,
        size,
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
          currentPageNumber: 0,
          currentPageSize: 0,
          totalCount: 0,
        },
      ],
    },
  });
