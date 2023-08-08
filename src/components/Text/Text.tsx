import React from 'react';
import styled from '@emotion/native';
import {Tpalette, Ttypography} from '../../assets/styles/emotion';

export interface ITextProps {
  text: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: Tpalette;
  type?: Ttypography;
  style?: any;
  textAlign?: string;
}

interface IStyledText extends ITextProps {
  type: Ttypography;
}

const StyledText = styled.Text<IStyledText>`
  font-family: ${props => props.theme.typography[props.type].fontFamily};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.theme.typography[props.type].fontSize};
  color: ${props => props.theme.palette[props.color]};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
`;

export const Text = (
  {
    text,
    color = 'black',
    type = 'body1',
    fontWeight,
    lineHeight,
    style,
    textAlign,
  }: ITextProps,
  props: any,
) => {
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
