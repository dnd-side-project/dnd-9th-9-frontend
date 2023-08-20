import {type StateCreator} from 'zustand';

import {dayjs} from '../../lib/dayjs';

export interface IRecordSlice {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (day: dayjs.Dayjs) => void;
}

export const createRecordSlice: StateCreator<IRecordSlice> = set => ({
  selectedDate: dayjs(),
  setSelectedDate: (day: dayjs.Dayjs) => {
    set(() => ({selectedDate: day}));
  },
});
