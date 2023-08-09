import React from 'react';
import styled from '@emotion/native';
import {Tpalette, Ttypography} from '../../assets/styles/emotion';
import {StyleProp, TextProps, TextStyle} from 'react-native';

export interface ITextProps extends IStyledText {
  text: string;
  style?: StyleProp<TextStyle>;
}

interface IStyledText extends TextProps {
  type: Ttypography;
  color: Tpalette;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;
}

const StyledText = styled.Text<IStyledText>`
  font-family: ${props => props.theme.typography[props.type].fontFamily};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.theme.typography[props.type].fontSize};
  color: ${props => props.theme.palette[props.color]};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
`;

export const Text = ({
  text,
  color = 'black',
  type = 'body1',
  fontWeight,
  lineHeight,
  textAlign,
  style,
  ...props
}: ITextProps) => {
  return (
    <StyledText
      {...props}
      type={type}
      color={color}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      style={style}
      textAlign={textAlign}>
      {text}
    </StyledText>
  );
};
