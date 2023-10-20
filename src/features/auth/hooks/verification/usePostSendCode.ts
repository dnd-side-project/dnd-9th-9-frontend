import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  body: {
    phoneNum: string;
  };
}

interface IMutationOptions {
  onSuccessCallback?: (data: string) => void;
  onErrorCallback?: (error: CustomAxiosError) => void;
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post('/verification/sign-up-code', body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

/**
 * 해당 전화번호로 인증번호를 발송합니다.
 */
export const usePostSendCode = (
  options?: IMutationOptions,
): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: options?.onSuccessCallback,
    onError: options?.onErrorCallback,
  });
};
