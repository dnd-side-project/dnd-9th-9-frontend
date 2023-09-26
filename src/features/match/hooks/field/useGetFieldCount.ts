import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IFieldListParams} from '../../types';

const fetcher = async ({
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
  keyword,
}: IFieldListParams): Promise<number> =>
  await axios
    .get('/field/count', {
      params: {
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

export const useGetFieldCount = ({
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
  keyword,
}: IFieldListParams): UseQueryResult<number, Error> =>
  useQuery({
    queryKey: KEYS.count({
      fieldType,
      goal,
      memberCount,
      period,
      skillLevel,
      strength,
      keyword,
    }),
    queryFn: async () =>
      await fetcher({
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
        keyword,
      }),
    initialData: 0,
  });
