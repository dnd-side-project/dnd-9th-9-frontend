import React from 'react';
import styled from '@emotion/native';
import {Icon} from '../../../../components/Icon';
import {closeXmlData} from '../../../../assets/svg';

interface ICloseMatchingButtonProps {
  closeMenu: () => void;
}

export const CloseMatchingButton = ({closeMenu}: ICloseMatchingButtonProps) => {
  return (
    <StyledButton onPress={closeMenu}>
      <Icon svgXml={closeXmlData} width={66} height={66} />
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.palette['gray-800']};
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;
