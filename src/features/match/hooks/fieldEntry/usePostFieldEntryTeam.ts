import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';
import {type IFieldEntryTeam} from '../../types/fieldEntry';

interface IProps {
  body: IFieldEntryTeam;
}

interface IUsePostFieldEntryTeamProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

/** POST: 팀 또는 팀배틀 입장 신청 */
const fetcher = async ({body}: IProps): Promise<string> =>
  await axios.post('/field-entry/team', body).then(({data}) => data);

export const usePostFieldEntryTeam = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePostFieldEntryTeamProps): UseMutationResult<
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
