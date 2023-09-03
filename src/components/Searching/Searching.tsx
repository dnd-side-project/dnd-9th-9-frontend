import React, {useRef} from 'react';

import styled from '@emotion/native';

import {theme} from '../../assets/styles/theme';
import {searchingXmlData} from '../../assets/svg';
import {Icon} from '../Icon';

export interface ISearchingProps {
  placeholder: string;
  handleSearch: (text: string) => void;
}

export const Searching = ({
  placeholder,
  handleSearch,
}: ISearchingProps): React.JSX.Element => {
  const delayTimerRef = useRef(null);

  const handleSearchTextChange = (text: string): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);

    delayTimerRef.current = setTimeout(() => {
      handleSearch(text);
    }, 700);
  };

  return (
    <StyledSearching>
      <Icon svgXml={searchingXmlData} width={24} height={24} />
      <StyledSearchingInput
        placeholder={placeholder}
        placeholderTextColor={theme.palette['gray-400']}
        onChangeText={text => {
          handleSearchTextChange(text);
        }}
      />
    </StyledSearching>
  );
};

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
