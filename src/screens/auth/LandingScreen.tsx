import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useStore from '../../store/client/useStore';
import {Text} from '../../components/Text';
import {Button} from '../../components/Button';
import {ListItem} from '../../components/List';
import {RootStackParamList} from '../../navigators';
import {WeeklyCalendar} from '../../components/WeeklyCalendar/WeeklyCalendar';
import {ConfirmModal, Modal} from '../../components/Modal';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props) {
  const {counter, increase, decrease} = useStore();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <SafeAreaView>
      <Text text="TITLE TEST 1" type="head1" />
      <Text text="TITLE TEST 2" type="head2" />
      <Text text="TITLE TEST 3" type="head3" />
      <Button
        text="로그인"
        size="sm"
        onPress={() => navigation.push('Login')}
      />
      <Button
        disabled
        text="회원가입"
        size="md"
        onPress={() => navigation.push('Signup')}
      />

      <Text text="Store TEST " type="head1" />
      <Text text={`${counter} ♪`} type="head2" />
      <Button text="증가" onPress={increase} />
      <Button text="감소" onPress={decrease} />
      <WeeklyCalendar />

      <ListItem
        title="테스트"
        level="고수"
        matchingType="1vs1"
        period={1}
        currentMember={3}
        maximumMember={10}
        isFinish
      />

      <Modal
        visible={isOpenModal}
        title={`애플 건강앱과\n연동을 진행하시겠어요?`}
        subTitle="연동하면 운동 데이터를 가져올 수 있어요"
        handleCancel={() => setIsOpenModal(false)}
        handleConfirm={() => setIsOpenModal(false)}
      />

      {/* <ConfirmModal
        visible={isOpenModal}
        title={`입력하신 메일로\n인증번호가 발송되었어요.`}
        subTitle="메일 확인 후, 인증번호를 입력해주세요."
        handleConfirm={() => setIsOpenModal(false)}
      /> */}
      <Button text="모달 열기" onPress={() => setIsOpenModal(true)} />
    </SafeAreaView>
  );
}
