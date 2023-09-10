import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';

interface ITextfieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
}

export const ReadOnlyTextfield = ({
  label = '',
  value = '',
}: ITextfieldProps): React.JSX.Element => {
  return (
    <StyledTextfieldContainer>
      <Text text={label} type="caption" color="gray-600" />
      <StyledReadOnlyTextfield>
        <Text text={value} type="body2" fontWeight="700" color="gray-950" />
      </StyledReadOnlyTextfield>
    </StyledTextfieldContainer>
  );
};

const StyledTextfieldContainer = styled.View`
  gap: 4px;
  height: 77px;
`;

const StyledReadOnlyTextfield = styled.View`
  padding: 10px 0;
  border-bottom-width: 2px;
  border-bottom-color: ${({theme}) => theme.palette['gray-100']};
  border-bottom-style: solid;
`;
