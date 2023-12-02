import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';

import {TeamworkRateFlameGroup} from './TeamworkRateFlameGroup';
import {theme} from '../../../../../assets/styles/theme';
import {questionXmlData} from '../../../../../assets/svg';
import {Gap} from '../../../../../components/Gap';
import {Icon} from '../../../../../components/Icon';
import {Text} from '../../../../../components/Text';
import {type MyStackParamList} from '../../../../../navigators/MyNavigator';
import {getFlameData} from '../../../const';
import {useGetMyProfileDetail} from '../../../hooks/profile';

export const TeamworkRateSection = (): React.JSX.Element => {
  const {data: myProfileDetail} = useGetMyProfileDetail();
  const {title, subTitle} = getFlameData(myProfileDetail?.teamworkRate ?? 0);

  const navigation =
    useNavigation<NativeStackNavigationProp<MyStackParamList>>();

  return (
    <StyledTeamworkRateSection>
      <StyledHorizontal style={{justifyContent: 'space-between'}}>
        <Text text="나의 불꽃 레벨" type="head4" color="gray-950" />

        <TouchableOpacity>
          <Text text="불꽃 히스토리" type="body3" color="gray-600" />
        </TouchableOpacity>
      </StyledHorizontal>

      <Gap size="10px" />

      <StyledCard>
        <StyledIconWrapper
          onPress={() => {
            navigation.navigate('TeamWorkRateInfo');
          }}>
          <Icon
            svgXml={questionXmlData}
            height={18}
            color={theme.palette['gray-400']}
          />
        </StyledIconWrapper>
        <TeamworkRateFlameGroup rate={myProfileDetail?.teamworkRate ?? 0} />

        <Gap size="8px" />
        <StyledHorizontal>
          <Text
            text={`${myProfileDetail?.teamworkRate ?? 0}`}
            type="body2"
            fontWeight="700"
            color="gray-700"
          />
          <Text text="/5" type="body2" fontWeight="700" color="gray-500" />
        </StyledHorizontal>

        <Gap size="8px" />
        <Text text={title} type="body2" fontWeight="700" color="gray-700" />
        <Gap size="2px" />
        <Text text={subTitle} type="body3" fontWeight="700" color="gray-500" />
      </StyledCard>
    </StyledTeamworkRateSection>
  );
};

const StyledTeamworkRateSection = styled.View`
  padding: 20px;
`;

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCard = styled.View`
  padding: 24px;
  border-radius: ${({theme}) => theme.borderRadius.lg};
  background-color: ${({theme}) => theme.palette['gray-50']};
  justify-content: center;
  align-items: center;
`;

const StyledIconWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
