import React, {type PropsWithChildren} from 'react';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';

interface Props extends PropsWithChildren {}

export const KeyboardHidePressArea = ({children}: Props): React.JSX.Element => (
  <TouchableWithoutFeedback
    onPress={() => {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
    }}>
    {children}
  </TouchableWithoutFeedback>
);
