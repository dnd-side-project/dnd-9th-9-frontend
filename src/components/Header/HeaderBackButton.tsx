import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

import {arrowLeftXmlData} from '../../assets/svg';
import {Icon} from '../Icon';

export const HeaderBackButton = (): React.JSX.Element => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon svgXml={arrowLeftXmlData} height={32} width={32} />
    </TouchableOpacity>
  );
};
