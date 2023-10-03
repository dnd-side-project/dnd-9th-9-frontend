import {useContext, type PropsWithChildren, useMemo} from 'react';
import React from 'react';

import {View} from 'react-native';

import {BottomSheetContext} from './BottomSheetContext';

interface IBottomSheetContentProps extends PropsWithChildren {
  id?: string;
}

export const BottomSheetContent = ({
  id,
  children,
}: IBottomSheetContentProps): React.JSX.Element => {
  const {currentTabId} = useContext(BottomSheetContext);

  const isCurrentTab = useMemo(() => {
    if (id === undefined) return true;
    return currentTabId === id;
  }, [id]);

  return <>{isCurrentTab && <View>{children}</View>}</>;
};
