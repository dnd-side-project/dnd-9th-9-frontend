import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';
import {type ICreateField} from '../../types';

interface IProps {
  id: number;
  body: Omit<ICreateField, 'name' | 'profileImg' | 'description' | 'rule'>;
}

interface IUsePatchFieldInformationProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({id, body}: IProps): Promise<string> =>
  await axios.patch(`/field/${id}/info`, body).then(({data}) => data);

export const usePatchFieldInformation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePatchFieldInformationProps): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: response => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
    onError: error => {
      onErrorCallback(error);
    },
  });
};
