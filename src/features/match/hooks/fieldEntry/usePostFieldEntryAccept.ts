import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';
import {KEYS as FIELD_KEYS} from '../field/keys';

interface IProps {
  entryId: number;
}

interface IUsePostFieldEntryAcceptProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({entryId}: IProps): Promise<string> =>
  await axios.post(`/field-entry/${entryId}/accept`).then(({data}) => data);

export const usePostFieldEntryAccept = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePostFieldEntryAcceptProps): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
> =>
  useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
      void queryClient.fetchInfiniteQuery(FIELD_KEYS.all);
    },
    onError: error => {
      onErrorCallback(error);
    },
  });
