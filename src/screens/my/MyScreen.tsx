import React from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {Text} from '../../components/Text';
import {TopBar} from '../../components/TopBar';
import {MyInfoPreview} from '../../features/my/components';
import {type MyStackParamList} from '../../navigators/MyNavigator';

type Props = NativeStackScreenProps<MyStackParamList, 'MyMain'>;

export function MyScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0'], flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <TopBar
        rightComponent={() => (
          <TouchableOpacity
            onPress={
              // TODO(@minimalKim): 설정 페이지 이동
              () => {}
            }>
            <Text text="설정" type="body1" color="gray-700" />
          </TouchableOpacity>
        )}
      />
      <MyInfoPreview />
    </SafeAreaView>
  );
}
