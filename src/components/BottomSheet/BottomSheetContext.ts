import {type Dispatch, type SetStateAction, createContext} from 'react';

interface IBottomSheetContext {
  currentTabId: string;
  setCurrentTabId: Dispatch<SetStateAction<string>>;
}

export const BottomSheetContext = createContext<IBottomSheetContext>({
  currentTabId: '',
  setCurrentTabId: () => {},
});
