import {type HealthActivity} from '../../../lib/AppleHealthKit';

export interface IDailyCalories {
  burnedCalorie: number;
  goalCalorie: number;
}

export interface IExerciseListInfo {
  exerciseList: Array<{
    appleUid: string;
    burnedCalorie: number;
    durationMinute: number;
    exerciseDate: string; // yyyy-MM-dd
    id: number;
    isMemoPublic: true;
    memoContent: string;
    memoImg: string;
    recordProvider: string;
    sports: string;
  }>;
  totalCount: number;
}

export interface IDailyExerciseSummary {
  totalBurnedCalorie: number;
  totalExerciseCalorie: number;
  totalExerciseTimeMinute: number;
  totalRecordCount: number;
}

export interface IRecentExercise {
  recentSports: Array<{
    burnedCalorie: number;
    exerciseMinute: number;
    sports: HealthActivity;
  }>;
  totalBurnedCalorie: number;
  totalExerciseMinute: number;
}

export interface IBurnedCalorieGoal {
  burnedCalorie: number;
  goalCalorie: number;
}
