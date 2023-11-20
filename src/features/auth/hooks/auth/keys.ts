import {type IUseGetAuthIdAvailableParams} from '../../types';

export const KEYS = {
  all: ['auth'] as const,
  idAvailable: (uid: string) => [...KEYS.all, 'id-available', {uid}] as const,
  findId: ({name, phoneNum}: IUseGetAuthIdAvailableParams) =>
    [...KEYS.all, 'find-id', {name, phoneNum}] as const,
  logout: () => [...KEYS.all, 'logout'],
};
