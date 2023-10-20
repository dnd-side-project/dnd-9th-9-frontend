import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  body: {
    uid: string;
    phoneNum: string;
  };
}

interface IMutationOptions {
  onSuccessCallback?: (data: string) => void;
  onErrorCallback?: (error: CustomAxiosError) => void;
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post('/verification/find-pw-code', body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

/**
 * 해당 전화번호로 인증번호를 발송합니다.
 * - 해당 아이디의 유저가 존재하지 않거나 회원정보에 등록된 전화번호와 일치하지 않는다면, 인증번호를 발송하지 않습니다.
 */
export const usePostSendCodeFindPassword = (
  options: IMutationOptions,
): UseMutationResult<string, CustomAxiosError, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    ...options,
  });
};
