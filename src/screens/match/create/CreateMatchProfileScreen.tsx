import React, {useState} from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Button} from '../../../components/Button';
import {Line} from '../../../components/Line';
import {
  CreateMatchProfileSection,
  MatchInformationSection,
} from '../../../features/match/components/CreateMatchProfile';
import {type ICreateField} from '../../../features/match/types';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';
import useStore from '../../../store/client/useStore';

type TCreateMatchProfileProps = NativeStackScreenProps<
  MatchStackParamList,
  'TeamProfile'
>;

export const CreateMatchProfileScreen = ({
  navigation,
}: TCreateMatchProfileProps): React.JSX.Element => {
  const {matchPayload, handleMatchPayload, initializeMatchPayload} = useStore();

  const [createMatchProfilePayload, setCreateMatchProfilePayload] =
    useState(matchPayload);

  const {profileImg, name, description, rule} = createMatchProfilePayload;

  const isAblePayload: boolean =
    name.length !== 0 && description.length !== 0 && rule.length !== 0;

  const onChangeMatchProfilePayload = (
    key: keyof ICreateField,
    value: string,
  ): void => {
    setCreateMatchProfilePayload(prev => {
      return {...prev, [key]: value};
    });
  };

  const handleUpdateMatchInformation = (): void => {
    navigation.pop();
    handleMatchPayload('profileImg', profileImg);
    handleMatchPayload('name', name);
    handleMatchPayload('description', description);
    handleMatchPayload('rule', rule);
  };

  const handleFinishCreateMatching = (): void => {
    initializeMatchPayload();

    // TODO: 팀 생성 API 연동 및 팀 생성 페이지 이동
    navigation.reset({
      index: 1,
      routes: [{name: 'MatchList'}, {name: 'MatchDetail'}],
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <CreateMatchProfileSection
          createMatchProfilePayload={createMatchProfilePayload}
          onChange={onChangeMatchProfilePayload}
        />

        <Line size="lg" />

        <MatchInformationSection
          handleUpdateMatchInformation={handleUpdateMatchInformation}
        />
      </ScrollView>

      {/* TODO: 팀 생성 완료시 -> 팀 상세 화면 이동 */}
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          disabled={!isAblePayload}
          text="완료"
          onPress={handleFinishCreateMatching}
        />
      </View>
    </SafeAreaView>
  );
};
