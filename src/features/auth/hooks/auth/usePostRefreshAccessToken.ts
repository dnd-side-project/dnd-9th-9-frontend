import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {ASYNC_STORAGE_KEYS, asyncStorage} from '../../../../lib/asyncStorage';
import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  body: {
    refreshToken: string;
  };
}

interface IReturnType {
  accessToken: string;
}

interface IMutationOptions {
  onSuccessCallback?: (data: IReturnType) => void;
  onErrorCallback?: (error: CustomAxiosError) => void;
}

export const requestPostAuthRefresh = async ({
  body,
}: IProps): Promise<IReturnType> =>
  await axios
    .post(`/auth/refresh`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

export const usePostRefreshAccessToken = (
  options?: IMutationOptions,
): UseMutationResult<IReturnType, CustomAxiosError, IProps> => {
  return useMutation({
    mutationFn: requestPostAuthRefresh,
    onSuccess: ({accessToken}) => {
      void asyncStorage.set(
        ASYNC_STORAGE_KEYS.AUTH_JWT_ACCESS_TOKEN,
        accessToken,
      );

      options?.onSuccessCallback?.({accessToken});
    },
    onError: options?.onErrorCallback,
  });
};
