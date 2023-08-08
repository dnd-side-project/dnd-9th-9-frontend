import React from 'react';
import {SvgXml} from 'react-native-svg';

export interface IIconProps {
  svgXml: string;
  width?: number;
  height?: number;
}

export const Icon = ({svgXml, width = 44, height = 44}: IIconProps) => {
  return <SvgXml xml={svgXml} width={width} height={height} />;
};
