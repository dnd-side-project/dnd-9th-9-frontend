import {
  type TGoal,
  type TFieldType,
  type TPeriod,
  type TSkillLevel,
  type TStrength,
  type TMyMatchStatus,
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
