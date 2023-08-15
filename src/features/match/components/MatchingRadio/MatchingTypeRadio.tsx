import React, {type Dispatch, type SetStateAction} from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {Tag} from '../../../../components/Tag';

interface IMatchingTypeRadioProps {
  pick: string;
  handlePick: Dispatch<SetStateAction<string>>;
}

export const MatchingTypeRadio = ({
  pick,
  handlePick,
}: IMatchingTypeRadioProps): React.JSX.Element => {
  const radioData = ['1vs1', '팀vs팀', '모집중', '매칭안함'];

  return (
    <StyledRadio>
      {radioData.map((value, idx) => (
        <TouchableOpacity
          key={`matching-${idx}`}
          activeOpacity={0.8}
          onPress={() => {
            handlePick(value);
          }}>
          <Tag
            type="sm"
            hasBorder={pick !== value}
            borderColor={pick !== value ? 'gray-400' : 'gray-0'}
            color={pick === value ? 'gray-0' : 'gray-600'}
            backgroundColor={pick === value ? 'main-300' : 'gray-0'}
            fontWeight={pick !== value ? '400' : '700'}
            text={value}
          />
        </TouchableOpacity>
      ))}
    </StyledRadio>
  );
};

const StyledRadio = styled.View`
  flex-direction: row;
  gap: 10px;
  margin: 16px 16px;
`;
