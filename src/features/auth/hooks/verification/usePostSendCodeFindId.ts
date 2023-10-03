import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';

interface IProps {
  body: {
    name: string;
    phoneNum: string;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post('/verification/find-id-code', body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

/**
 * 해당 전화번호로 인증번호를 발송합니다. 해당 이름과 전화번호를 가진 유저가 존재하지 않는다면, 인증번호를 발송하지 않습니다.
 */
export const usePostSendCodeFindId = (): UseMutationResult<
  string,
  Error,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
  });
};
