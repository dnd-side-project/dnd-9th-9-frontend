import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IFieldDetailInfo} from '../../types';

interface IProps {
  id: number;
}

const fetcher = async ({id}: IProps): Promise<IFieldDetailInfo> =>
  await axios.post(`/field/${id}`).then(({data}) => data);

export const useGetFieldDetail = ({
  id,
}: IProps): UseQueryResult<IFieldDetailInfo, Error> =>
  useQuery({
    queryKey: KEYS.detail(id),
    queryFn: async () => await fetcher({id}),
    placeholderData: {
      assignedFieldDto: {
        currentSize: 0,
        fieldType: '',
        goal: '',
        id: 0,
        maxSize: 0,
        name: '',
        period: '',
        profileImg: '',
        skillLevel: '',
      },
      fieldDto: {
        currentSize: 0,
        description: '',
        endDate: '',
        fieldType: '',
        goal: '',
        id: 0,
        maxSize: 0,
        name: '',
        period: '',
        profileImg: '',
        rule: '',
        skillLevel: '',
        strength: '',
      },
    },
  });
