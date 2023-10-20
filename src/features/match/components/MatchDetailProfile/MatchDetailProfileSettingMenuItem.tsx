import React from 'react';

import styled from '@emotion/native';

import {arrowRightXmlData} from '../../../../assets/svg';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';

interface IMatchDetailProfileSettingMenuItemProps {
  title: string;
  description: string;
  onPressHeader: () => void;
}

export const MatchDetailProfileSettingMenuItem = ({
  title,
  description,
  onPressHeader,
}: IMatchDetailProfileSettingMenuItemProps): React.JSX.Element => {
  return (
    <StyledSettingWrapper>
      <StyledHeaderWrapper activeOpacity={0.8} onPress={onPressHeader}>
        <Text type="body1" fontWeight="700" text={title} />
        <Icon svgXml={arrowRightXmlData} color="black" />
      </StyledHeaderWrapper>
      <Gap size="12px" />
      <Text type="body3" color="gray-600" fontWeight="400" text={description} />
    </StyledSettingWrapper>
  );
};

const StyledSettingWrapper = styled.View`
  padding: 41px 16px 30px 16px;
`;

const StyledHeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
