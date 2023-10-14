import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {Text} from '../../components/Text';
import {PhysicalInfoForm} from '../../features/auth/components/signup';
import {type TGender} from '../../features/my/types';
import {
  useGetBiologicalSex,
  useGetHealthKitAuthStatus,
  useGetLatestHeight,
  useGetLatestWeight,
} from '../../hooks/healthKit';
import {type RootStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'PhysicalInfoScreen'>;

export const PhysicalInfoScreen = ({navigation}: Props): React.JSX.Element => {
  const {data: healthKitAuthStatus} = useGetHealthKitAuthStatus();
  const {data: height} = useGetLatestHeight();
  const {data: weight} = useGetLatestWeight();
  const {data: gender} = useGetBiologicalSex();

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StyledTopBar>
        <Text type="head4" text="[필수]" />
      </StyledTopBar>

      <PhysicalInfoForm
        defaultWeight={weight != null ? Math.floor(weight) : undefined}
        defaultHeight={
          height != null ? Math.floor(height) : undefined ?? undefined
        }
        defaultGender={gender as TGender}
        isAllLinked={healthKitAuthStatus?.isAllLinked ?? false}
        onNext={() => {
          navigation.push('Main');
        }}
      />
    </SafeAreaView>
  );
};

const StyledTopBar = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  justify-content: flex-end;
`;
