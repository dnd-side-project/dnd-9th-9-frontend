import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  body: {
    deletePrevImg: boolean;
    newProfileImg?: string;
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .patch(`/users/my/profile`, body, {
      headers: {'Content-Type': 'application/json'},
    })
    .then(({data}) => data);

export const usePatchMyProfile = (): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.profileDetail());
    },
  });
};
