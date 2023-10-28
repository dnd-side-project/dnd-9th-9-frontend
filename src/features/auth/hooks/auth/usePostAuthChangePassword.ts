import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  body: {
    confirmPassword: string;
    newPassword: string;
    phoneNum: string;
    uid: string;
  };
}

interface IMutationOptions {
  onSuccessCallback?: (data: string) => void;
  onErrorCallback?: (error: CustomAxiosError) => void;
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/auth/change-pw`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

export const usePostAuthChangePassword = (
  options?: IMutationOptions,
): UseMutationResult<string, CustomAxiosError, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: options?.onSuccessCallback,
    onError: options?.onErrorCallback,
  });
};
