import {type TUserFieldBattleType} from '../../types/userField';

export const KEYS = {
  all: ['use-field'] as const,

  home: () => [...KEYS.all, 'home'],
  homeBattle: (battleType: TUserFieldBattleType) => [
    ...KEYS.home(),
    'battle',
    battleType,
  ],
  homeTeam: () => [...KEYS.home(), 'team'],
};
