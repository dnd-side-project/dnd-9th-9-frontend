import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {type AxiosError} from 'axios';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  entryId: number;
}

interface IUsePostFieldEntryAcceptProps {
  onSuccessCallback?: () => void;
}

const fetcher = async ({entryId}: IProps): Promise<string> =>
  await axios.delete(`/field-entry/${entryId}/accept`).then(({data}) => data);

/** POST: 필드 수락 */
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
    },
  });
