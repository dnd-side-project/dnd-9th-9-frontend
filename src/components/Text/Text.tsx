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
}

interface IStyledText {
  fontWeight?: string;
  lineHeight?: string;
  color: Tpalette;
  type: Ttypography;
  style?: any;
}

const StyledText = styled.Text<IStyledText>`
  font-family: ${props => props.theme.typography[props.type].fontFamily};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.theme.typography[props.type].fontSize};
  color: ${props => props.theme.palette[props.color]};
  line-height: ${props => props.lineHeight};

  ${props => props.style}
`;

export const Text = (
  {
    text,
    color = 'black',
    type = 'body1',
    fontWeight,
    lineHeight,
    style,
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
      style={style}>
      {text}
    </StyledText>
  );
};
