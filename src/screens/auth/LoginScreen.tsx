import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, Text, Button} from 'react-native';

import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
      <Button
        title="기록하기"
        onPress={() => {
          navigation.replace('Main');
        }}
      />
    </SafeAreaView>
  );
}
