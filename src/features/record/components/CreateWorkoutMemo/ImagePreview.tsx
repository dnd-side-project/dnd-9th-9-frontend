import React from 'react';

import styled from '@emotion/native';
import {Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {plusFilledXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';

interface IProps {
  imageUri?: string | null;
  placeholder?: string;
  onChangeImageUri?: (imageUri: string) => void;
}

export const ImagePreviewer = ({
  imageUri,
  placeholder,
  onChangeImageUri,
}: IProps): React.JSX.Element => {
  // const [image, setImage] = useState<string | null>(defaultImageUri ?? null);

  const handlePressImage = (): void => {
    void launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets == null || response.assets[0].uri == null) return;
        onChangeImageUri?.(response.assets[0].uri);
      },
    );
  };

  return (
    <StyledImageContainer onPress={handlePressImage}>
      {imageUri != null ? (
        <Image
          source={{uri: imageUri ?? ''}}
          style={{width: 140, height: 140}}
        />
      ) : (
        <>
          <Icon svgXml={plusFilledXmlData} width={46} height={46} />
          <Text text={placeholder ?? '사진 추가'} color="gray-400" />
        </>
      )}
    </StyledImageContainer>
  );
};

const StyledImageContainer = styled.TouchableOpacity`
  display: flex;
  border-radius: ${({theme}) => theme.borderRadius.md};
  overflow: hidden;
  height: 140px;
  width: 140px;
  background-color: ${({theme}) => theme.palette['gray-50']};
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
