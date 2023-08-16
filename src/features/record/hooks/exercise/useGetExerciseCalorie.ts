import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  date: string;
}

interface IDailyCalories {
  burnedCalorie: number;
  goalCalorie: number;
}

const fetcher = async ({date}: IProps): Promise<IDailyCalories> =>
  await axios
    .get(`/exercise/calorie-state`, {
      params: {
        date,
      },
    })
    .then(({data}) => data);

export const useGetExerciseCalorie = (
  {date}: IProps,
  options?: UseQueryOptions<IDailyCalories, Error>,
): UseQueryResult<IDailyCalories, Error> =>
  useQuery({
    queryKey: KEYS.calorie(date),
    queryFn: async () => await fetcher({date}),
    initialData: {
      burnedCalorie: 0,
      goalCalorie: 0,
    },
    ...options,
  });
