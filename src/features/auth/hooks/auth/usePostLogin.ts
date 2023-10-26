import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {ASYNC_STORAGE_KEYS, asyncStorage} from '../../../../lib/asyncStorage';
import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  body: {
    uid: string;
    password: string;
  };
}

interface IReturnType {
  accessToken: string;
  refreshToken: string;
}

interface IMutationOptions {
  onSuccessCallback?: (data: IReturnType) => void;
  onErrorCallback?: (error: CustomAxiosError) => void;
}

const fetcher = async ({body}: IProps): Promise<IReturnType> =>
  await axios
    .post(`/auth/login`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

export const usePostLogin = (
  options?: IMutationOptions,
): UseMutationResult<IReturnType, CustomAxiosError, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: ({accessToken, refreshToken}) => {
      void asyncStorage.set(
        ASYNC_STORAGE_KEYS.AUTH_JWT_ACCESS_TOKEN,
        accessToken,
      );
      void asyncStorage.set(
        ASYNC_STORAGE_KEYS.AUTH_JWT_REFRESH_TOKEN,
        refreshToken,
      );

      options?.onSuccessCallback?.({accessToken, refreshToken});
    },
    onError: options?.onErrorCallback,
  });
};
