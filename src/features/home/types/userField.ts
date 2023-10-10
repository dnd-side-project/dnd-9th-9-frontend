import {type TFieldType} from '../../match/types';

export type TUserFieldBattleType = Exclude<TFieldType, 'TEAM'>;

export interface IUserFieldHomeTeam {
  /**
   * 소모 칼로리
   */
  burnedCalorie: {
    name: string;
    value: number;
  };
  /**
   * 완료까지 남은 날짜
   */
  daysLeft: number;
  /**
   * 운동시간
   */
  exerciseTimeMinute: {
    name: string;
    value: number;
  };
  /**
   * 운동시간
   */
  fieldId: number;
  /**
   * 운동시간
   */
  goalAchievedCount: {
    name: string;
    value: number;
  };
  recordCount: {
    name: string;
    value: number;
  };
  teamName: string;
}

export interface IUserFieldHomeBattle {
  /** 활동링 달성 횟수 */
  goalAchievedCount: number;
  /** 성명 */
  name: string;
  /** 소모 칼로리 */
  totalBurnedCalorie: number;
  /** 소모 운동 시간 */
  totalExerciseTimeMinute: number;
  /** 기록 횟수 */
  totalRecordCount: number;
}

export type THomeBattleField = Exclude<keyof IUserFieldHomeBattle, 'name'>;
