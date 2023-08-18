import {type StateCreator} from 'zustand';

export interface ICounterSlice {
  counter: number;
  increase: () => void;
  decrease: () => void;
}

export const createCounterSlice: StateCreator<ICounterSlice> = set => ({
  counter: 0,
  increase: () => {
    set(state => ({counter: state.counter + 1}));
  },
  decrease: () => {
    set(state => ({counter: state.counter - 1}));
  },
});
