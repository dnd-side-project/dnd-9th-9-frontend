import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, View} from 'react-native';

import {Button} from '../../../../components/Button';
import {Gap} from '../../../../components/Gap';
import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';

interface IAutoMatchErrorProps {
  message?: string;
}

export const AutoMatchError = ({
  message,
}: IAutoMatchErrorProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  return (
    <StyledWrapper style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../../../../assets/images/logo.png')} />
      <Gap size="60px" />
      <Text
        type="body1"
        textAlign="center"
        fontWeight="700"
        text={message ?? '알 수 없는 오류가 발생하였어요.'}
      />
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          text="확인"
          onPress={() => {
            navigation.navigate('AutoMatch');
          }}
        />
      </View>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.palette['gray-0']};
`;
