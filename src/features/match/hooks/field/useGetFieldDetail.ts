import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  id: number;
}

interface IFieldDetailInfo {
  assignedFieldDto: {
    currentSize: number;
    fieldType: string;
    goal: string;
    id: number;
    maxSize: number;
    name: string;
    period: string;
    profileImg: string;
    skillLevel: string;
  };
  fieldDto: {
    currentSize: number;
    description: string;
    endDate: string;
    fieldType: string;
    goal: string;
    id: number;
    maxSize: number;
    name: string;
    period: string;
    profileImg: string;
    rule: string;
    skillLevel: string;
    strength: string;
  };
}

const fetcher = async ({id}: IProps): Promise<IFieldDetailInfo> =>
  await axios.post(`/field/${id}`).then(({data}) => data);

export const useGetFieldDetail = ({
  id,
}: IProps): UseQueryResult<IFieldDetailInfo, Error> =>
  useQuery({
    queryKey: KEYS.detail(id),
    queryFn: async () => await fetcher({id}),
    initialData: {
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
