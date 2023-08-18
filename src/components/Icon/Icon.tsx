import React from 'react';

import {SvgXml} from 'react-native-svg';

export interface IIconProps {
  svgXml: string;
  width?: number;
  height?: number;
  color?: string;
}

export const Icon = ({
  svgXml,
  width = 44,
  height = 44,
  color,
}: IIconProps): React.JSX.Element => {
  return <SvgXml xml={svgXml} width={width} height={height} color={color} />;
};
