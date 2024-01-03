import React, {useMemo} from 'react';

import styled from '@emotion/native';
import {FlatList} from 'react-native';

import {NotificationListItem} from './NotificationListItem';
import {Text} from '../../../components/Text';
import {dayjs} from '../../../lib/dayjs';
import {type INotification} from '../types';

interface INotificationListProps {
  notifications: INotification[];
  isPressMoreVisible?: boolean;
  onPressMore?: () => void;
  onPressNotification?: (notification: INotification) => void;
}

type IGroupedNotifications = Record<string, INotification[]>;

export const NotificationList = ({
  notifications,
  isPressMoreVisible,
  onPressMore,
  onPressNotification,
}: INotificationListProps): React.JSX.Element => {
  const groupedNotificationsByDate = useMemo(() => {
    const groupedData: IGroupedNotifications = {};

    for (const notification of notifications) {
      const date = dayjs(notification.createdAt).format('YYYY-MM-DD');
      if (groupedData[date] === undefined) {
        groupedData[date] = [];
      }
      groupedData[date].push(notification);
    }

    return groupedData;
  }, [notifications]);

  const renderItem = ({
    item: [date, notifications],
  }: {
    item: [string, INotification[]];
  }): React.JSX.Element => {
    return (
      <>
        <StyledNotificationDate>
          <Text color="gray-400" text={dayjs(date).format('M월D일')} />
        </StyledNotificationDate>

        {notifications.map((notification, i) => (
          <NotificationListItem
            key={`${notification.id}-${i}`}
            isRead={notification.isRead}
            isLast={notifications.length - 1 === i}
            content="test"
            onPress={() => {
              onPressNotification?.(notification);
            }}
          />
        ))}
      </>
    );
  };

  return notifications.length !== 0 ? (
    <StyledContainer>
      <StyledNotificationList>
        <FlatList
          data={Object.entries(groupedNotificationsByDate)}
          renderItem={renderItem}></FlatList>
      </StyledNotificationList>

      {isPressMoreVisible != null && (
        // TODO(@minimalKim): 더보기 버튼 디자인 명세 필요
        <StyledMoreButton onPress={onPressMore}>
          <Text text="더보기" type="body3" fontWeight="600" color="gray-600" />
        </StyledMoreButton>
      )}
    </StyledContainer>
  ) : (
    <StyledNoContentsWrapper>
      <Text
        type="body2"
        color="gray-400"
        fontWeight="600"
        text="알림이 존재하지 않습니다."
      />
    </StyledNoContentsWrapper>
  );
};

const StyledContainer = styled.View`
  display: flex;
  align-items: center;
`;

const StyledNotificationList = styled.View`
  display: flex;
  width: 100%;
`;

const StyledNotificationDate = styled.View`
  display: flex;
  padding: 34px 18px 10px;
  align-items: flex-start;
  width: 100%;
  border-bottom-width: 0.5px;
  border-color: ${({theme}) => theme.palette['gray-300']};
`;

const StyledMoreButton = styled.TouchableOpacity`
  border-radius: 16px;
  background-color: ${({theme}) => theme.palette['gray-100']};
  padding: 16px 60px;
  margin: 20px 0;
`;

const StyledNoContentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 120px;
  margin: 0px auto 30px auto;
`;
