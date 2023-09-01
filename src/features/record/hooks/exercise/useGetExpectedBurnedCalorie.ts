import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {type HealthActivity} from '../../../../lib/AppleHealthKit';
import {axios} from '../../../../lib/axios';

interface IProps {
  durationMinute: number;
  sports: HealthActivity;
}

const fetcher = async ({durationMinute, sports}: IProps): Promise<number> =>
  await axios
    .get(`/exercise/my-summary`, {
      params: {
        durationMinute,
        sports,
      },
    })
    .then(({data}) => data);

export const useGetExpectedBurnedCalorie = ({
  durationMinute,
  sports,
}: IProps): UseQueryResult<number, Error> =>
  useQuery({
    queryKey: KEYS.expectedBurnedCalorie(durationMinute, sports),
    queryFn: async () => await fetcher({durationMinute, sports}),
    initialData: 0,
  });
