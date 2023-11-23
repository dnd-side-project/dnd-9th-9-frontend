import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IFieldResult} from '../../types';

interface IProps {
  id: number;
}

const fetcher = async ({id}: IProps): Promise<IFieldResult> =>
  await axios.get(`/field/${id}/result`).then(({data}) => data);

export const useGetFieldDetailResult = ({
  id,
}: IProps): UseQueryResult<IFieldResult, Error> =>
  useQuery({
    queryKey: KEYS.detailResult(id),
    queryFn: async () => await fetcher({id}),
  });
