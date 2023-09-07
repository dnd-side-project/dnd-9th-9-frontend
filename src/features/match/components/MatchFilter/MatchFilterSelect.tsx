import React from 'react';

import styled from '@emotion/native';

import {type Tpalette} from '../../../../assets/styles/emotion';
import {Text} from '../../../../components/Text';
import {type IFieldListParams} from '../../types';

interface IMatchFilterSelectProps {
  filterParams: IFieldListParams;
  filterKey: 'goal' | 'period' | 'skillLevel' | 'strength';
  values: Record<string, string>;
  keys: string[];
  onPressSelectItem: (
    key: 'goal' | 'period' | 'skillLevel' | 'strength',
    value: string,
  ) => void;
}

export const MatchFilterSelect = ({
  filterParams,
  filterKey,
  values,
  keys,
  onPressSelectItem,
}: IMatchFilterSelectProps): React.JSX.Element => {
  const getColor = (
    value: string,
    activeColor: Tpalette,
    inactiveColor: Tpalette,
  ): Tpalette => {
    if (filterParams[filterKey].includes(value)) return activeColor;
    return inactiveColor;
  };

  const getFontWeight = (value: string): string => {
    if (filterParams[filterKey].includes(value)) return '700';
    return '400';
  };

  return (
    <StyledFlexWrapper style={{gap: 9, flexWrap: 'wrap'}}>
      {keys.map(value => (
        <StyledSelectItem
          key={value}
          activeOpacity={0.8}
          onPress={() => {
            onPressSelectItem(filterKey, value);
          }}
          backgroundColor={getColor(value, 'main-300', 'gray-0')}
          borderColor={getColor(value, 'main-300', 'gray-400')}>
          <Text
            type="body2"
            color={getColor(value, 'gray-0', 'gray-600')}
            fontWeight={getFontWeight(value)}
            text={values[value]}
          />
        </StyledSelectItem>
      ))}
    </StyledFlexWrapper>
  );
};

const StyledFlexWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledSelectItem = styled.TouchableOpacity<{
  backgroundColor: Tpalette;
  borderColor: Tpalette;
}>`
  background-color: ${props => props.theme.palette[props.backgroundColor]};
  border-color: ${props => props.theme.palette[props.borderColor]};
  border-width: 1px;
  border-radius: 100px;
  padding: 6px 18px;
`;
