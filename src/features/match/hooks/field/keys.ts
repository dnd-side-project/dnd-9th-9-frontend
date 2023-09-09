import {type TFieldType, type IFieldListPaginationParams} from '../../types';

export const KEYS = {
  all: ['field'] as const,
  list: ({
    pageSize,
    pageNumber,
    fieldType,
    goal,
    memberCount,
    period,
    skillLevel,
    strength,
  }: IFieldListPaginationParams) =>
    [
      ...KEYS.all,
      'list',
      {
        pageSize,
        pageNumber,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      },
    ] as const,
  detail: (id: number) => [...KEYS.all, 'detail', id] as const,
  detailTerminate: (id: number) => [...KEYS.detail(id), 'terminate'] as const,
  detailRecord: (
    id: number,
    date: string,
    fieldType: TFieldType,
    page: number,
    size: number,
  ) => [...KEYS.detail(id), 'record', {date, fieldType, page, size}] as const,
  auto: (type: string) => [...KEYS.all, 'auto', {type}] as const,
  detailEntryBattle: (
    id: number,
    fieldDirection: 'RECEIVED' | 'SENT',
    page: number,
    size: number,
  ) =>
    [...KEYS.detail(id), 'entry-battle', {fieldDirection, page, size}] as const,
};
