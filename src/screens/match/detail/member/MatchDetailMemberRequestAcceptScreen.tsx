import React, {useState} from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Button} from '../../../../components/Button';
import {MatchMemberList} from '../../../../features/match/components/MatchDetailMember';
import {useGetFieldEntryTeam} from '../../../../features/match/hooks/fieldEntry';
import {usePostFieldEntryAccept} from '../../../../features/match/hooks/fieldEntry/usePostFieldEntryAccept';
import Toast from '../../../../lib/toast';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

export const MatchDetailMemberRequestAcceptScreen = (): React.JSX.Element => {
  const route =
    useRoute<
      RouteProp<MatchStackParamList, 'MatchDetailMemberRequestAccept'>
    >();

  const {id, userRole} = route.params;

  const [checkedMember, setCheckedMember] = useState<number[]>([]);

  const {mutate: postFieldEntryAccept} = usePostFieldEntryAccept({
    onSuccessCallback: () => {
      const message = '팀원 요청을 수락하였습니다.';
      Toast.show({message});
    },
    onErrorCallback: error => {
      const message =
        error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.';
      Toast.show({message});
    },
  });

  const {data: userFieldData} = useGetFieldEntryTeam({id, size: 10, page: 0});

  const handleRequestAccept = (): void => {
    postFieldEntryAccept({entryId: checkedMember[0]});
  };

  const handleCheckMember = (id: number): void => {
    checkedMember.includes(id) ? setCheckedMember([]) : setCheckedMember([id]);
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
          members={userFieldData?.pages.map(page => page.teamEntries).flat()}
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
