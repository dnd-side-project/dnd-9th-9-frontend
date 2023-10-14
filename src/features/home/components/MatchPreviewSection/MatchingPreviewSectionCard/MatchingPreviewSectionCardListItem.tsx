import React, {type PropsWithChildren} from 'react';

import styled from '@emotion/native';

import {Text} from '../../../../../components/Text';

interface IMatchingPreviewSectionCardListItemProps extends PropsWithChildren {
  label: string;
}

export const MatchingPreviewSectionCardListItem = ({
  label,
  children,
}: IMatchingPreviewSectionCardListItemProps): React.JSX.Element => {
  return (
    <StyledBattleListItemContainer>
      <Text text={label} type="body2" fontWeight="700" color="gray-600" />
      {children}
    </StyledBattleListItemContainer>
  );
};

const StyledBattleListItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
