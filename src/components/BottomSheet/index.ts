import {BottomSheet as _BottomSheet} from './BottomSheet';
import {BottomSheetContent} from './BottomSheetContent';
import {BottomSheetTab} from './BottomSheetTab';
import {BottomSheetTabList} from './BottomSheetTabList';

export const BottomSheet = Object.assign(_BottomSheet, {
  TabList: BottomSheetTabList,
  Tab: BottomSheetTab,
  Content: BottomSheetContent,
});
