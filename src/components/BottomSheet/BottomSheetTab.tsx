import React, {useContext} from 'react';

import {TouchableOpacity} from 'react-native';

import {BottomSheetContext} from './BottomSheetContext';
import {Text} from '../Text';

interface IBottomSheetTabProps {
  title: string;
  id: string;
}

export const BottomSheetTab = ({
  title,
  id,
}: IBottomSheetTabProps): React.JSX.Element => {
  const {currentTabId, setCurrentTabId} = useContext(BottomSheetContext);

  const isCurrentTab = currentTabId === id;

  const handleTabClick = (): void => {
    setCurrentTabId(id);
  };

  return (
    <TouchableOpacity onPress={handleTabClick}>
      <Text
        text={title}
        type="head4"
        color={isCurrentTab ? 'black' : 'gray-500'}
      />
    </TouchableOpacity>
  );
};
