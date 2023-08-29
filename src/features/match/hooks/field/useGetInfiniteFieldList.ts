import {
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IField, type IFieldListPaginationParams} from '../../types';

export const FIELD_INFINITE_DUMMY_DATA: IField[] = [
  {
    currentSize: 3,
    fieldType: 'DUEL',
    goal: 'LOSS',
    id: 1,
    maxSize: 10,
    name: '테스트1',
    period: 'ONE_WEEK',
    profileImg: 'string',
    skillLevel: 'ADVANCED_INTERMEDIATE',
  },
  {
    currentSize: 6,
    fieldType: 'DUEL',
    goal: 'LOSS',
    id: 2,
    maxSize: 10,
    name: '테스트2',
    period: 'ONE_WEEK',
    profileImg: 'string',
    skillLevel: 'ADVANCED_INTERMEDIATE',
  },
  {
    currentSize: 4,
    fieldType: 'DUEL',
    goal: 'LOSS',
    id: 3,
    maxSize: 10,
    name: '테스트3',
    period: 'ONE_WEEK',
    profileImg: 'string',
    skillLevel: 'ADVANCED_INTERMEDIATE',
  },
];

const fetcher = async ({
  pageSize,
  pageNumber,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IFieldListPaginationParams): Promise<IField[]> =>
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
    .then(({data}) => data.fieldsInfos);

export const useGetInfiniteFieldList = ({
  pageSize,
  pageNumber,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IFieldListPaginationParams): UseInfiniteQueryResult<IField[], Error> =>
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
      if (lastPage.length === pageSize) {
        return pageNumber + 1;
      }
      return [];
    },
  });
