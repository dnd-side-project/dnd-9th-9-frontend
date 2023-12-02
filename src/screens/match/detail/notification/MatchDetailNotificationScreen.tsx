import React from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {
  useGetInfiniteNotificationField,
  usePatchNotificationRead,
} from '../../../../features/match/hooks/notification';
import {NotificationList} from '../../../../features/notification/components';
import Toast from '../../../../lib/toast';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

export const MatchDetailNotificationScreen = (): React.JSX.Element => {
  const route =
    useRoute<RouteProp<MatchStackParamList, 'MatchDetailNotification'>>();

  const {id} = route.params;

  const {
    data: fieldNotifications,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteNotificationField({id, pageSize: 10, pageNumber: 1});

  const {mutate: patchNotificationRead} = usePatchNotificationRead({
    onSuccessCallback: () => {
      const message = '알림을 확인하였습니다.';
      Toast.show({message});
    },
    onErrorCallback: error => {
      const message =
        error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.';
      Toast.show({message});
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.palette['gray-0'],
      }}>
      <ScrollView style={{backgroundColor: theme.palette['gray-0']}}>
        <View>
          <NotificationList
            notifications={
              fieldNotifications?.pages.flatMap(
                page => page.notificationInfos,
              ) ?? []
            }
            isPressMoreVisible={hasNextPage}
            onPressMore={() => {
              void fetchNextPage();
            }}
            onPressNotification={notification => {
              if (notification.id !== null) {
                patchNotificationRead({id: notification.id});
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
