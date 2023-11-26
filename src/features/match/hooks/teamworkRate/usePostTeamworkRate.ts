import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  fieldId: number;
  teamworkRate: number;
}

interface IUsePostTeamworkRateProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({fieldId, teamworkRate}: IProps): Promise<string> =>
  await axios
    .post('/teamwork-rate', {
      fieldId,
      teamworkRate,
    })
    .then(({data}) => data);

export const usePostTeamworkRate = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePostTeamworkRateProps): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
    onError: error => {
      onErrorCallback(error);
    },
  });
};
