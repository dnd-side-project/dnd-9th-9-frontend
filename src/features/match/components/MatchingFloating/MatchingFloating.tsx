import React from 'react';

import styled from '@emotion/native';
import {
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {AddMatchingButton} from './AddMatchingButton';
import {AutoMatchingButton} from './AutoMatchingButton';
import {CloseMatchingButton} from './CloseMatchingButton';
import {matchingFloatingXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';

interface IMatchingFloatingProps {
  isActive: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  createMatch: () => void;
  autoMatch: () => void;
}

export const MatchingFloating = ({
  isActive,
  openMenu,
  closeMenu,
  createMatch,
  autoMatch,
}: IMatchingFloatingProps): React.JSX.Element => {
  const moveMenu = (to: 'create' | 'matching'): void => {
    to === 'create' ? createMatch() : autoMatch();
    closeMenu();
  };

  return (
    <>
      <RNModal animationType="fade" transparent={true} visible={isActive}>
        <TouchableWithoutFeedback onPress={closeMenu}>
          <StyledFloatWrapper>
            <View>
              <AddMatchingButton
                createMatch={() => {
                  moveMenu('create');
                }}
              />
              <AutoMatchingButton
                autoMatch={() => {
                  moveMenu('matching');
                }}
              />
              <CloseMatchingButton closeMenu={closeMenu} />
            </View>
          </StyledFloatWrapper>
        </TouchableWithoutFeedback>
      </RNModal>

      {!isActive && (
        <TouchableOpacity
          onPress={openMenu}
          style={{position: 'absolute', right: 10, bottom: 10}}>
          <Icon svgXml={matchingFloatingXmlData} width={102} height={102} />
        </TouchableOpacity>
      )}
    </>
  );
};

const StyledFloatWrapper = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  align-items: flex-end;
  padding: 103px 25px;
  gap: 18px;
`;
