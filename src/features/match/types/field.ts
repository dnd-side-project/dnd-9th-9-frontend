import {
  type TGoal,
  type TFieldType,
  type TPeriod,
  type TSkillLevel,
  type TStrength,
} from '.';

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
  fieldsInfos: IField[];
  totalCount: number;
}
