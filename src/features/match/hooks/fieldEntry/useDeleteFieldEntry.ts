import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {type AxiosError} from 'axios';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  entryId: number;
}

interface IUseDeleteFieldEntryProps {
  onSuccessCallback?: () => void;
}

const fetcher = async ({entryId}: IProps): Promise<string> =>
  await axios.delete(`/field-entry/${entryId}`).then(({data}) => data);

export const useDeleteFieldEntry = ({
  onSuccessCallback = () => {},
}: IUseDeleteFieldEntryProps): UseMutationResult<string, AxiosError, IProps> =>
  useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
