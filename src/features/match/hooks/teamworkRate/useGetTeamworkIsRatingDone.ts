import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  fieldId: number;
}

const fetcher = async ({fieldId}: IProps): Promise<boolean> =>
  await axios
    .get('/teamwork-rate/is-rating-done', {
      params: {
        fieldId,
      },
    })
    .then(({data}) => data);

export const useGetTeamworkIsRatingDone = ({
  fieldId,
}: IProps): UseQueryResult<boolean, CustomAxiosError> =>
  useQuery({
    queryKey: KEYS.isRatingDone(fieldId),
    queryFn: async () => await fetcher({fieldId}),
  });
