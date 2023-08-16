import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  // TODO:  Swagger에 params 설명 기반으로 page, size params 확인 필요
  page: number;
  size: number;
  fieldType: string; // 상수 확인 필요 (ex. DUEL)
  goal: string[]; // 상수 확인 필요 (ex. GAIN)
  memberCount: number;
  period: string; // 상수 확인 필요 (ex. ONE_WEEK)
  skillLevel: string[]; // 상수 확인 필요 (ex. ADVANCED_INTERMEDIATE)
  strength: string[]; // 상수 확인 필요 (ex. HIGH)
}

interface IFieldListInfo {
  fieldsInfos: Array<{
    currentSize: number;
    fieldType: string;
    goal: string;
    id: number;
    maxSize: number;
    name: string;
    period: string;
    profileImg: string;
    skillLevel: string;
  }>;
  totalCount: number;
}

const fetcher = async ({
  page,
  size,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IProps): Promise<IFieldListInfo> =>
  await axios
    .get(`/field`, {
      params: {
        page,
        size,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      },
    })
    .then(({data}) => data);

export const useGetFieldList = ({
  page,
  size,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IProps): UseQueryResult<IFieldListInfo, Error> =>
  useQuery({
    queryKey: KEYS.list(
      page,
      size,
      fieldType,
      goal,
      memberCount,
      period,
      skillLevel,
      strength,
    ),
    queryFn: async () =>
      await fetcher({
        page,
        size,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      }),
    initialData: {
      fieldsInfos: [],
      totalCount: 0,
    },
  });
