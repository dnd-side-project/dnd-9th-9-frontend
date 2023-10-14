import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {
  getAuthStatus,
  HealthStatusCode,
  type HealthKitPermissions,
  type HealthStatusResult,
} from '../../lib/AppleHealthKit';

interface IHealthStatusResult extends HealthStatusResult {
  isAllLinked: boolean;
}

export const useGetHealthKitAuthStatus = (
  permissions?: HealthKitPermissions,
): UseQueryResult<IHealthStatusResult, Error> =>
  useQuery({
    queryKey: KEYS.auth(permissions),
    queryFn: async () => await getAuthStatus(permissions),
    initialData: {
      permissions: {
        read: [],
        write: [],
      },
    },
    select: healthKitAuthStatus => {
      const isAllLinked = !Object.values(healthKitAuthStatus.permissions)
        .flat()
        .some(permission => permission === HealthStatusCode.NotDetermined);
      return {...healthKitAuthStatus, isAllLinked};
    },
  });
