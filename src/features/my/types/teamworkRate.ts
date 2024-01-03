import {
  type TFieldType,
  type TPeriod,
  type TWinStatus,
} from '../../match/types';

export interface ITeamworkRateHistory {
  endDate: string;
  fieldType: TFieldType;
  myFieldName: string;
  opponentName: string;
  period: TPeriod;
  teamworkRate: number;
  winStatus: TWinStatus;
}
