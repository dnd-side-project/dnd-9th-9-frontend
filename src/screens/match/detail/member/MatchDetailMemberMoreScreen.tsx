import React from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {MatchMemberList} from '../../../../features/match/components/MatchDetailMember';
import {useGetFieldEntryTeam} from '../../../../features/match/hooks/fieldEntry';
import {useGetUserFieldList} from '../../../../features/match/hooks/userField';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

export const MatchDetailMemberMoreScreen = (): React.JSX.Element => {
  const route =
    useRoute<RouteProp<MatchStackParamList, 'MatchDetailMemberMore'>>();

  const {id, type, userRole} = route.params;

  const {data: userFieldData} =
    type === 'MEMBER'
      ? useGetUserFieldList({id})
      : useGetFieldEntryTeam({id, size: 10, page: 0});

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        <MatchMemberList
          id={id}
          userRole={userRole}
          type={type}
          isSummary={false}
          members={userFieldData}
          onPressMore={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
