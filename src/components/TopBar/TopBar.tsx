import React from 'react';

import styled from '@emotion/native';

import {arrowLeftXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text';

interface ITopBarProps {
  headerText?: string;
  showBackButton?: boolean;
  onPressBackButton?: () => void;
  leftIcon?: () => React.JSX.Element;
}

export const TopBar = ({
  headerText,
  showBackButton = false,
  onPressBackButton,
  leftIcon,
}: ITopBarProps): React.JSX.Element => {
  return (
    <StyledTopBar>
      <StyledLeftWrapper>
        {leftIcon != null ? (
          leftIcon()
        ) : showBackButton ? (
          <StyledBackButton onPress={onPressBackButton}>
            <Icon svgXml={arrowLeftXmlData} width={32} height={32} />
          </StyledBackButton>
        ) : (
          <></>
        )}
      </StyledLeftWrapper>

      <Text text={headerText ?? ''} type="body1" fontWeight="bold" />

      <StyledRightWrapper></StyledRightWrapper>
    </StyledTopBar>
  );
};

const StyledTopBar = styled.View`
  display: flex;
  padding: 20px 16px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const StyledBackButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const StyledLeftWrapper = styled.View`
  position: absolute;
  left: 16px;
`;

const StyledRightWrapper = styled.View`
  position: absolute;
  right: 16px;
`;
