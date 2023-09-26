import {type TFieldType} from '../../types';

interface ICompleteProps {
  fieldType: TFieldType | null;
  page: number;
  size: number;
}

export const KEYS = {
  all: ['user-field'] as const,
  list: (id: number) => [...KEYS.all, 'list', id] as const,
  progress: () => [...KEYS.all, 'progress'] as const,
  complete: ({fieldType, page, size}: ICompleteProps) =>
    [
      ...KEYS.all,
      'complete',
      {
        fieldType,
        page,
        size,
      },
    ] as const,
};
