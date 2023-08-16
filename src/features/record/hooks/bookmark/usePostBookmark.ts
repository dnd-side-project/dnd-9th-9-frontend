import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  body: {
    sports: string[];
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/bookmarks`, {
      body,
    })
    .then(({data}) => data);

export const usePostBookmark = (): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.list());
    },
  });
};
