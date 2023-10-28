import React from 'react';

import styled from '@emotion/native';
import {Image, TouchableOpacity} from 'react-native';

import {Gap} from '../../../../components/Gap';
import {Tags} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {Goals, Periods, SkillLevels, Strengths} from '../../const';
import {type TFieldType, type IAutoFieldInfo} from '../../types';

interface IAutoMatchResultProps {
  fieldType: TFieldType;
  autoFieldData: IAutoFieldInfo;
  onPressMatchApply: () => void;
  onPressRefetch: () => void;
}

export const AutoMatchResult = ({
  fieldType,
  autoFieldData,
  onPressMatchApply,
  onPressRefetch,
}: IAutoMatchResultProps): React.JSX.Element => {
  return (
    <StyledWrapper>
      <StyledMatchWrapper>
        <StyledMatchContentWrapper>
          <Image
            source={require('../../../../assets/images/auto-match-loading.png')}
            style={{position: 'absolute', left: '25%', top: '-30%'}}
          />
          <Text
            type="body1"
            textAlign="center"
            fontWeight="700"
            text={fieldType === 'DUEL' ? '매칭된 상대' : '매칭된 상대팀'}
          />
          <Gap size="22px" />
          <StyledProfile />
          <Gap size="22px" />
          <Text
            type="body1"
            textAlign="center"
            color="gray-700"
            fontWeight="700"
            text={autoFieldData?.name}
          />
          <Gap size="22px" />
          <Tags
            type="sm"
            hasBorder={false}
            color="gray-700"
            backgroundColor="gray-200"
            borderColor="gray-200"
            fontWeight="700"
            texts={[
              Goals[autoFieldData?.goal],
              `${Periods[autoFieldData?.period]}동안`,
              `운동레벨 ${SkillLevels[autoFieldData?.skillLevel]}`,
            ]}
          />
          <Gap size="6px" />
          <Tags
            type="sm"
            hasBorder={false}
            color="gray-700"
            backgroundColor="gray-200"
            borderColor="gray-200"
            fontWeight="700"
            texts={[
              `운동강도 ${Strengths[autoFieldData?.strength]}`,
              `${fieldType === 'DUEL' ? '1vs1 매칭' : '팀vs팀 매칭'} ${
                autoFieldData?.currentSize
              }/${autoFieldData?.maxSize}`,
            ]}
          />
          <Gap size="28px" />
        </StyledMatchContentWrapper>
        <StyledMatchButton activeOpacity={0.8} onPress={onPressMatchApply}>
          <Text
            type="body2"
            color="gray-0"
            fontWeight="700"
            textAlign="center"
            text="매칭 신청하기"
          />
        </StyledMatchButton>
        <Gap size="20px" />
        <TouchableOpacity activeOpacity={0.8} onPress={onPressRefetch}>
          <Text
            type="body2"
            color="gray-800"
            fontWeight="400"
            textAlign="center"
            text="다시 찾기"
          />
        </TouchableOpacity>
      </StyledMatchWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.palette['gray-0']};
`;

const StyledMatchWrapper = styled.View`
  position: relative;
  top: 100px;
  margin: 0 26px;
`;

const StyledProfile = styled.View`
  width: 99px;
  height: 99px;
  border-radius: 99px;
  background-color: ${props => props.theme.palette['gray-600']};
`;

const StyledMatchContentWrapper = styled.View`
  padding: 69px 0 0 0;
  align-items: center;
  border-top-left-radius: ${props => props.theme.borderRadius.sm};
  border-top-right-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.palette['gray-50']};
`;

const StyledMatchButton = styled.TouchableOpacity`
  width: 100%;
  padding: 30px 0;
  color: ${props => props.theme.palette['gray-0']};
  background-color: ${props => props.theme.palette['gray-700']};
  border-bottom-left-radius: ${props => props.theme.borderRadius.sm};
  border-bottom-right-radius: ${props => props.theme.borderRadius.sm};
`;
