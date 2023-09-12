import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {axios} from '../../../../lib/axios';
import {type SkillLevels} from '../../../match/const';

interface IProps {
  body: {
    name: string;
    password: string;
    phoneNum: string;
    skillLevel: keyof typeof SkillLevels;
    uid: string;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/auth/sign-up`, {
      body,
    })
    .then(({data}) => data);

export const usePostSignup = (): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
  });
};
