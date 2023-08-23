import React from 'react';

import styled from '@emotion/native';
import {Image} from 'react-native';
import {launchImageLibrary, type Asset} from 'react-native-image-picker';

import {theme} from '../../../../assets/styles/theme';
import {plusXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {type ICreateField} from '../../types';

interface ICreateMatchProfileSectionProps {
  createMatchProfilePayload: ICreateField;
  onChange: (key: keyof ICreateField, value: string) => void;
}

interface IInputSectionProfileInformation {
  label: string;
  value: string;
  required: boolean;
  placeholder?: string;
  onChangeText: (value: string) => void;
}

const InputSectionProfileInformation = ({
  label,
  value,
  required,
  placeholder = '자유롭게 적어주세요',
  onChangeText,
}: IInputSectionProfileInformation): React.JSX.Element => {
  return (
    <StyledInformationWrapper>
      <StyledInformationHeaderWrapper>
        <Text type="body1" color="gray-950" fontWeight="600" text={label} />
        {required && (
          <Text type="body3" color="gray-600" fontWeight="400" text="[필수]" />
        )}
      </StyledInformationHeaderWrapper>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </StyledInformationWrapper>
  );
};

export const CreateMatchProfileSection = ({
  createMatchProfilePayload,
  onChange,
}: ICreateMatchProfileSectionProps): React.JSX.Element => {
  const {profileImg, name, description, rule} = createMatchProfilePayload;

  const handleImagePicker = (): void => {
    void launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets != null) {
          const selectedAsset: Asset = response.assets[0];
          onChange('profileImg', selectedAsset.uri ?? '');
          // TODO: 서버 이미지 업로드
        } else {
          // TODO: 에러 처리
        }
      },
    );
  };

  return (
    <>
      <StyledProfileWrapper activeOpacity={0.8} onPress={handleImagePicker}>
        {profileImg !== '' ? (
          <Image
            source={{uri: profileImg}}
            style={{width: '100%', height: '100%', borderRadius: 142}}
          />
        ) : (
          <Icon
            svgXml={plusXmlData}
            height={72}
            width={72}
            color={theme.palette['gray-0']}
          />
        )}
      </StyledProfileWrapper>

      <InputSectionProfileInformation
        required
        label="팀 이름"
        value={name}
        onChangeText={value => {
          onChange('name', value);
        }}
      />

      <InputSectionProfileInformation
        required
        label="팀 소개"
        value={description}
        onChangeText={value => {
          onChange('description', value);
        }}
      />

      <InputSectionProfileInformation
        required
        label="팀 규칙"
        value={rule}
        onChangeText={value => {
          onChange('rule', value);
        }}
      />
    </>
  );
};

const StyledProfileWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.palette['gray-100']};
  width: 140px;
  height: 140px;
  border-radius: 142px;
  margin: 51px auto;
`;

const StyledInformationWrapper = styled.View`
  padding: 10px 16px;
`;

const StyledInformationHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  color: ${props => props.theme.palette['gray-700']};
  border-bottom-width: 1px;
  border-color: ${props => props.theme.palette['gray-50']};
  font-size: ${props => props.theme.typography.body2.fontSize};
  font-weight: 400;
  height: 63px;
  padding: 29px 0px 13px 0;
`;
