import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {
  type IField,
  type IFieldListInfo,
  type IFieldListPaginationParams,
} from '../../types';

export const FIELD_DUMMY_DATA: {fieldsInfos: IField[]; totalCount: number} = {
  fieldsInfos: [
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
  ],
  totalCount: 3,
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
}: IFieldListPaginationParams): Promise<IFieldListInfo> =>
  await axios.get(`/field`, {
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
  });

export const useGetFieldListInfo = ({
  pageSize,
  pageNumber,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IFieldListPaginationParams): UseQueryResult<IFieldListInfo, Error> =>
  useQuery({
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
    queryFn: async () =>
      await fetcher({
        pageSize,
        pageNumber,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      }),
    initialData: FIELD_DUMMY_DATA,
  });
