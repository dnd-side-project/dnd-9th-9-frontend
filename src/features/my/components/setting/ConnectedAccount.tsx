import React from 'react';

import styled from '@emotion/native';

import {theme} from '../../../../assets/styles/theme';
import {
  appleLogoXmlData,
  googleLogoXmlData,
  kakaoLogoXmlData,
  matchupLogoXmlData,
} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {LOGIN_TYPE} from '../../const';
import {type TLoginType} from '../../types';

interface ConnectedAccountProps {
  loginType: TLoginType;
}

const LOGIN_TYPE_DATA: Record<
  TLoginType,
  {label: string; iconComponent: () => React.JSX.Element}
> = {
  APPLE: {
    label: LOGIN_TYPE.APPLE,
    iconComponent: () => (
      <StyledProfile style={{backgroundColor: 'black'}}>
        <Icon svgXml={appleLogoXmlData} height={20} />
      </StyledProfile>
    ),
  },
  GOOGLE: {
    label: LOGIN_TYPE.GOOGLE,
    iconComponent: () => (
      <StyledProfile
        style={{borderColor: theme.palette['gray-200'], borderWidth: 2}}>
        <Icon svgXml={googleLogoXmlData} height={20} />
      </StyledProfile>
    ),
  },
  KAKAO: {
    label: LOGIN_TYPE.KAKAO,
    iconComponent: () => (
      <StyledProfile style={{backgroundColor: '#FFEB00'}}>
        <Icon svgXml={kakaoLogoXmlData} height={20} color="#3C1E1E" />
      </StyledProfile>
    ),
  },
  MATCH_UP: {
    label: LOGIN_TYPE.MATCH_UP,
    iconComponent: () => (
      <StyledProfile
        style={{borderColor: theme.palette['gray-200'], borderWidth: 2}}>
        <Icon svgXml={matchupLogoXmlData} height={24} />
      </StyledProfile>
    ),
  },
};

export const ConnectedAccount = ({
  loginType,
}: ConnectedAccountProps): React.JSX.Element => {
  const {label, iconComponent: LoginIcon} = LOGIN_TYPE_DATA[loginType];
  return (
    <StyledHorizontal
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 18,
      }}>
      <StyledHorizontal style={{gap: 28}}>
        <LoginIcon />
        <Text text={label} type="body2" />
      </StyledHorizontal>

      <Text text="연결됨" color="gray-600" type="body3" />
    </StyledHorizontal>
  );
};

const StyledProfile = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
