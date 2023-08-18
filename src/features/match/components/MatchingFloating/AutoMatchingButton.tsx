import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {fireXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';

interface IAutoMatchingButtonProps {
  autoMatch: () => void;
}

export const AutoMatchingButton = ({
  autoMatch,
}: IAutoMatchingButtonProps): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={autoMatch}>
      <StyledTextView>
        <Text
          type="body3"
          textAlign="center"
          fontWeight="600"
          text="자동 매칭"
        />
      </StyledTextView>

      <StyledButton onPress={autoMatch}>
        <Icon svgXml={fireXmlData} width={17} height={25} />
      </StyledButton>
    </TouchableOpacity>
  );
};

const StyledButton = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.palette['gray-0']};
  background-color: ${props => props.theme.palette['sub-400']};
  width: 52px;
  height: 52px;
  border-radius: 26px;
  margin: 18px auto;
`;

const StyledTextView = styled.View`
  position: absolute;
  background-color: ${props => props.theme.palette['gray-0']};
  border: 1px solid ${props => props.theme.palette['gray-200']};
  top: 29px;
  left: -76px;
  width: 76px;
  padding: 6px 11px;
  border-radius: 6px;
`;
