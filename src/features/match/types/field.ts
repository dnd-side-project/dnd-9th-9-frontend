export interface IField {
  currentSize: number;
  fieldType: string;
  goal: string;
  id: number;
  maxSize: number;
  name: string;
  period: string;
  profileImg: string;
  skillLevel: string;
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
    strength: string;
  };
}

export interface IFieldListInfo {
  fieldsInfos: IField[];
  totalCount: number;
}
