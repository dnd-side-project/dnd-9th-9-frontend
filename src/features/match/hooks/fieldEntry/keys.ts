import {type TFieldType} from '../../types';

interface IFieldEntryProps {
  fieldType: TFieldType;
  page: number;
  size: number;
}

interface IEntryProps {
  id: number;
  page: number;
  size: number;
}

interface IBattleProps {
  id: number;
  page: number;
  size: number;
  fieldDirection: 'RECEIVED' | 'SENT';
}

export const KEYS = {
  all: ['field-entry'] as const,
  fieldEntry: ({fieldType, page, size}: IFieldEntryProps) =>
    [
      ...KEYS.all,
      'my-matching',
      {
        fieldType,
        page,
        size,
      },
    ] as const,
  battle: ({id, page, size, fieldDirection}: IBattleProps) =>
    [...KEYS.all, 'battle', {id, page, size, fieldDirection}] as const,
  team: (id: number) => [...KEYS.all, 'team', id] as const,
  entry: ({id, page, size}: IEntryProps) =>
    [
      ...KEYS.all,
      'entry-team',
      {
        id,
        page,
        size,
      },
    ] as const,
};
