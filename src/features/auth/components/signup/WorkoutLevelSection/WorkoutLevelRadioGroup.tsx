import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {Tag} from '../../../../../components/Tag';
import {type Entries} from '../../../../../utils/types';
import {SkillLevels} from '../../../../match/const';

interface WorkoutLevelRadioGroupProps {
  selectedLevel?: string;
  onChange?: (key: keyof typeof SkillLevels) => void;
}

export const WorkoutLevelRadioGroup = ({
  selectedLevel,
  onChange,
}: WorkoutLevelRadioGroupProps): React.JSX.Element => {
  return (
    <StyledRadioGroup>
      {(Object.entries(SkillLevels) as Entries<typeof SkillLevels>).map(
        ([key, label]) => {
          const isSelected = key === selectedLevel;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                onChange?.(key);
              }}>
              <Tag
                text={label}
                type="sm"
                hasBorder={true}
                backgroundColor={isSelected ? 'gray-400' : 'gray-0'}
                borderColor={'gray-400'}
                color={isSelected ? 'gray-0' : 'gray-400'}
              />
            </TouchableOpacity>
          );
        },
      )}
    </StyledRadioGroup>
  );
};

const StyledRadioGroup = styled.View`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;
