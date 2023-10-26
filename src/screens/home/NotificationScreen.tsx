import React from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {Text} from '../../components/Text';
import {NotificationList} from '../../features/notification/components';
import {
  useGetNotificationUser,
  usePatchNotificationUserRead,
} from '../../features/notification/hooks';
import {type HomeStackParamList} from '../../navigators';

type Props = NativeStackScreenProps<HomeStackParamList, 'Notification'>;

export function NotificationScreen({navigation}: Props): React.JSX.Element {
  const {
    data: notificationUser,
    hasNextPage,
    fetchNextPage,
  } = useGetNotificationUser({
    pageSize: 10,
    pageNumber: 1,
  });

  const {mutate: patchNotificationUserRead} = usePatchNotificationUserRead();

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView />
      <StyledTopBar>
        <StyledTopBarButton
          onPress={() => {
            navigation.pop();
          }}>
          <Text text="뒤로" type="body3" color="gray-400" />
        </StyledTopBarButton>

        <Text text="알림" type="body2" fontWeight="700" />

        <StyledTopBarButton
          onPress={() => {
            patchNotificationUserRead(undefined);
            navigation.pop();
          }}>
          <Text text="모두 읽기" type="body3" color="gray-400" />
        </StyledTopBarButton>
      </StyledTopBar>

      <ScrollView style={{backgroundColor: theme.palette['gray-0']}}>
        <View>
          <NotificationList
            notifications={
              notificationUser?.pages.flatMap(page => page.notificationInfos) ??
              []
            }
            isPressMoreVisible={hasNextPage}
            onPressMore={() => {
              void fetchNextPage();
            }}
            onPressNotification={notification => {
              if (notification.fieldId != null) {
                // TODO(@minimalKim): 필드 페이지로 이동
                console.log(notification);
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const StyledTopBar = styled.View`
  display: flex;
  flex-direction: row;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledTopBarButton = styled.TouchableOpacity`
  min-width: 60px;
  display: flex;
  align-items: center;
`;
