import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type ICreateField} from '../../types';

interface IProps {
  body: ICreateField;
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/field`, {
      body,
    })
    .then(({data}) => data);

export const usePostField = (): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
};
