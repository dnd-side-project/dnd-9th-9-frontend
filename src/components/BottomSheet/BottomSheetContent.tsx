import {useContext, type PropsWithChildren} from 'react';
import React from 'react';

import {View} from 'react-native';

import {BottomSheetContext} from './BottomSheetContext';

interface IBottomSheetContentProps extends PropsWithChildren {
  id: string;
}

export const BottomSheetContent = ({
  id,
  children,
}: IBottomSheetContentProps): React.JSX.Element => {
  const {currentTabId} = useContext(BottomSheetContext);

  const isCurrentTab = currentTabId === id;

  return <>{isCurrentTab && <View>{children}</View>}</>;
};
