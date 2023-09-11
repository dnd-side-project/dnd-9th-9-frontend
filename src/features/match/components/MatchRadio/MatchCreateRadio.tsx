import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';
import {type ICreateField} from '../../types';

interface IMatchCreateRadioProps {
  field: keyof ICreateField;
  fieldData: Record<string, string>;
  radioData: string[];
  pick: string;
  handlePick: (value: string | number) => void;
}

interface StyledStyledRadioItem {
  isSelected: boolean;
}

export const MatchCreateRadio = ({
  field,
  radioData,
  pick,
  fieldData,
  handlePick,
}: IMatchCreateRadioProps): React.JSX.Element => {
  return (
    <StyledRadioWrapper>
      {radioData.map((value, idx) => (
        <StyledRadioItem
          key={`${field}-${idx}`}
          activeOpacity={0.8}
          isSelected={pick === value}
          onPress={() => {
            handlePick(value);
          }}>
          <Text
            type="body2"
            fontWeight={pick === value ? '700' : '400'}
            color={pick === value ? 'gray-0' : 'gray-600'}
            text={fieldData[value] ?? '-'}
          />
        </StyledRadioItem>
      ))}
    </StyledRadioWrapper>
  );
};

const StyledRadioWrapper = styled.View`
  flex-direction: row;
  margin: 20px 0 0 0;
  gap: 10px;
  width: auto;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledRadioItem = styled.TouchableOpacity<StyledStyledRadioItem>`
  padding: 6px 18px;
  border-radius: 100px;
  border-color: ${props =>
    props.isSelected
      ? props.theme.palette['main-300']
      : props.theme.palette['gray-400']};
  border: 1px;
  background-color: ${props =>
    props.isSelected
      ? props.theme.palette['main-300']
      : props.theme.palette['gray-0']};
`;
