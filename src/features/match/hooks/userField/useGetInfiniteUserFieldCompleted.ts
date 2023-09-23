import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type TFieldType, type IField} from '../../types';

interface IProps {
  fieldType: TFieldType | null;
  page: number;
  size: number;
}

interface IUseGetUserFieldCompleted {
  completedFields: IField[];
  currentPageNumber: number;
  currentPageSize: number;
  totalCount: number;
}

const fetcher = async ({
  fieldType,
  page,
  size,
}: IProps): Promise<IUseGetUserFieldCompleted> =>
  await axios
    .get('/user-field/completed', {params: {fieldType, page, size}})
    .then(({data}) => data);

export const useGetInfiniteUserFieldCompleted = ({
  fieldType,
  page = 0,
  size = 3,
}: IProps): UseInfiniteQueryResult<IUseGetUserFieldCompleted, Error> =>
  useInfiniteQuery({
    queryKey: KEYS.complete({
      fieldType,
      page,
      size,
    }),
    queryFn: async ({pageParam = 0}) =>
      await fetcher({
        fieldType,
        page: pageParam,
        size,
      }),
    getNextPageParam: lastPage => {
      const {currentPageNumber, currentPageSize, totalCount, completedFields} =
        lastPage;

      const currentDataCount =
        currentPageNumber > 0
          ? (currentPageNumber - 1) * currentPageSize + completedFields.length
          : completedFields.length;

      const nextPage = currentPageNumber + 1;

      return totalCount > currentDataCount ? nextPage : undefined;
    },
    initialData: {
      pageParams: [],
      pages: [
        {
          completedFields: [],
          currentPageNumber: 0,
          currentPageSize: 0,
          totalCount: 0,
        },
      ],
    },
  });
