import {
  type TGoal,
  type TFieldType,
  type TPeriod,
  type TSkillLevel,
  type TStrength,
} from '.';

export interface IFieldListPaginationParams extends IFieldListParams {
  pageSize: number;
  pageNumber: number;
}

export interface IFieldListParams {
  fieldType: TFieldType;
  goal: TGoal[] | [];
  memberCount: number | null;
  period: TPeriod | '';
  skillLevel: TSkillLevel[] | [];
  strength: TStrength[] | [];
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

export type TAutoFieldInfo = Omit<IField, 'fieldType'> & {
  strength: string;
};

export interface IFieldDetailInfo {
  assignedFieldDto: IField;
  fieldDto: IField & {
    description: string;
    endDate: string;
    rule: string;
    strength: TStrength;
  };
}

export interface IFieldListInfo {
  length: number;
  fieldsInfos: IField[];
  totalCount: number;
}
