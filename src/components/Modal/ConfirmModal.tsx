import React from 'react';
import styled from '@emotion/native';
import {Modal as RNModal} from 'react-native';
import {Gap} from '../Gap';
import {Text} from '../Text';

export interface IConfirmModalProps {
  visible: boolean;
  title: string;
  subTitle: string;
  handleConfirm: () => void;
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
  padding: 18px 0 0 0;
`;

const StyledConfirmButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.palette['main-300']};
  border-end-start-radius: ${props => props.theme.borderRadius.md};
  border-end-end-radius: ${props => props.theme.borderRadius.md};
  justify-content: center;
  margin: 17px 0 0 0;
  height: 56px;
`;

export const ConfirmModal = ({
  visible,
  title,
  subTitle,
  handleConfirm,
}: IConfirmModalProps) => {
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
          <StyledConfirmButton activeOpacity={0.8} onPress={handleConfirm}>
            <Text
              type="caption"
              color="gray-0"
              fontWeight="600"
              textAlign="center"
              text="확인"
            />
          </StyledConfirmButton>
        </StyledModalContent>
      </StyledModalWrapper>
    </RNModal>
  );
};
