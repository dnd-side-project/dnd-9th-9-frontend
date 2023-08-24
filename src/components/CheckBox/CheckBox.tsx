import React from 'react';

import {checkXmlData, nonCheckXmlData} from '../../assets/svg';
import {Icon} from '../Icon';

export interface ICheckBoxProps {
  isCheck: boolean;
}

export const CheckBox = ({isCheck}: ICheckBoxProps): React.JSX.Element => {
  return (
    <Icon
      svgXml={isCheck ? checkXmlData : nonCheckXmlData}
      width={44}
      height={44}
    />
  );
};
