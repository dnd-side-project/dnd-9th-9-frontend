import {create} from 'zustand';

import {type IAuthSlice, createAuthSlice} from './createAuthSlice';
import {type ICounterSlice, createCounterSlice} from './createCounterSlice';
import {type IRecordSlice, createRecordSlice} from './createRecordSlice';

type TStore = IAuthSlice & ICounterSlice & IRecordSlice;

const useStore = create<TStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCounterSlice(...a),
  ...createRecordSlice(...a),
}));

export default useStore;
