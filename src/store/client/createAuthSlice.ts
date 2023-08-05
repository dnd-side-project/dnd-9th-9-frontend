import {StateCreator} from 'zustand';

export interface IAuthSlice {
  username: string;
  changeUsername: (name: string) => void;
}

export const createAuthSlice: StateCreator<IAuthSlice> = set => ({
  username: '',
  changeUsername: name => set(state => ({username: name})),
});
