import {create} from 'zustand';

import {type IAuthSlice, createAuthSlice} from './createAuthSlice';
import {type ICounterSlice, createCounterSlice} from './createCounterSlice';

type TStore = IAuthSlice & ICounterSlice;

const useStore = create<TStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCounterSlice(...a),
}));

export default useStore;
