import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {FieldTypes, Goals, Periods, SkillLevels, Strengths} from '../../const';
import {MatchingCreateRadio} from '../MatchingRadio';

interface ICreateMatchInformationItemProps {
  label: string;
  field: 'fieldType' | 'period' | 'goal' | 'skillLevel' | 'strength';
  pick: string;
  handlePick: (value: string | number) => void;
}

export const CreateMatchInformationItem = ({
  label,
  field,
  pick,
  handlePick,
}: ICreateMatchInformationItemProps): React.JSX.Element => {
  const radioData = {
    fieldType: Object.values(FieldTypes),
    period: Object.values(Periods),
    goal: Object.values(Goals),
    skillLevel: Object.values(SkillLevels),
    strength: Object.values(Strengths),
  };

  return (
    <StyledInformationItemWrapper>
      <Text type="body1" text={label} />
      <MatchingCreateRadio
        field={field}
        radioData={radioData[field]}
        pick={pick}
        handlePick={handlePick}
      />
      <Gap size="31px" />
      <Line size="sm" />
    </StyledInformationItemWrapper>
  );
};

const StyledInformationItemWrapper = styled.View`
  padding: 23px 18px 0 18px;
`;
