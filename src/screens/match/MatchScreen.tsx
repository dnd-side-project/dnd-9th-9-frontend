import React from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

import {MatchListScreen} from './list';
import {MyMatchListScreen} from './my';
import {theme} from '../../assets/styles/theme';
import {type ITopTabScreen, TopTabNavigator} from '../../components/Tab';
import {type MatchStackParamList} from '../../navigators';

type TMatchListScreenRouteProps = RouteProp<MatchStackParamList, 'MatchList'>;

export const MatchScreen = (): React.JSX.Element => {
  const route = useRoute<TMatchListScreenRouteProps>();

  const {
    page,
    size,
    fieldType,
    goal,
    memberCount,
    period,
    skillLevel,
    strength,
    keyword,
    matchStatus,
  } = route.params;

  const screens: ITopTabScreen[] = [
    {
      name: 'TotalMatchListTab',
      label: '매칭',
      component: () => (
        <MatchListScreen
          page={page}
          size={size}
          fieldType={fieldType}
          goal={goal}
          memberCount={memberCount}
          period={period}
          skillLevel={skillLevel}
          strength={strength}
          keyword={keyword}
        />
      ),
    },
    {
      name: 'MyMatchListTab',
      label: 'MY매칭',
      component: () => (
        <MyMatchListScreen matchStatus={matchStatus ?? 'APPLICATION'} />
      ),
    },
  ];

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopTabNavigator screens={screens} />
    </>
  );
};
