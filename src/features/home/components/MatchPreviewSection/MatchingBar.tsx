import React from 'react';

import styled from '@emotion/native';
import {type ViewProps} from 'react-native';

import {Text} from '../../../../components/Text';

interface IMatchingBarProps extends ViewProps {
  leftName: string;
  leftValue: number;
  rightName: string;
  rightValue: number;
}

export const MatchingBar = ({
  leftName,
  leftValue,
  rightName,
  rightValue,
  ...props
}: IMatchingBarProps): React.JSX.Element => {
  const leftPercent = (leftValue / (leftValue + rightValue)) * 100;
  const rightPercent = (rightValue / (leftValue + rightValue)) * 100;
  const isLeftWinning = leftPercent >= rightPercent;

  return (
    <StyledMatchingBarsContainer {...props}>
      <StyledMatchingBar
        isLeft
        isWinning={isLeftWinning}
        percent={leftPercent}
        style={{zIndex: isLeftWinning ? 2 : 0}}>
        {/* NOTE: @emotion/native z-index 미동작 */}
        <StyledMatchingBarProfile
          isLeft
          isWinning={isLeftWinning}
          style={{zIndex: isLeftWinning ? 2 : 0}}>
          <Text
            text={leftName[0]}
            color="gray-0"
            type="body2"
            fontWeight="700"
          />
        </StyledMatchingBarProfile>
      </StyledMatchingBar>

      <StyledMatchingBar
        isLeft={false}
        isWinning={!isLeftWinning}
        percent={rightPercent}>
        <StyledMatchingBarProfile
          isLeft={false}
          isWinning={!isLeftWinning}
          style={{zIndex: isLeftWinning ? 0 : 2}}>
          <Text
            text={rightName[0]}
            color="gray-0"
            type="body2"
            fontWeight="700"
          />
        </StyledMatchingBarProfile>
      </StyledMatchingBar>
    </StyledMatchingBarsContainer>
  );
};

const StyledMatchingBarsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledMatchingBar = styled.View<{
  isLeft: boolean;
  isWinning: boolean;
  percent: number;
}>`
  display: flex;
  flex-direction: row;
  background-color: ${({theme, isLeft, isWinning}) =>
    !isWinning
      ? theme.palette['gray-400']
      : isLeft
      ? theme.palette['main-400']
      : theme.palette['sub-400']};
  height: 8px;
  border-radius: 4px;
  width: ${({percent}) => `${percent}%`};
  position: relative;
`;

const StyledMatchingBarProfile = styled.View<{
  isLeft: boolean;
  isWinning: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  top: -10px;
  left: ${({isLeft}) => (isLeft ? 'auto' : '-4px')};
  right: ${({isLeft}) => (isLeft ? '-4px' : 'auto')};
  background-color: ${({theme, isLeft, isWinning}) =>
    !isWinning
      ? theme.palette['gray-400']
      : isLeft
      ? theme.palette['main-400']
      : theme.palette['sub-400']};
  display: flex;
  align-items: center;
  justify-content: center;
`;
