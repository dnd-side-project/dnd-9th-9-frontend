import {type StateCreator} from 'zustand';

import {type HealthActivity} from '../../lib/AppleHealthKit';
import {dayjs} from '../../lib/dayjs';

interface IWorkoutForm {
  type: HealthActivity | null;
  hour: number | null;
  minute: number | null;
  energyBurned: number;
  energyBurnedUnit: string;
  distance: number;
  distanceUnit: string;
}
export interface IRecordSlice {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (day: dayjs.Dayjs) => void;

  workoutForm: IWorkoutForm;
  setWorkoutForm: (field: keyof IWorkoutForm, value: string | number) => void;
}

export const createRecordSlice: StateCreator<IRecordSlice> = (set, get) => ({
  // TODO: params로 관리
  selectedDate: dayjs(),
  setSelectedDate: (day: dayjs.Dayjs) => {
    set(() => ({selectedDate: day}));
  },

  workoutForm: {
    type: null,
    hour: null,
    minute: null,
    energyBurned: 0,
    energyBurnedUnit: 'calorie',
    distance: 0,
    distanceUnit: 'meter',
  },
  setWorkoutForm: (field, value) => {
    set(state => {
      return {
        workoutForm: {
          ...state.workoutForm,
          [field]: value,
        },
      };
    });
  },
});
