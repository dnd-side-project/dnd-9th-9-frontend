import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {ASYNC_STORAGE_KEYS, asyncStorage} from '../../../../lib/asyncStorage';
import {axios} from '../../../../lib/axios';
import Toast from '../../../../lib/toast';
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

const fetcher = async ({body}: IProps): Promise<IReturnType> =>
  await axios
    .post(`/auth/login`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

export const usePostLogin = (): UseMutationResult<
  IReturnType,
  Error,
  IProps
> => {
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
    },
    onError: (error: CustomAxiosError) => {
      if (error.response?.data.message == null) return;
      Toast.show({message: error.response?.data.message});
    },
  });
};
