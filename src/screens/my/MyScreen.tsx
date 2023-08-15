import React from 'react';

import {type BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView, Text} from 'react-native';

import {type BottomTabStackParamList} from '../../navigators';

type Props = BottomTabScreenProps<BottomTabStackParamList, 'My'>;

export function MyScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text>MyScreen</Text>
    </SafeAreaView>
  );
}
