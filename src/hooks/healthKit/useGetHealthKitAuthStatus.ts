import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {
  AppleHealthKit,
  type HealthStatusResult,
  type HealthKitPermissions,
} from '../../lib/AppleHealthKit';

interface IProps extends HealthKitPermissions {}

const fetcher = async ({permissions}: IProps): Promise<HealthStatusResult> => {
  return await new Promise((resolve, reject) => {
    AppleHealthKit.getAuthStatus({permissions}, (err, results) => {
      if (err != null) {
        reject(new Error(err));
      } else {
        resolve(results);
      }
    });
  });
};

export const useGetHealthKitAuthStatus = ({
  permissions,
}: IProps): UseQueryResult<HealthStatusResult, Error> =>
  useQuery({
    queryKey: KEYS.auth({permissions}),
    queryFn: async () => await fetcher({permissions}),
    initialData: {
      permissions: {
        read: [],
        write: [],
      },
    },
  });
