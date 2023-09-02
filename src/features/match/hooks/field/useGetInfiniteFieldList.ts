import {
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IField, type IFieldListPaginationParams} from '../../types';

const initialData: {
  pageParams: any;
  pages: Array<{fieldsInfos: IField[]; totalCount: number}>;
} = {
  pageParams: [],
  pages: [
    {
      fieldsInfos: [],
      totalCount: 0,
    },
  ],
};

const fetcher = async ({
  pageSize,
  pageNumber,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IFieldListPaginationParams): Promise<{
  fieldsInfos: IField[];
  totalCount: number;
}> =>
  await axios
    .get(`/field`, {
      params: {
        pageSize,
        pageNumber,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      },
    })
    .then(({data}) => data);

export const useGetInfiniteFieldList = ({
  pageSize,
  pageNumber,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IFieldListPaginationParams): UseInfiniteQueryResult<
  {
    fieldsInfos: IField[];
    totalCount: number;
  },
  Error
> =>
  useInfiniteQuery({
    queryKey: KEYS.list({
      pageSize,
      pageNumber,
      fieldType,
      goal,
      memberCount,
      period,
      skillLevel,
      strength,
    }),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        pageSize,
        pageNumber: pageParam,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      }),
    getNextPageParam: lastPage => {
      if (lastPage.fieldsInfos.length === pageSize) return pageNumber + 1;
      return {fieldsInfos: [], totalCount: lastPage.totalCount};
    },
    initialData,
  });
