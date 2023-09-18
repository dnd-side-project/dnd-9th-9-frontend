import React, {useState} from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Button} from '../../../../components/Button';
import {MatchMemberList} from '../../../../features/match/components/MatchDetailMember';
import {useGetFieldEntryTeam} from '../../../../features/match/hooks/fieldEntry';
import {usePostFieldEntryAccept} from '../../../../features/match/hooks/fieldEntry/usePostFieldEntryAccept';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

export const MatchDetailMemberRequestAcceptScreen = (): React.JSX.Element => {
  const route =
    useRoute<
      RouteProp<MatchStackParamList, 'MatchDetailMemberRequestAccept'>
    >();

  const {id, userRole} = route.params;

  const [checkedMember, setCheckedMember] = useState<number[]>([]);

  const {mutate: postFieldEntryAccept} = usePostFieldEntryAccept({
    onSuccessCallback: () => {},
  });

  const {data: userFieldData} = useGetFieldEntryTeam({id, size: 10, page: 0});

  const handleRequestAccept = (): void => {
    // TODO: 해당 API 사용 방식 논의 중
    postFieldEntryAccept({entryId: checkedMember});
  };

  const handleCheckMember = (id: number): void => {
    checkedMember.includes(id)
      ? setCheckedMember(value => [...value.filter(value => value !== id)])
      : setCheckedMember(value => [...value, id]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        <MatchMemberList
          id={id}
          userRole={userRole}
          type="REQUEST"
          isSummary={false}
          isSettingMode={true}
          members={userFieldData}
          checkedMember={checkedMember}
          onPressCheckMember={handleCheckMember}
        />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button text="수락" onPress={handleRequestAccept} />
      </View>
    </SafeAreaView>
  );
};
