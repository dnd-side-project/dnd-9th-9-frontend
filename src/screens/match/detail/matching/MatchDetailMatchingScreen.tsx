import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Line} from '../../../../components/Line';
import {MatchApplyList} from '../../../../features/match/components/MatchDetailMatching';
import {
  APPLY_DUMMY_DATA,
  SENT_DUMMY_DATA,
  useGetFieldDetailEntryBattle,
} from '../../../../features/match/hooks/field/useGetFieldDetailEntryBattle';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';
import useStore from '../../../../store/client/useStore';

type TMatchDetailMatchingScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailMatching'
>;

export const MatchDetailMatchingScreen = ({
  navigation,
}: TMatchDetailMatchingScreenProps): React.JSX.Element => {
  const selectMatchId = 1;
  const {handleMoreMatchingType} = useStore();

  const {data: sentData = SENT_DUMMY_DATA} = useGetFieldDetailEntryBattle({
    id: selectMatchId,
    fieldDirection: 'SENT',
  });

  const {data: receivedData = APPLY_DUMMY_DATA} = useGetFieldDetailEntryBattle({
    id: selectMatchId,
    fieldDirection: 'RECEIVED',
  });

  const handleMoreMatch = (type: 'SENT' | 'RECEIVED'): void => {
    handleMoreMatchingType(type);
    navigation.navigate('MatchDetailMatchingMore');
  };
  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        <MatchApplyList
          type="SENT"
          totalCount={sentData.totalCount}
          applies={sentData.fieldEntriesInfos}
          onPressMore={() => {
            handleMoreMatch('SENT');
          }}
        />
        <Line size="lg" />
        <MatchApplyList
          type="RECEIVED"
          totalCount={receivedData.totalCount}
          applies={receivedData.fieldEntriesInfos}
          onPressMore={() => {
            handleMoreMatch('RECEIVED');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
