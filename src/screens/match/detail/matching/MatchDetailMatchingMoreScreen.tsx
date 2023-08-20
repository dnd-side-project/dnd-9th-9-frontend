import React, {useState} from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Modal} from '../../../../components/Modal';
import {MatchApplyList} from '../../../../features/match/components/MatchDetailMatching';
import {
  APPLY_DUMMY_DATA,
  SENT_DUMMY_DATA,
  useGetFieldDetailEntryBattle,
} from '../../../../features/match/hooks/field/useGetFieldDetailEntryBattle';
import {type MatchStackParamList} from '../../../../navigators';
import useStore from '../../../../store/client/useStore';

type TMatchDetailMatchingMoreScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchDetailMatchingMore'
>;

export const MatchDetailMatchingMoreScreen = ({
  navigation,
}: TMatchDetailMatchingMoreScreenProps): React.JSX.Element => {
  const selectMatchId = 1;

  const [settingModalInfo, setSettingModalInfo] = useState({
    visible: false,
    title: '',
    subTitle: '',
  });
  const {moreMatchingType} = useStore();

  const DUMMY_DATA =
    moreMatchingType === 'SENT' ? SENT_DUMMY_DATA : APPLY_DUMMY_DATA;

  const {data = DUMMY_DATA} = useGetFieldDetailEntryBattle({
    id: selectMatchId,
    fieldDirection: moreMatchingType,
  });

  const handleSettingConfirmButton = (): void => {
    if (moreMatchingType === 'SENT') {
      setSettingModalInfo({
        visible: true,
        title: '선택한 매칭을 삭제할까요?',
        subTitle: '선택한 매칭은 목록에서 제거됩니다.',
      });
    } else if (moreMatchingType === 'RECEIVED') {
      // TODO: 제거/수락 모드에 따라 모달 내용 변경
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <MatchApplyList
        isSummary={false}
        totalCount={data.totalCount}
        applies={data.fieldEntriesInfos}
        type={moreMatchingType}
        handleSettingConfirmButton={handleSettingConfirmButton}
      />

      <Modal
        visible={settingModalInfo.visible}
        title={settingModalInfo.title}
        subTitle={settingModalInfo.subTitle}
        handleCancel={handleCancelModal}
        // TODO: 신청한 매칭 취소 or 요청받은 매칭 제거 or 요청받은 매칭 수락 API 연동
        handleConfirm={() => {}}
      />
    </SafeAreaView>
  );
};