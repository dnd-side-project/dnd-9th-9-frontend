import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IProfileDetail} from '../../types';

const fetcher = async (): Promise<IProfileDetail> =>
  await axios.get(`/users/my/profile-detail`).then(({data}) => data);

export const useGetMyProfileDetail = (): UseQueryResult<
  IProfileDetail,
  Error
> =>
  useQuery({
    queryKey: KEYS.profileDetail(),
    queryFn: async () => await fetcher(),
    initialData: {
      age: '',
      calorieGoal: 0,
      gender: '',
      height: 0,
      isAppleLinked: false,
      isNotificationAgreed: false,
      loginType: '',
      name: '',
      profileImg: '',
      skillLevel: '',
      teamworkRate: 0,
      uid: '',
      weight: 0,
    },
  });
