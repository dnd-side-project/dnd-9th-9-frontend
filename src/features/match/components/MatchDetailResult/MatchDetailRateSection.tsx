import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {rateFireXmlData} from '../../../../assets/svg';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {Periods} from '../../const';
import {type TPeriod} from '../../types';

interface IMatchDetailRateSectionProps {
  period: TPeriod;
  resultTitle: string;
  currentRate: number;
  onPressRate: (value: number) => void;
}

export const MatchDetailRateSection = ({
  period,
  resultTitle,
  currentRate,
  onPressRate,
}: IMatchDetailRateSectionProps): React.JSX.Element => {
  const teamworkRate = [1, 2, 3, 4, 5];

  return (
    <>
      <StyledResultSection>
        <Text
          type="body3"
          color="gray-600"
          fontWeight="400"
          text={`${Periods[period]}간 매칭진행 결과`}
        />
        <Gap size="10px" />
        <Text type="body1" fontWeight="600" text={resultTitle} />
      </StyledResultSection>

      <StyledRateSection>
        <Text
          type="body3"
          fontWeight="400"
          text={`${Periods[period]}간 팀워크는 어땠나요?`}
        />
        <Gap size="8px" />
        <Text
          type="body3"
          fontWeight="400"
          text="불꽃을 선택해 팀워크를 평가해주세요."
        />

        <StyledIconWrapper>
          {teamworkRate.map(rate => (
            <TouchableOpacity
              key={`teamwork-rate-${rate}`}
              onPress={() => {
                onPressRate(rate);
              }}>
              <Icon
                color={
                  rate <= currentRate
                    ? theme.palette['gray-800']
                    : theme.palette['gray-400']
                }
                svgXml={rateFireXmlData}
              />
            </TouchableOpacity>
          ))}
        </StyledIconWrapper>
      </StyledRateSection>
    </>
  );
};

const StyledResultSection = styled.View`
  align-items: center;
  background-color: ${props => props.theme.palette['gray-50']};
  padding: 18px 0;
`;

const StyledRateSection = styled.View`
  align-items: center;
  border-width: 1px;
  padding-top: 32px;
  padding-bottom: 40px;
  border-bottom-left-radius: ${props => props.theme.borderRadius.md};
  border-bottom-right-radius: ${props => props.theme.borderRadius.md};
  border-color: ${props => props.theme.palette['gray-100']};
`;

const StyledIconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
