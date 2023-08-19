import dayjs from 'dayjs';
import {create} from 'zustand';

interface ISelectedDateStore {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (day: dayjs.Dayjs) => void;
}

export const useSelectedDateStore = create<ISelectedDateStore>(set => ({
  selectedDate: dayjs(),
  setSelectedDate: (day: dayjs.Dayjs) => {
    set(() => ({selectedDate: day}));
  },
}));
