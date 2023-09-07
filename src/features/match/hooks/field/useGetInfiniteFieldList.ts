import {
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IField, type IFieldListPaginationParams} from '../../types';

const initialData: {
  pageParams: any;
  pages: Array<{
    fieldsInfos: IField[];
    totalCount: number;
    currentPageNumber: number;
    currentPageSize: number;
  }>;
} = {
  pageParams: [],
  pages: [
    {
      fieldsInfos: [],
      totalCount: 0,
      currentPageNumber: 0,
      currentPageSize: 0,
    },
  ],
};

const fetcher = async ({
  size,
  page,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
  keyword,
}: IFieldListPaginationParams): Promise<{
  fieldsInfos: IField[];
  totalCount: number;
  currentPageNumber: number;
  currentPageSize: number;
}> =>
  await axios
    .get(`/field`, {
      params: {
        size,
        page,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
        keyword,
      },
    })
    .then(({data}) => data);

export const useGetInfiniteFieldList = ({
  size,
  page,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
  keyword,
}: IFieldListPaginationParams): UseInfiniteQueryResult<
  {
    fieldsInfos: IField[];
    totalCount: number;
    currentPageNumber: number;
    currentPageSize: number;
  },
  Error
> =>
  useInfiniteQuery({
    queryKey: KEYS.list({
      size,
      page,
      fieldType,
      goal,
      memberCount,
      period,
      skillLevel,
      strength,
      keyword,
    }),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        size,
        page: pageParam,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
        keyword,
      }),
    getNextPageParam: lastPage => {
      const {currentPageNumber, currentPageSize, fieldsInfos, totalCount} =
        lastPage;

      const currentDataCount =
        currentPageNumber > 0
          ? (currentPageNumber - 1) * currentPageSize + fieldsInfos.length
          : fieldsInfos.length;
      const nextPage = currentPageNumber + 1;

      return totalCount > currentDataCount ? nextPage : null;
    },
    initialData,
  });
