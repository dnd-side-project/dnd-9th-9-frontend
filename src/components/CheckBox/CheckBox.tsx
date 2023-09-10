import React from 'react';

import styled from '@emotion/native';

import {checkXmlData, nonCheckXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text';

export interface ICheckBoxProps {
  isCheck: boolean;
  label?: string;
  onPress?: () => void;
}

export const CheckBox = ({
  isCheck,
  label,
  onPress,
}: ICheckBoxProps): React.JSX.Element => {
  return (
    <StyledTouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Icon
        svgXml={isCheck ? checkXmlData : nonCheckXmlData}
        width={44}
        height={44}
      />
      {label != null && (
        <Text
          text={label}
          type="body2"
          fontWeight="600"
          color={isCheck ? 'black' : 'gray-400'}
        />
      )}
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
