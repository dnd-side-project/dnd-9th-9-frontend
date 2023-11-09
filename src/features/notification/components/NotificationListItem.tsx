import React from 'react';

import styled from '@emotion/native';

import {Text} from '../../../components/Text';

interface INotificationListItemProps {
  isRead: boolean;
  isLast: boolean;
  content: string;
  onPress?: () => void;
}

export const NotificationListItem = ({
  isRead,
  isLast,
  content,
  onPress,
}: INotificationListItemProps): React.JSX.Element => {
  const Container =
    onPress != null
      ? StyledNotificationListItemPressable
      : StyledNotificationListItem;

  return (
    <Container isRead={isRead} isLast={isLast} onPress={onPress}>
      <Text text={content} type="body2"></Text>
    </Container>
  );
};

const StyledNotificationListItemPressable = styled.TouchableOpacity<{
  isRead: boolean;
  isLast: boolean;
}>`
  display: flex;
  padding: 18px 68px;
  border-width: 0.5px;
  border-bottom-width: ${({isLast}) => (isLast ? '1px' : '0.5px')};
  border-color: ${({theme}) => theme.palette['gray-300']};
  background-color: ${({theme, isRead}) =>
    isRead ? theme.palette['gray-0'] : 'rgba(179, 242, 218, 0.2)'};
  width: 100%;
`;

const StyledNotificationListItem = styled.View<{
  isRead: boolean;
  isLast: boolean;
}>`
  display: flex;
  padding: 18px 68px;
  border-width: 0.5px;
  border-bottom-width: ${({isLast}) => (isLast ? '1px' : '0.5px')};
  border-color: ${({theme}) => theme.palette['gray-300']};
  width: 100%;
`;
