import React, {useState} from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';

import {theme} from '../../../assets/styles/theme';
import {Button} from '../../../components/Button';
import {Line} from '../../../components/Line';
import {ConfirmModal} from '../../../components/Modal';
import {
  MatchDetailProfileSection,
  MatchDetailMembers,
} from '../../../features/match/components/MatchDetailProfile';
import {
  usePostFieldEntryBattle,
  usePostFieldEntryTeam,
} from '../../../features/match/hooks/fieldEntry';
import {useGetUserFieldList} from '../../../features/match/hooks/userField';
import {type IFieldDetailInfo} from '../../../features/match/types';

interface IMatchDetailProfileScreenProps {
  fieldDetailData: IFieldDetailInfo;
}

export const MatchDetailProfileScreen = ({
  fieldDetailData,
}: IMatchDetailProfileScreenProps): React.JSX.Element => {
  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const {id, fieldType, fieldStatus, fieldRole, maxSize, currentSize} =
    fieldDetailData?.fieldDto;

  const {data: userListData} = useGetUserFieldList({id});

  const {mutate: mutateFieldEntryTeam} = usePostFieldEntryTeam({
    onSuccessCallback: () => {
      Toast.show('팀원 신청이 완료되었습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
    },
    onErrorCallback: error => {
      setModalInfo({
        isVisible: true,
        title: error?.response?.data?.message ?? '오류가 발생하였습니다',
        subTitle: '다시 한 번 확인해주세요.',
      });
    },
  });

  const {mutate: mutateFieldEntryBattle} = usePostFieldEntryBattle({
    onSuccessCallback: () => {
      Toast.show('매칭 신청이 완료되었습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
    },
    onErrorCallback: error => {
      setModalInfo({
        isVisible: true,
        title: error?.response?.data?.message ?? '오류가 발생하였습니다',
        subTitle: '다시 한 번 확인해주세요.',
      });
    },
  });

  const isAbleApplyMatchMember =
    fieldType !== 'DUEL' &&
    fieldStatus === 'RECRUITING' &&
    maxSize !== currentSize &&
    fieldRole === 'GUEST';

  const isAbleApplyMatching =
    fieldType !== 'TEAM' &&
    fieldStatus === 'RECRUITING' &&
    fieldDetailData?.assignedFieldDto === null &&
    maxSize === currentSize &&
    fieldRole === 'GUEST';

  const handleApplyMember = (): void => {
    const body = {targetFieldId: id, teamType: fieldType};
    mutateFieldEntryTeam({body});
  };

  const handleApplyMatching = (): void => {
    const body = {targetFieldId: id, battleType: fieldType};
    mutateFieldEntryBattle({body});
  };

  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        <MatchDetailProfileSection detailInfo={fieldDetailData} />
        <Line size="lg" />
        <MatchDetailMembers
          currentSize={fieldDetailData?.fieldDto?.currentSize ?? 0}
          maxSize={fieldDetailData?.fieldDto?.maxSize ?? 0}
          members={userListData}
        />
      </ScrollView>

      {isAbleApplyMatchMember && (
        <Button text="팀원신청" onPress={handleApplyMember} />
      )}
      {isAbleApplyMatching && (
        <Button text="매칭신청" onPress={handleApplyMatching} />
      )}

      <ConfirmModal
        visible={modalInfo.isVisible}
        title={modalInfo.title}
        subTitle={modalInfo.subTitle}
        handleConfirm={() => {
          setModalInfo({isVisible: false, title: '', subTitle: ''});
        }}
      />
    </SafeAreaView>
  );
};
