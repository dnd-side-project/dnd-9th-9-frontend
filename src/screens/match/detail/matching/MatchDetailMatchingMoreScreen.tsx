import React, {useState} from 'react';

import {
  type RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-simple-toast';

import {theme} from '../../../../assets/styles/theme';
import {Button} from '../../../../components/Button';
import {Modal} from '../../../../components/Modal';
import {Text} from '../../../../components/Text';
import {
  MatchApplyHeader,
  MatchApplyList,
} from '../../../../features/match/components/MatchDetailMatching';
import {
  useDeleteFieldEntry,
  useGetInfiniteFieldEntryBattleDetail,
  usePostFieldEntryAccept,
} from '../../../../features/match/hooks/fieldEntry';
import {type MatchStackParamList} from '../../../../navigators';

type TMatchDetailMatchingMoreRouteProps = RouteProp<
  MatchStackParamList,
  'MatchDetailMatchingMore'
>;

export const MatchDetailMatchingMoreScreen = (): React.JSX.Element => {
  const route = useRoute<TMatchDetailMatchingMoreRouteProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const {id, type} = route.params;

  const {
    data: fieldEntryBattleData,
    isLoading: isLoadingFieldEntryBattle,
    isFetchingNextPage: isFetchingNextPageFieldEntryBattle,
    fetchNextPage: fetchNextPageFieldEntryBattle,
    hasNextPage: hasNextPageFieldEntryBattle,
  } = useGetInfiniteFieldEntryBattleDetail({
    id,
    page: 0,
    size: 3,
    fieldDirection: type,
  });

  const {mutate: deleteFieldEntrySent} = useDeleteFieldEntry({
    onSuccessCallback: () => {
      Toast.show('매칭 신청이 취소되었습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
    },
  });

  const {mutate: postAcceptFieldEntry} = usePostFieldEntryAccept({
    onSuccessCallback: () => {
      Toast.show('매칭이 시작되었습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
      navigation.pop();
    },
  });

  const [isSettingMode, setIsSettingMode] = useState(false);
  const [checkedApply, setCheckedApply] = useState<number>();
  const [settingModalInfo, setSettingModalInfo] = useState({
    visible: false,
    title: '',
    subTitle: '',
  });

  if (isLoadingFieldEntryBattle) return <View></View>;

  const handleSettingList = (): void => {
    setIsSettingMode(value => !value);
    setCheckedApply(undefined);
  };

  const handleTeamDetail = (matchId: number): void => {
    if (isSettingMode) return;
    navigation.push('MatchDetail', {id: matchId});
  };

  const handleSettingConfirmButton = (): void => {
    if (type === 'SENT') {
      setSettingModalInfo({
        visible: true,
        title: '선택한 매칭을 삭제할까요?',
        subTitle: '선택한 매칭은 목록에서 제거됩니다.',
      });
    } else if (type === 'RECEIVED') {
      setSettingModalInfo({
        visible: true,
        title: '선택한 팀과 매칭을 시작할까요?',
        subTitle: '선택한 팀을 제외한 나머지는 삭제됩니다.',
      });
    }
  };

  const handleCancelModal = (): void => {
    setSettingModalInfo({
      visible: false,
      title: '',
      subTitle: '',
    });
  };

  const handleConfirmModal = (): void => {
    if (checkedApply === undefined) return;

    if (type === 'SENT') deleteFieldEntrySent({entryId: checkedApply});
    else if (type === 'RECEIVED') postAcceptFieldEntry({entryId: checkedApply});

    handleCancelModal();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <MatchApplyHeader
        type={type}
        settingIcon={
          <TouchableOpacity activeOpacity={0.8} onPress={handleSettingList}>
            <Text
              type="body2"
              color="gray-600"
              fontWeight="400"
              text={isSettingMode ? '설정취소' : '설정'}
            />
          </TouchableOpacity>
        }
      />

      <MatchApplyList
        type={type}
        isSettingMode={isSettingMode}
        fieldEntryBattleData={fieldEntryBattleData}
        checkedId={checkedApply}
        onPressTeamDetail={handleTeamDetail}
        onPressCheckBox={setCheckedApply}
        onEndReached={() => {
          if (
            (hasNextPageFieldEntryBattle ?? false) &&
            !isFetchingNextPageFieldEntryBattle
          ) {
            void fetchNextPageFieldEntryBattle();
          }
        }}
      />

      {isSettingMode && (
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Button
            text={type === 'SENT' ? '신청 취소' : '요청 수락'}
            disabled={checkedApply === undefined}
            onPress={handleSettingConfirmButton}
          />
        </View>
      )}

      <Modal
        visible={settingModalInfo.visible}
        title={settingModalInfo.title}
        subTitle={settingModalInfo.subTitle}
        handleCancel={handleCancelModal}
        handleConfirm={handleConfirmModal}
      />
    </SafeAreaView>
  );
};
