import {type StateCreator} from 'zustand';

import {type ICreateField} from '../../features/match/types';

export interface ICreateMatchSlice {
  matchPayload: ICreateField;
  handleMatchPayload: (
    filed: keyof ICreateField,
    value: string | number,
  ) => void;
  initializeMatchPayload: () => void;
}

const initMatchPayload = {
  fieldType: '',
  maxSize: 1,
  strength: '',
  period: '',
  goal: '',
  skillLevel: '',
  profileImg: '',
  name: '',
  description: '',
  rule: '',
};

export const createMatchSlice: StateCreator<ICreateMatchSlice> = set => ({
  matchPayload: initMatchPayload,
  handleMatchPayload: (field, value) => {
    set(state => {
      return {
        matchPayload: {
          ...state.matchPayload,
          [field]: value,
        },
      };
    });
  },
  initializeMatchPayload: () => {
    set(() => {
      return {
        matchPayload: initMatchPayload,
      };
    });
  },
});
