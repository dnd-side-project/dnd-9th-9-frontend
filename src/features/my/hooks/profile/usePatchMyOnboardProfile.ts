import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';
import {type TGender} from '../../types';

interface IProps {
  body: {
    calorieGoal?: number;
    gender: TGender;
    height: number;
    isAppleLinked: boolean;
    weight: number;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .patch(`/users/my/onboard-profile`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

/**
 * 온보딩 시 내 정보(신체정보) 등록
 */
export const usePatchMyOnboardProfile = (): UseMutationResult<
  string,
  Error,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
  });
};
