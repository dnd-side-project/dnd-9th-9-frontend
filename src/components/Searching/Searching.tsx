import React from 'react';
import styled from '@emotion/native';
import {Icon} from '../Icon';
import {theme} from '../../assets/styles/theme';
import {searchingXmlData} from '../../assets/svg';

export interface ISearchingProps {
  placeholder: string;
  handleSearch: (text: string) => void;
}

const StyledSearching = styled.View`
  flex-direction: row;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.palette['gray-100']};
  gap: 9px;
  margin: 0 16px;
  padding: 16px 8px;
`;

const StyledSearchingInput = styled.TextInput`
  color: ${props => props.theme.palette['gray-400']};
  font-size: ${props => props.theme.typography.body3.fontSize};
  font-weight: 400;
`;

export const Searching = ({placeholder, handleSearch}: ISearchingProps) => {
  return (
    <StyledSearching>
      <Icon svgXml={searchingXmlData} width={24} height={24} />
      <StyledSearchingInput
        placeholder={placeholder}
        placeholderTextColor={theme.palette['gray-400']}
        onChangeText={text => handleSearch(text)}
      />
    </StyledSearching>
  );
};
