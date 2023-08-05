import {create} from 'zustand';
import {IAuthSlice, createAuthSlice} from './createAuthSlice';
import {ICounterSlice, createCounterSlice} from './createCounterSlice';

type TStore = IAuthSlice & ICounterSlice;

const useStore = create<TStore>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCounterSlice(...a),
}));

export default useStore;
