import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {getLatestWeight} from '../../lib/AppleHealthKit';

export const useGetLatestWeight = (): UseQueryResult<number | null, Error> =>
  useQuery({
    queryKey: KEYS.latestWeight(),
    queryFn: async () => await getLatestWeight().then(({value}) => value),
    initialData: null,
  });
