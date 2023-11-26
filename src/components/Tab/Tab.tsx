import React from 'react';

import {TouchableOpacity, Text} from 'react-native';

import {theme} from '../../assets/styles/theme';

interface ITabProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

export const Tab = ({title, active, onPress}: ITabProps): React.JSX.Element => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: active
          ? theme.palette['gray-500']
          : theme.palette['gray-200'],
      }}
      onPress={onPress}>
      <Text
        style={{
          color: active ? theme.palette['gray-700'] : theme.palette['gray-500'],
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
