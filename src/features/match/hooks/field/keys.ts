import {
  type TFieldType,
  type IFieldListPaginationParams,
  type IFieldListParams,
} from '../../types';

export const KEYS = {
  all: ['field'] as const,
  list: ({
    page,
    size,
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
        page,
        size,
        fieldType,
        goal,
        memberCount,
        period,
        skillLevel,
        strength,
      },
    ] as const,
  count: ({
    fieldType,
    goal,
    memberCount,
    period,
    skillLevel,
    strength,
    keyword,
  }: IFieldListParams) =>
    [
      ...KEYS.all,
      'count',
      {fieldType, goal, memberCount, period, skillLevel, strength, keyword},
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
  detailRecordSummary: (id: number, filedSide: 'HOME' | 'AWAY', date: string) =>
    [...KEYS.detail(id), 'record-summary', {id, filedSide, date}] as const,
  detailRecordTeamRanking: (
    id: number,
    filedSide: 'HOME' | 'AWAY',
    date: string,
  ) =>
    [...KEYS.detail(id), 'record-team-ranking', {id, filedSide, date}] as const,
  auto: (type: string) => [...KEYS.all, 'auto', {type}] as const,
  detailEntryBattle: (
    id: number,
    fieldDirection: 'RECEIVED' | 'SENT',
    page: number,
    size: number,
  ) =>
    [...KEYS.detail(id), 'entry-battle', {fieldDirection, page, size}] as const,
  detailResult: (id: number) => [...KEYS.detail(id), 'result'] as const,
};
