import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../components/Text';

interface IProfileNameProps {
  isHome: boolean;
  name: string;
}

export const ProfileName = ({
  isHome,
  name,
}: IProfileNameProps): React.JSX.Element => {
  return (
    <StyledProfileName isHome={isHome}>
      <Text text={name[0]} color="gray-0" type="body2" fontWeight="700" />
    </StyledProfileName>
  );
};

const StyledProfileName = styled.View<{
  isHome: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({theme, isHome}) =>
    isHome ? theme.palette['main-400'] : theme.palette['sub-400']};
  display: flex;
  align-items: center;
  justify-content: center;
`;
