import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {addXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';

interface IAddMatchingButtonProps {
  createMatch: () => void;
}

export const AddMatchingButton = ({
  createMatch,
}: IAddMatchingButtonProps): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={createMatch}>
      <StyledTextView>
        <Text
          type="body3"
          textAlign="center"
          fontWeight="600"
          text="매칭 생성"
        />
      </StyledTextView>

      <StyledButton onPress={createMatch}>
        <Icon svgXml={addXmlData} width={33} height={33} />
      </StyledButton>
    </TouchableOpacity>
  );
};

const StyledButton = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.palette['gray-0']};
  background-color: ${props => props.theme.palette['main-300']};
  width: 52px;
  height: 52px;
  border-radius: 26px;
  margin: 0 auto;
`;

const StyledTextView = styled.View`
  position: absolute;
  background-color: ${props => props.theme.palette['gray-0']};
  border: 1px solid ${props => props.theme.palette['gray-200']};
  top: 10px;
  left: -76px;
  width: 76px;
  padding: 6px 11px;
  border-radius: 6px;
`;
