import {type StateCreator} from 'zustand';

type TMoreMatchingType = 'SENT' | 'RECEIVED';

export interface IMatchDetailMatchingSlice {
  moreMatchingType: TMoreMatchingType;
  handleMoreMatchingType: (value: TMoreMatchingType) => void;
}

export const crateMatchDetailMatchingSlice: StateCreator<
  IMatchDetailMatchingSlice
> = set => ({
  moreMatchingType: 'SENT',
  handleMoreMatchingType: value => {
    set(() => ({moreMatchingType: value}));
  },
});
