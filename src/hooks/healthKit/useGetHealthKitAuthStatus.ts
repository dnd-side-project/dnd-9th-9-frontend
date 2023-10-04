import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {getAuthStatus, type HealthStatusResult} from '../../lib/AppleHealthKit';

export const useGetHealthKitAuthStatus = (): UseQueryResult<
  HealthStatusResult,
  Error
> =>
  useQuery({
    queryKey: KEYS.auth(),
    queryFn: getAuthStatus,
    initialData: {
      permissions: {
        read: [],
        write: [],
      },
    },
  });
