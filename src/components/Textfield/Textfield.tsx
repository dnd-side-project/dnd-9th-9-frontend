import React, {useState} from 'react';

import styled from '@emotion/native';
import {type TextInputProps} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {checkXmlData, errorXmlData} from '../../assets/svg';
import {Icon} from '../Icon';
import {Text} from '../Text/Text';

interface ITextfieldProps extends TextInputProps {
  isError?: boolean;
  isValid?: boolean;
  size?: 'md' | 'sm';
  label?: string;
  hintMessage?: string;
  errorMessage?: string;
  rightElement?: () => React.JSX.Element;
}

export const Textfield = ({
  isError = false,
  isValid = false,
  size = 'md',
  label = '',
  hintMessage = '',
  errorMessage = '',
  rightElement: RightElement,
  ...props
}: ITextfieldProps): React.JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const rightIcon = isError ? errorXmlData : isValid ? checkXmlData : null;
  return (
    <StyledTextfield>
      <Text text={label} type="caption" color="gray-600" />

      <StyledTextInputContainer isError={isError} isFocused={isFocused}>
        <StyledTextInput
          size={size}
          placeholderTextColor={theme.palette['gray-100']}
          onFocus={() => {
            setIsFocused(true);
          }}
          onEndEditing={() => {
            // onBlur이 동작하지 않는 이슈
            setIsFocused(false);
          }}
          {...props}
        />

        {rightIcon != null && (
          <Icon svgXml={rightIcon} width={40} height={40} />
        )}

        {RightElement != null && <RightElement />}
      </StyledTextInputContainer>

      {errorMessage !== '' ? (
        <Text type="caption" color="error-light" text={errorMessage} />
      ) : (
        <Text type="caption" color="gray-600" text={hintMessage} />
      )}
    </StyledTextfield>
  );
};

const StyledTextfield = styled.View`
  display: flex;
  gap: 4px;
`;

const StyledTextInputContainer = styled.View<{
  isError: boolean;
  isFocused: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${({isError, isFocused, theme}) =>
    isError
      ? theme.palette['error-light']
      : isFocused
      ? theme.palette.black
      : theme.palette['gray-100']};
  border-bottom-width: 2px;
  transition: all 1s ease-in-out;
`;

const StyledTextInput = styled.TextInput<{size: 'md' | 'sm'}>`
  flex: 1;
  padding: 10px 0;
  color: ${({theme}) => theme.palette.black};
  font-family: Pretendard;
  font-size: ${({size}) => (size === 'md' ? '16px' : '14px')};
  font-weight: 700;
`;