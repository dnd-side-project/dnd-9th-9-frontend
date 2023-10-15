import React, {useState} from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Toast from 'react-native-simple-toast';

import {theme} from '../../../../assets/styles/theme';
import {Button} from '../../../../components/Button';
import {MatchMemberList} from '../../../../features/match/components/MatchDetailMember';
import {usePatchChangeLeader} from '../../../../features/match/hooks/field/usePatchChangeLeader';
import {useGetUserFieldList} from '../../../../features/match/hooks/userField';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

export const MatchDetailMemberAssignScreen = (): React.JSX.Element => {
  const route =
    useRoute<RouteProp<MatchStackParamList, 'MatchDetailMemberAssign'>>();

  const {id, userRole} = route.params;

  const [checkedMember, setCheckedMember] = useState<number[]>([]);

  const {data: userFieldData} = useGetUserFieldList({id});

  // TODO: 성공 이후 토스트 메시지 노출 후 navigation pop
  const {mutate: patchChangeLeader} = usePatchChangeLeader({
    onSuccessCallback: () => {
      Toast.show('방장이 변경 되었습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
    },
    onErrorCallback: error => {
      Toast.show(
        error?.response?.data.message ?? '알 수 없는 오류가 발생하였습니다.',
        Toast.SHORT,
        {
          backgroundColor: '#000000c5',
        },
      );
    },
  });

  const handleAssignLeader = (): void => {
    patchChangeLeader({id: checkedMember[0]});
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
          type="ASSIGN"
          isSummary={false}
          isSettingMode={true}
          members={userFieldData}
          checkedMember={checkedMember}
          onPressCheckMember={handleCheckMember}
        />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button text="확인" onPress={handleAssignLeader} />
      </View>
    </SafeAreaView>
  );
};
