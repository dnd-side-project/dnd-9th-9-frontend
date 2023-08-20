import {create} from 'zustand';

import {type IAuthSlice, createAuthSlice} from './createAuthSlice';
import {type ICounterSlice, createCounterSlice} from './createCounterSlice';
import {
  type IMatchDetailMatchingSlice,
  crateMatchDetailMatchingSlice,
} from './createMatchDetailSlice';

type TStore = IAuthSlice & ICounterSlice & IMatchDetailMatchingSlice;

const useStore = create<TStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCounterSlice(...a),
  ...crateMatchDetailMatchingSlice(...a),
}));

export default useStore;
