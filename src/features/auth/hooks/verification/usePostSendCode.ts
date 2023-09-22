import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';

interface IProps {
  body: {
    phoneNum: string;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post('/verification/send-code', body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

/**
 * 해당 전화번호로 인증번호를 발송합니다.
 */
export const usePostSendCode = (): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
  });
};
