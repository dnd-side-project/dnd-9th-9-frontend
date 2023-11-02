import React from 'react';

import styled from '@emotion/native';

import {theme} from '../../../../assets/styles/theme';
import {arrowRightXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';

interface IProfileListItemProps {
  label: string;
  value: string;
  onPress?: () => void;
}

export const ProfileListItem = ({
  label,
  value,
  onPress,
}: IProfileListItemProps): React.JSX.Element => {
  const ProfileListItemComponent =
    onPress != null ? StyledProfileListItemPressable : StyledProfileListItem;

  return (
    <ProfileListItemComponent onPress={onPress}>
      <StyledLabelWrapper>
        <Text type="body3" fontWeight="bold" text={label} />
      </StyledLabelWrapper>
      <StyledValueWrapper>
        <Text type="body2" color="gray-800" text={value} />
        {onPress != null ? (
          <Icon
            svgXml={arrowRightXmlData}
            color={theme.palette.black}
            width={30}
          />
        ) : (
          <StyledEmpty></StyledEmpty>
        )}
      </StyledValueWrapper>
    </ProfileListItemComponent>
  );
};

const StyledProfileListItemPressable = styled.TouchableOpacity`
  padding: 20px 0 20px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledProfileListItem = styled.View`
  padding: 20px 0 20px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledEmpty = styled.View`
  height: 40px;
`;

const StyledValueWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const StyledLabelWrapper = styled.View`
  width: 100px;
`;
