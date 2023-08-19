import {create} from 'zustand';

import {type IAuthSlice, createAuthSlice} from './createAuthSlice';
import {type ICounterSlice, createCounterSlice} from './createCounterSlice';
import {type ICreateMatchSlice, createMatchSlice} from './createMatchSlice';

type TStore = IAuthSlice & ICounterSlice & ICreateMatchSlice;

const useStore = create<TStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCounterSlice(...a),
  ...createMatchSlice(...a),
}));

export default useStore;
