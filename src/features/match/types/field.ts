import {
  type TGoal,
  type TFieldType,
  type TPeriod,
  type TSkillLevel,
  type TStrength,
  type TMyMatchStatus,
  type TWinStatus,
} from '.';

export interface IFieldListPaginationParams extends IFieldListParams {
  fieldId?: number | null;
  page: number;
  size: number;
  matchStatus?: TMyMatchStatus;
}

export interface IFieldListParams {
  fieldType: TFieldType;
  goal: TGoal[] | [];
  memberCount: number | null;
  period: TPeriod[] | [];
  skillLevel: TSkillLevel[] | [];
  strength: TStrength[] | [];
  keyword: string;
}

export interface IField {
  currentSize: number;
  fieldType: TFieldType;
  goal: TGoal;
  id: number;
  maxSize: number;
  name: string;
  period: TPeriod;
  profileImg: string;
  skillLevel: TSkillLevel;
}

export interface ICreateField extends Omit<IField, 'currentSize' | 'id'> {
  description: string;
  rule: string;
  strength: TStrength;
}

export interface IAutoFieldInfo extends Omit<IField, 'fieldType'> {
  strength: TStrength;
}

export interface IFieldListInfo {
  length: number;
  fieldsInfos: IField[];
  totalCount: number;
}

interface IBadge {
  image: string;
  name: string;
}

interface IResult {
  goalAchievedCount: number;
  name: string;
  profileImg: string;
  totalBurnedCalorie: number;
  totalExerciseTimeMinute: number;
  totalRecordCount: number;
  totalScore: number;
}

export interface IFieldResult {
  away: IResult;
  badgeList: IBadge[];
  elementWiseWin: {
    burnedCalorie: TWinStatus;
    exerciseTimeMinute: TWinStatus;
    goalAchievedCount: TWinStatus;
    recordCount: TWinStatus;
  };
  home: IResult;
  period: TPeriod;
  teamworkRate: number;
  winStatus: TWinStatus;
}
