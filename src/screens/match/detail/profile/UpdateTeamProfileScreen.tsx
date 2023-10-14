import React, {useState} from 'react';

import {useRoute, type RouteProp} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Button} from '../../../../components/Button';
import {CreateMatchProfileSection} from '../../../../features/match/components/CreateMatchProfile';
import {type ICreateField} from '../../../../features/match/types';
import {type MatchStackParamList} from '../../../../navigators';

type TUpdateTeamProfileProps = RouteProp<MatchStackParamList, 'UpdateProfile'>;

export const UpdateTeamProfileScreen = (): React.JSX.Element => {
  const route = useRoute<TUpdateTeamProfileProps>();

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
    // TODO: API 연동
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
