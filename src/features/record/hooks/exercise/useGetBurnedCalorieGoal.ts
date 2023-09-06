import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IBurnedCalorieGoal} from '../../types';

interface IProps {
  date: string;
}

const fetcher = async ({date}: IProps): Promise<IBurnedCalorieGoal> =>
  await axios
    .get(`/exercise/calorie-state`, {
      params: {
        date,
      },
    })
    .then(({data}) => data);

export const useGetBurnedCalorieGoal = ({
  date,
}: IProps): UseQueryResult<IBurnedCalorieGoal, Error> =>
  useQuery({
    queryKey: KEYS.burnedCalorieGoal(date),
    queryFn: async () => await fetcher({date}),
    initialData: {
      burnedCalorie: 0,
      goalCalorie: 0,
    },
  });
