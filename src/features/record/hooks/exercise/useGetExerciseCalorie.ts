import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IDailyCalories} from '../../types';

interface IProps {
  date: string;
}

const fetcher = async ({date}: IProps): Promise<IDailyCalories> =>
  await axios
    .get(`/exercise/calorie-state`, {
      params: {
        date,
      },
    })
    .then(({data}) => data);

export const useGetExerciseCalorie = ({
  date,
}: IProps): UseQueryResult<IDailyCalories, Error> =>
  useQuery({
    queryKey: KEYS.calorie(date),
    queryFn: async () => await fetcher({date}),
    initialData: {
      burnedCalorie: 0,
      goalCalorie: 0,
    },
  });
