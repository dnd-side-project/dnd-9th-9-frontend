import React, {useState} from 'react';

import {useRoute, type RouteProp} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Button} from '../../../../components/Button';
import {CreateMatchProfileSection} from '../../../../features/match/components/CreateMatchProfile';
import {usePostFieldProfile} from '../../../../features/match/hooks/field';
import {type ICreateField} from '../../../../features/match/types';
import Toast from '../../../../lib/toast';
import {type MatchStackParamList} from '../../../../navigators';

type TUpdateTeamProfileProps = RouteProp<MatchStackParamList, 'UpdateProfile'>;

export const UpdateTeamProfileScreen = (): React.JSX.Element => {
  const route = useRoute<TUpdateTeamProfileProps>();

  const {mutateAsync: patchFieldProfile} = usePostFieldProfile({
    onSuccessCallback: () => {
      const message = '팀 프로필을 수정하였습니다.';
      Toast.show({message});
    },
    onErrorCallback: error => {
      const message =
        error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.';
      Toast.show({message});
    },
  });

  const [updateProfilePayload, setUpdateProfilePayload] = useState({
    profileImg: route?.params?.profileImg,
    name: route?.params?.name,
    description: route?.params?.description,
    rule: route?.params?.rule,
  });

  const {name, description, rule} = updateProfilePayload;

  const isAblePayload: boolean =
    name.length !== 0 && description.length !== 0 && rule.length !== 0;

  const onChangeMatchProfilePayload = (
    key: keyof ICreateField,
    value: any,
  ): void => {
    setUpdateProfilePayload(prev => {
      return {...prev, [key]: value};
    });
  };

  const handleFinishUpdateProfile = (): void => {
    const id = route?.params?.id;
    const {description, name, rule, profileImg} = updateProfilePayload;

    const formData = new FormData();

    formData.append('description', description);
    formData.append('id', id);
    formData.append('name', name);
    formData.append('rule', rule);

    if (profileImg !== null) {
      formData.append('profileImg', {
        uri: profileImg,
        type: 'multipart/form-data',
        name: `profile-${new Date().valueOf()}.jpeg`,
      });
    }

    void patchFieldProfile({id, formData});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <CreateMatchProfileSection
          createMatchProfilePayload={updateProfilePayload}
          onChange={onChangeMatchProfilePayload}
        />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          disabled={!isAblePayload}
          text="완료"
          onPress={handleFinishUpdateProfile}
        />
      </View>
    </SafeAreaView>
  );
};
