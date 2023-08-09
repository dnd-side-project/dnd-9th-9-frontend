import React from 'react';
import styled from '@emotion/native';
import {Modal as RNModal} from 'react-native';
import {IConfirmModalProps} from './ConfirmModal';
import {Text} from '../Text';
import {Gap} from '../Gap';

export interface IModalProps extends IConfirmModalProps {
  handleCancel: () => void;
}

interface IStyledButton {
  type: 'confirm' | 'cancel';
}

const StyledModalWrapper = styled.View`
  flex: 1;
  background-color: rgba(36, 25, 25, 0.5);
  justify-content: center;
  align-items: center;
`;

const StyledModalContent = styled.View`
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.palette['gray-0']};
  width: 249px;
  padding: 18px;
`;

const StyledFlexView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled.TouchableOpacity<IStyledButton>`
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props =>
    props.type === 'confirm'
      ? props.theme.palette['main-300']
      : props.theme.palette['gray-100']};
  margin: 17px 0 0 0;
  padding: 13px 40px;
`;

export const Modal = ({
  visible,
  title,
  subTitle,
  handleCancel,
  handleConfirm,
}: IModalProps) => {
  return (
    <RNModal animationType="fade" transparent={true} visible={visible}>
      <StyledModalWrapper>
        <StyledModalContent>
          <Text
            type="body2"
            color="gray-950"
            fontWeight="600"
            textAlign="center"
            text={title}
          />
          <Gap size="8px" />
          <Text
            type="caption"
            color="gray-600"
            fontWeight="600"
            textAlign="center"
            text={subTitle}
          />
          <StyledFlexView>
            <StyledButton
              type="cancel"
              activeOpacity={0.8}
              onPress={handleCancel}>
              <Text
                type="caption"
                color="gray-600"
                fontWeight="600"
                text="취소"
              />
            </StyledButton>
            <StyledButton
              type="confirm"
              activeOpacity={0.8}
              onPress={handleConfirm}>
              <Text
                type="caption"
                color="gray-0"
                fontWeight="600"
                text="확인"
              />
            </StyledButton>
          </StyledFlexView>
        </StyledModalContent>
      </StyledModalWrapper>
    </RNModal>
  );
};
