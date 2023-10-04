import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {
  getAuthStatus,
  type HealthKitPermissions,
  type HealthStatusResult,
} from '../../lib/AppleHealthKit';

export const useGetHealthKitAuthStatus = (
  permissions?: HealthKitPermissions,
): UseQueryResult<HealthStatusResult, Error> =>
  useQuery({
    queryKey: KEYS.auth(permissions),
    queryFn: async () => await getAuthStatus(permissions),
    initialData: {
      permissions: {
        read: [],
        write: [],
      },
    },
  });
