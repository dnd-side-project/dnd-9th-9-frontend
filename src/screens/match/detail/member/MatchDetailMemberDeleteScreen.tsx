import React, {useState} from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Button} from '../../../../components/Button';
import {MatchMemberList} from '../../../../features/match/components/MatchDetailMember';
import {useGetUserFieldList} from '../../../../features/match/hooks/userField';
import {useDeleteUserFieldEject} from '../../../../features/match/hooks/userField/useDeleteUserFieldEject';
import Toast from '../../../../lib/toast';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

export const MatchDetailMemberDeleteScreen = (): React.JSX.Element => {
  const route =
    useRoute<RouteProp<MatchStackParamList, 'MatchDetailMemberDelete'>>();

  const {id, userRole} = route.params;

  const [checkedMember, setCheckedMember] = useState<number[]>([]);

  // TODO: 팀원 삭제 이후 토스트 안내 및 navigation pop
  const {mutate: deleteUserFieldEject} = useDeleteUserFieldEject({
    onSuccessCallback: () => {
      const message = '팀원이 삭제 되었습니다.';
      Toast.show({message});
    },
    onErrorCallback: error => {
      const message =
        error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.';
      Toast.show({message});
    },
  });

  const {data: userFieldData} = useGetUserFieldList({id});

  const handleDeleteUser = (): void => {
    deleteUserFieldEject({id, ids: checkedMember});
  };

  const handleCheckMember = (id: number): void => {
    console.log(id);
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
          type="DELETE"
          isSummary={false}
          isSettingMode={true}
          members={userFieldData}
          checkedMember={checkedMember}
          onPressCheckMember={handleCheckMember}
        />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button text="삭제" onPress={handleDeleteUser} />
      </View>
    </SafeAreaView>
  );
};
