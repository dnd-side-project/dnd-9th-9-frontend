import {
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IMatchDetailRecord, type TFieldType} from '../../types';

interface IProps {
  id: number;
  date: string;
  fieldType: TFieldType;
  page: number;
  size: number;
}

interface IFieldRecord {
  currentPageNumber: number;
  currentPageSize: number;
  daysLeft: number;
  recordList: IMatchDetailRecord[];
  rule: string;
  totalCount: number;
  winStatus: 'DRAW' | 'LOSE' | 'WIN';
}

const fetcher = async ({
  id,
  date,
  fieldType,
  page,
  size,
}: IProps): Promise<IFieldRecord> =>
  await axios
    .get(`/field/${id}/record`, {
      params: {
        date,
        fieldType,
        page,
        size,
      },
    })
    .then(({data}) => data);

export const useGetInfiniteFieldRecord = ({
  id,
  date,
  fieldType,
  page,
  size,
}: IProps): UseInfiniteQueryResult<IFieldRecord, Error> =>
  useInfiniteQuery({
    queryKey: KEYS.detailRecord(id, date, fieldType, page, size),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        id,
        date,
        fieldType,
        page: pageParam,
        size,
      }),
    getNextPageParam: lastPage => {
      return undefined;
      // const {currentPageNumber, currentPageSize, totalCount, recordList} =
      //   lastPage;

      // const currentDataCount =
      //   currentPageNumber > 0
      //     ? (currentPageNumber - 1) * currentPageSize + recordList.length
      //     : recordList.length;
      // const nextPage = currentPageNumber + 1;

      // return totalCount > currentDataCount ? nextPage : undefined;
    },
    initialData: {
      pageParams: [],
      pages: [],
    },
  });
