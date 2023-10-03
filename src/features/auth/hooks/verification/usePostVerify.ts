import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';
import {type TVerifyingType} from '../../types';

interface IProps {
  body: {
    phoneNum: string;
    code: string;
    verifyingType: TVerifyingType;
  };
}

const fetcher = async ({body}: IProps): Promise<boolean> =>
  await axios
    .post(`/verification/verify`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    // TODO(@minimalKim): return type swagger 상 boolean로 되어있는데 실제로 string 반환 확인
    .then(({data}) => {
      if (typeof data === 'boolean') {
        return data;
      }
      return data === '인증되었습니다.';
    });

/**
 * 발송받은 인증번호로 인증을 수행합니다. 인증 성공 여부를 반환합니다.
 */
export const usePostVerify = (): UseMutationResult<boolean, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
  });
};
