import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {
  getAuthStatus,
  HealthStatusCode,
  type HealthKitPermissions,
  type HealthStatusResult,
  defaultPermissions,
} from '../../lib/AppleHealthKit';

interface IHealthStatusResult extends HealthStatusResult {
  isAllLinked: boolean;
}

interface IProps {
  permissions?: HealthKitPermissions;
  options?: {
    enabled?: boolean;
  };
}

export const useGetHealthKitAuthStatus = (
  {permissions, options}: IProps = {
    permissions: defaultPermissions,
    options: {enabled: true},
  },
): UseQueryResult<IHealthStatusResult, Error> =>
  useQuery({
    queryKey: KEYS.auth(permissions),
    queryFn: async () => await getAuthStatus(permissions),
    enabled: options?.enabled,
    initialData: {
      permissions: {
        read: [],
        write: [],
      },
    },
    select: healthKitAuthStatus => {
      const isAllLinked = Object.values(healthKitAuthStatus.permissions)
        .flat()
        .every(permission => permission !== HealthStatusCode.NotDetermined);
      return {...healthKitAuthStatus, isAllLinked};
    },
  });
