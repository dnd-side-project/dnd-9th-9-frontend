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
    currentPageSize: number;
  }>;
} = {
  pageParams: [],
  pages: [
    {
      currentPageSize: 0,
      fieldsInfos: [],
    },
  ],
};

const fetcher = async ({
  fieldId,
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
  currentPageSize: number;
}> =>
  await axios
    .get(`/field`, {
      params: {
        fieldId,
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
  fieldId,
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
    currentPageSize: number;
  },
  Error
> =>
  useInfiniteQuery({
    queryKey: KEYS.list({
      fieldId,
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
    queryFn: async ({pageParam = null}) =>
      await fetcher({
        fieldId: pageParam,
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
    getNextPageParam: lastPage => {
      const {fieldsInfos} = lastPage;

      return fieldsInfos.length === 0
        ? undefined
        : fieldsInfos[fieldsInfos.length - 1].id;
    },
    initialData,
  });
