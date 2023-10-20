import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {getLatestHeight} from '../../lib/AppleHealthKit';

export const useGetLatestHeight = (): UseQueryResult<number | null, Error> =>
  useQuery({
    queryKey: KEYS.latestHeight(),
    queryFn: async () => await getLatestHeight().then(({value}) => value),
    initialData: null,
  });
