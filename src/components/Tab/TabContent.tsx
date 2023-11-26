import React, {type PropsWithChildren} from 'react';

import styled from '@emotion/native';
import {Animated, type StyleProp} from 'react-native';

interface ITabContent extends PropsWithChildren {
  translateXTab: Animated.Value | number;
  translateY?: Animated.Value | number;
  style?: StyleProp<any>;
}

export const TabContent = ({
  translateXTab,
  translateY,
  children,
  style,
}: ITabContent): React.JSX.Element => {
  return (
    <StyledAnimatedView
      style={{
        ...style,
        transform: [
          {
            translateX: translateXTab,
          },
          {
            translateY: translateY ?? 0,
          },
        ],
      }}>
      <StyledView>{children}</StyledView>
    </StyledAnimatedView>
  );
};

const StyledAnimatedView = styled(Animated.View)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledView = styled.View`
  width: 100%;
`;
