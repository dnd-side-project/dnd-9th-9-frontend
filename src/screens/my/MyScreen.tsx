import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {MyInfoPreview} from '../../features/my/components';
import {type MyStackParamList} from '../../navigators/MyNavigator';

type Props = NativeStackScreenProps<MyStackParamList, 'MyMain'>;

export function MyScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView>
      <MyInfoPreview />
    </SafeAreaView>
  );
}
