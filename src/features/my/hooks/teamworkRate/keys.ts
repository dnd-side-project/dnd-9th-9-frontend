import {type IGetTeamworkRateHistoryParams} from './useGetTeamworkRateHistory';

export const KEYS = {
  all: ['teamwork-rate'] as const,

  teamworkRateHistory: (params: IGetTeamworkRateHistoryParams) =>
    [...KEYS.all, 'history', {...params}] as const,
};
