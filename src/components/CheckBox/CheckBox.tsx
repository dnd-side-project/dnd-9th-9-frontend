import React from 'react';

import {checkXmlData, nonCheckXmlData} from '../../assets/svg';
import {Icon} from '../Icon';

export interface ICheckBoxProps {
  checked: boolean;
}

export const CheckBox = ({checked}: ICheckBoxProps): React.JSX.Element => {
  return (
    <Icon
      svgXml={checked ? checkXmlData : nonCheckXmlData}
      width={44}
      height={44}
    />
  );
};
