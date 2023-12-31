import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IFieldDetailInfo} from '../../types';

interface IProps {
  id: number;
}

const fetcher = async ({id}: IProps): Promise<IFieldDetailInfo> =>
  await axios.get(`/field/${id}`).then(({data}) => data);

export const useGetFieldDetail = ({
  id,
}: IProps): UseQueryResult<IFieldDetailInfo, Error> =>
  useQuery({
    queryKey: KEYS.detail(id),
    queryFn: async () => await fetcher({id}),
  });
