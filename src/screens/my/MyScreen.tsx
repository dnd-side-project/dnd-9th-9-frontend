import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {Text} from '../../components/Text';
import {TopBar} from '../../components/TopBar';
import {MyInfoPreview} from '../../features/my/components';
import {type MyStackParamList} from '../../navigators/MyNavigator';

export function MyScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

  return (
    <SafeAreaView style={{backgroundColor: theme.palette['gray-0'], flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <TopBar
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Setting');
            }}>
            <Text text="설정" type="body1" color="gray-700" />
          </TouchableOpacity>
        )}
      />
      <MyInfoPreview />
    </SafeAreaView>
  );
}
