import {
  type TPeriod,
  type TFieldType,
  type TSkillLevel,
  type TStrength,
  type IField,
  type TUserRole,
} from '.';
import {type TWorkoutActivitiesType} from '../../../lib/AppleHealthKit';

export interface IFieldDetailInfo {
  assignedFieldDto: IField;
  fieldDto: IField & {
    description: string;
    endDate: string;
    fieldRole: TUserRole;
    fieldStatus: 'COMPLETED' | 'IN_PROGRESS' | 'RECRUITING';
    rule: string;
    strength: TStrength;
  };
}

export interface IMatchDetailRecord {
  burnedCalorie: number;
  durationMinute: number;
  exerciseDateTime: string; // yyyy-MM-dd HH:mm:ss
  id: number;
  isLeader: boolean;
  isMemoPublic: boolean;
  memoContent: string;
  memoImg: string;
  name: string;
  profileImg: string;
  sports: TWorkoutActivitiesType;
  userId: number;
}

export interface IMatchDetailRecordSummary {
  goalAchievedCount: number;
  opponentFieldName: string;
  totalBurnedCalorie: number;
  totalExerciseTimeMinute: number;
  totalRecordCount: number;
  winStatus: 'DRAW' | 'LOSE' | 'WIN';
}

interface IMatchDetailRecordTeamRankingItem {
  profileImg: string;
  userId: number;
  value: number;
}

export interface IMatchDetailRecordTeamRanking {
  burnedCalorieRanking: IMatchDetailRecordTeamRankingItem[];
  exerciseTimeRanking: IMatchDetailRecordTeamRankingItem[];
  goalAchievedCountRanking: IMatchDetailRecordTeamRankingItem[];
  recordCountRanking: IMatchDetailRecordTeamRankingItem[];
}

// 매칭 탭
export interface IMatchApply {
  entryId: number;
  matchId: number;
  name: string;
  memberCount: number;
  memberMaxCount: number;
  fieldType: TFieldType;
  period: TPeriod;
  skillLevel: TSkillLevel;
}

export interface IMatchDetailApply {
  fieldEntriesInfos: IMatchApply[];
  totalCount: number;
}
