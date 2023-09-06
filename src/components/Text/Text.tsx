import React from 'react';

import styled from '@emotion/native';
import {type StyleProp, type TextProps, type TextStyle} from 'react-native';

import {type TPalette, type TTypography} from '../../assets/styles/emotion';

export interface ITextProps extends TextProps {
  text: string;
  type?: TTypography;
  color?: TPalette;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;
  style?: StyleProp<TextStyle>;
}

interface IStyledText {
  type: TTypography;
  color: TPalette;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;
}

export const Text = ({
  text,
  color = 'black',
  type = 'body1',
  fontWeight,
  lineHeight,
  textAlign,
  numberOfLines,
  style,
  ...props
}: ITextProps): React.JSX.Element => {
  return (
    <StyledText
      {...props}
      type={type}
      color={color}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      style={style}
      textAlign={textAlign}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail">
      {text}
    </StyledText>
  );
};

const StyledText = styled.Text<IStyledText>`
  font-family: ${props => props.theme.typography[props.type].fontFamily};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.theme.typography[props.type].fontSize};
  color: ${props => props.theme.palette[props.color]};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
`;
