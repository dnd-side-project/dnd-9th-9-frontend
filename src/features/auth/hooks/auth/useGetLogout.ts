import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {ASYNC_STORAGE_KEYS, asyncStorage} from '../../../../lib/asyncStorage';
import {axios} from '../../../../lib/axios';

const fetcher = async (): Promise<string> =>
  await axios.get(`/auth/logout`).then(({data}) => data);

interface IProps {
  options: {
    enabled?: boolean;
    onSuccessCallback?: () => void;
  };
}

export const useGetLogout = ({
  options,
}: IProps): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: KEYS.logout(),
    queryFn: async () => await fetcher(),
    enabled: options?.enabled,
    onSuccess: () => {
      void asyncStorage.remove(ASYNC_STORAGE_KEYS.AUTH_JWT_ACCESS_TOKEN);
      void asyncStorage.remove(ASYNC_STORAGE_KEYS.AUTH_JWT_REFRESH_TOKEN);

      options?.onSuccessCallback?.();
    },
  });
