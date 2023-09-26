import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';
import {MyMatchStatus} from '../../const';
import {type TMyMatchStatus} from '../../types';

interface IMyMatchStatusFilterProps {
  matchStatus: TMyMatchStatus;
}

export const MyMatchStatusFilter = ({
  matchStatus,
}: IMyMatchStatusFilterProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const MyMatchStatusLabels = Object.keys(MyMatchStatus) as Array<
    keyof typeof MyMatchStatus
  >;

  return (
    <StyledFilterWrapper>
      {MyMatchStatusLabels.map(value => (
        <StyledFilter
          key={value}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('MatchList', {
              page: 0,
              size: 10,
              fieldType: 'DUEL',
              goal: [],
              memberCount: null,
              period: [],
              skillLevel: [],
              strength: [],
              keyword: '',
              matchStatus: value,
            });
          }}>
          <Text
            type="body1"
            textAlign="center"
            color={value === matchStatus ? 'black' : 'gray-400'}
            fontWeight="600"
            text={MyMatchStatus[value]}
          />
        </StyledFilter>
      ))}
    </StyledFilterWrapper>
  );
};

const StyledFilterWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 18px 16px;
`;

const StyledFilter = styled.TouchableOpacity`
  width: 33.33%;
`;
