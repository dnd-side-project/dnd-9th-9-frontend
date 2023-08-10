import React from 'react';
import styled from '@emotion/native';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {filterXmlData} from '../../assets/svg';

interface IFilterButtonProps {
  isActive: boolean;
  onPress: () => void;
}

interface IStyledFilterButton extends IFilterButtonProps {}

const StyledFlexView = styled.View`
  flex-direction: row;
`;

const StyledFilterButton = styled.TouchableOpacity<IStyledFilterButton>`
  flex-direction: row;
  background-color: ${props =>
    props.isActive
      ? props.theme.palette['main-300']
      : props.theme.palette['gray-400']};
  border-radius: ${props => props.theme.borderRadius.sm};
  gap: 6px;
  padding: 4px 7px;
`;

export const FilterButton = ({isActive, onPress}: IFilterButtonProps) => {
  return (
    <StyledFlexView>
      <StyledFilterButton
        onPress={onPress}
        isActive={isActive}
        activeOpacity={0.8}>
        <Icon svgXml={filterXmlData} width={16} height={16} />
        <Text type="body3" text="필터" color="gray-0" />
      </StyledFilterButton>
    </StyledFlexView>
  );
};
