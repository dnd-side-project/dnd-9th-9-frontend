import React, {
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/native';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';

import {BottomSheetContext} from './BottomSheetContext';

interface IBottomSheetProps extends PropsWithChildren {
  isVisible: boolean;
  defaultSelectedTabId?: string;
  onChangeIsVisible?: (visible: boolean) => void;
  onClose?: () => void;
}

export const BottomSheet = ({
  isVisible,
  defaultSelectedTabId = '',
  onChangeIsVisible,
  onClose,
  children,
}: IBottomSheetProps): React.JSX.Element => {
  const [currentTabId, setCurrentTabId] = useState(defaultSelectedTabId);

  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (isVisible) {
      resetBottomSheet.start();
    }
  }, [isVisible]);

  const closeModal = (): void => {
    closeBottomSheet.start(() => {
      onChangeIsVisible?.(false);
      onClose?.();
      setCurrentTabId(defaultSelectedTabId);
    });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <BottomSheetContext.Provider value={{currentTabId, setCurrentTabId}}>
        <StyledOverlay>
          <TouchableWithoutFeedback onPress={closeModal}>
            <StyledBackground />
          </TouchableWithoutFeedback>
          <StyledAnimatedView
            style={{transform: [{translateY}]}}
            {...panResponders.panHandlers}>
            {children}
          </StyledAnimatedView>
        </StyledOverlay>
      </BottomSheetContext.Provider>
    </Modal>
  );
};

const StyledOverlay = styled.View`
  flex: 1;
  justify-content: 'flex-end';
  background-color: 'rgba(0, 0, 0, 0.4)';
`;

const StyledBackground = styled.View`
  flex: 1;
`;

const StyledAnimatedView = styled(Animated.View)(() => ({
  height: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingTop: 29,
  paddingHorizontal: 16,
  paddingBottom: 32,
}));
