import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {type AxiosError} from 'axios';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {KEYS as FIELD_KEYS} from '../field/keys';

interface IProps {
  entryId: number;
}

interface IUsePostFieldEntryAcceptProps {
  onSuccessCallback?: () => void;
}

const fetcher = async ({entryId}: IProps): Promise<string> =>
  await axios.post(`/field-entry/${entryId}/accept`).then(({data}) => data);

export const usePostFieldEntryAccept = ({
  onSuccessCallback = () => {},
}: IUsePostFieldEntryAcceptProps): UseMutationResult<
  string,
  AxiosError,
  IProps
> =>
  useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
      void queryClient.fetchInfiniteQuery(FIELD_KEYS.all);
    },
  });
