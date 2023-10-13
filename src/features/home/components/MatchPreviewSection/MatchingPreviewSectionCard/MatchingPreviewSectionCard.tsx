import React, {type PropsWithChildren} from 'react';

import styled from '@emotion/native';

import {theme} from '../../../../../assets/styles/theme';
import {arrowRightXmlData} from '../../../../../assets/svg';
import {Icon} from '../../../../../components/Icon';

interface IMatchingPreviewSectionInnerCardProps extends PropsWithChildren {
  title: () => React.JSX.Element;
  onPress: () => void;
}

export const MatchingPreviewSectionCard = ({
  title,
  onPress,
  children,
}: IMatchingPreviewSectionInnerCardProps): React.JSX.Element => {
  return (
    <StyledMatchingPreviewSectionCardWrapper>
      <StyledMatchingPreviewSectionCard>
        <StyledTitleContainer onPress={onPress}>
          <StyledTitleTextContainer>{title()}</StyledTitleTextContainer>
          <Icon
            svgXml={arrowRightXmlData}
            width={40}
            height={40}
            color={theme.palette.black}
          />
        </StyledTitleContainer>
        {children}
      </StyledMatchingPreviewSectionCard>
    </StyledMatchingPreviewSectionCardWrapper>
  );
};

const StyledMatchingPreviewSectionCardWrapper = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  width: 100%;
`;

const StyledMatchingPreviewSectionCard = styled.View`
  background-color: ${({theme}) => theme.palette['gray-50']};
  border-radius: ${({theme}) => theme.borderRadius.md};
  padding: 20px;
  padding-bottom: 26px;
  width: 100%;
`;

const StyledTitleContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitleTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
