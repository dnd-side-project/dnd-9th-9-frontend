import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {
  getActivitySummary,
  type HealthInputOptions,
  type HealthActivitySummary,
} from '../../lib/AppleHealthKit';

export const useGetActivitySummary = (
  options?: HealthInputOptions,
): UseQueryResult<HealthActivitySummary[], Error> =>
  useQuery({
    queryKey: KEYS.activitySummary(),
    queryFn: async () => await getActivitySummary(options),
    initialData: [],
  });
