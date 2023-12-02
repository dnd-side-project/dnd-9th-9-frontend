import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {arrowLeftXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text';

interface ITopBarProps {
  headerText?: string;
  showBackButton?: boolean;
  onPressBackButton?: () => void;
  leftComponent?: () => React.JSX.Element;
  rightComponent?: () => React.JSX.Element;
}

export const TopBar = ({
  headerText,
  showBackButton = false,
  onPressBackButton,
  leftComponent,
  rightComponent,
}: ITopBarProps): React.JSX.Element => {
  const navigation = useNavigation();

  const handlePressBackButton = (): void => {
    onPressBackButton?.();
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <StyledTopBar>
        <StyledLeftWrapper>
          {leftComponent != null ? (
            leftComponent()
          ) : showBackButton ? (
            <StyledBackButton onPress={handlePressBackButton}>
              <Icon svgXml={arrowLeftXmlData} width={32} height={32} />
            </StyledBackButton>
          ) : (
            <></>
          )}
        </StyledLeftWrapper>

        <Text text={headerText ?? ''} type="body1" fontWeight="bold" />

        <StyledRightWrapper>{rightComponent?.()}</StyledRightWrapper>
      </StyledTopBar>
    </>
  );
};

const StyledTopBar = styled.View`
  display: flex;
  padding: 20px 16px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: ${({theme}) => theme.palette['gray-0']};
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
