import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Line} from '../../../../components/Line';
import {MatchMemberList} from '../../../../features/match/components/MatchDetailMember';
import {useGetFieldEntryTeam} from '../../../../features/match/hooks/fieldEntry';
import {useGetUserFieldList} from '../../../../features/match/hooks/userField';
import {type TUserRole} from '../../../../features/match/types';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

interface IMatchDetailMemberScreenProps {
  id: number;
  userRole: TUserRole;
}

export const MatchDetailMemberScreen = ({
  id,
  userRole,
}: IMatchDetailMemberScreenProps): React.JSX.Element => {
  const navigate =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const {data: userFieldData} = useGetUserFieldList({id});
  const {data: useRequestData} = useGetFieldEntryTeam({id, size: 3, page: 0});

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        <MatchMemberList
          id={id}
          type="MEMBER"
          userRole={userRole}
          isSummary={true}
          members={userFieldData}
          onPressMore={() => {
            navigate.navigate('MatchDetailMemberMore', {
              id,
              userRole,
              type: 'MEMBER',
            });
          }}
        />

        {userRole !== 'GUEST' && (
          <>
            <Line size="lg" />
            <MatchMemberList
              id={id}
              type="REQUEST"
              userRole={userRole}
              isSummary={true}
              members={useRequestData?.pages[0]?.teamEntries}
              onPressMore={() => {
                navigate.navigate('MatchDetailMemberMore', {
                  id,
                  userRole,
                  type: 'REQUEST',
                });
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
