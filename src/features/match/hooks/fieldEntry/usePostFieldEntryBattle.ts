import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';
import {type IFieldEntryBattle} from '../../types/fieldEntry';

interface IProps {
  body: IFieldEntryBattle;
}

interface IUsePostFieldEntryBattleProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios.post('/field-entry/battle', body).then(({data}) => data);

/** POST: 1:1배틀 혹은 팀배틀 신청 */
export const usePostFieldEntryBattle = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePostFieldEntryBattleProps): UseMutationResult<
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
