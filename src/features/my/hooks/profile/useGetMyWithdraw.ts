import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {ASYNC_STORAGE_KEYS, asyncStorage} from '../../../../lib/asyncStorage';
import {axios} from '../../../../lib/axios';

const fetcher = async (): Promise<string> =>
  await axios.get(`/users/my/withdraw`).then(({data}) => data);

interface IProps {
  options: {
    enabled?: boolean;
    onSuccessCallback?: () => void;
  };
}

export const useGetMyWithdraw = ({
  options,
}: IProps): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: KEYS.withdraw(),
    queryFn: async () => await fetcher(),
    enabled: options?.enabled,
    onSuccess: () => {
      void asyncStorage.remove(ASYNC_STORAGE_KEYS.AUTH_JWT_ACCESS_TOKEN);
      void asyncStorage.remove(ASYNC_STORAGE_KEYS.AUTH_JWT_REFRESH_TOKEN);

      options?.onSuccessCallback?.();
    },
  });

// export const useGetMyWithdraw = (
//   {enabled} = {enabled: false},
// ): UseQueryResult<string, Error> =>
//   useQuery({
//     queryKey: KEYS.withdraw(),
//     queryFn: async () => await fetcher(),
//     enabled,
//   });
