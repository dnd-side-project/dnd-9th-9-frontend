import React, {useState} from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Button} from '../../../components/Button';
import {Line} from '../../../components/Line';
import {
  CreateMatchProfileSection,
  MatchInformationSection,
} from '../../../features/match/components/CreateMatchProfile';
import {usePostField} from '../../../features/match/hooks/field';
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

  const {mutateAsync: postField} = usePostField({
    onSuccessCallback: (id: string) => {
      initializeMatchPayload();
      navigation.reset({
        index: 1,
        routes: [
          {name: 'MatchList'},
          {name: 'MatchDetail', params: {id: Number(id)}},
        ],
      });
    },
  });

  const [createMatchProfilePayload, setCreateMatchProfilePayload] =
    useState(matchPayload);

  const {profileImg, name, description, rule} = createMatchProfilePayload;

  const isAblePayload: boolean =
    name.length !== 0 && description.length !== 0 && rule.length !== 0;

  const onChangeMatchProfilePayload = (
    key: keyof ICreateField,
    value: any,
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
    const {
      description,
      fieldType,
      goal,
      maxSize,
      name,
      period,
      profileImg,
      rule,
      skillLevel,
      strength,
    } = createMatchProfilePayload;

    const formData = new FormData();

    formData.append('description', description);
    formData.append('fieldType', fieldType);
    formData.append('goal', goal);
    formData.append('maxSize', maxSize);
    formData.append('name', name);
    formData.append('period', period);
    formData.append('rule', rule);
    formData.append('skillLevel', skillLevel);
    formData.append('strength', strength);

    if (profileImg !== '') {
      formData.append('profileImg', {
        uri: profileImg,
        type: 'multipart/form-data',
        name: `profile-${new Date().valueOf()}.jpeg`,
      });
    }

    void postField({formData});
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
