import React from 'react';

import styled from '@emotion/native';

import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {FieldTypes, Goals, Periods, SkillLevels, Strengths} from '../../const';
import {MatchCreateRadio} from '../MatchRadio';

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
  const fieldData = {
    fieldType: FieldTypes,
    period: Periods,
    goal: Goals,
    skillLevel: SkillLevels,
    strength: Strengths,
  };

  const radioData = {
    fieldType: Object.keys(FieldTypes) as Array<keyof typeof FieldTypes>,
    period: Object.keys(Periods) as Array<keyof typeof Periods>,
    goal: Object.keys(Goals) as Array<keyof typeof Goals>,
    skillLevel: Object.keys(SkillLevels) as Array<keyof typeof SkillLevels>,
    strength: Object.keys(Strengths) as Array<keyof typeof Strengths>,
  };

  return (
    <StyledInformationItemWrapper>
      <Text type="body1" text={label} />
      <MatchCreateRadio
        field={field}
        fieldData={fieldData[field]}
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
