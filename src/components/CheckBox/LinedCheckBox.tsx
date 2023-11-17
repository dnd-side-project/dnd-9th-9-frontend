import React from 'react';

import styled from '@emotion/native';

import {theme} from '../../assets/styles/theme';
import {checkLinedXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text';

interface ILinedCheckBoxProps {
  isCheck: boolean;
  label?: string;
  onPress: () => void;
}

export const LinedCheckBox = ({
  isCheck,
  label,
  onPress,
}: ILinedCheckBoxProps): React.JSX.Element => {
  return (
    <StyledTouchableOpacity onPress={onPress}>
      <Icon
        svgXml={checkLinedXmlData}
        width={12}
        color={isCheck ? theme.palette['main-400'] : theme.palette['gray-200']}
      />
      {label != null && (
        <Text
          text={label}
          type="caption"
          fontWeight="400"
          color={isCheck ? 'gray-800' : 'gray-600'}
        />
      )}
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
`;
