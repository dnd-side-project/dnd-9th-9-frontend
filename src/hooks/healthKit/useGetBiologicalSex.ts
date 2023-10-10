import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {getBiologicalSex} from '../../lib/AppleHealthKit';

export const useGetBiologicalSex = (): UseQueryResult<string | null, Error> =>
  useQuery({
    queryKey: KEYS.biologicalSex(),
    queryFn: async () =>
      await getBiologicalSex().then(({value}) => value?.toUpperCase()),
    initialData: null,
  });
