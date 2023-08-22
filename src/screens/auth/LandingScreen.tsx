import React, {useEffect, useState} from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../assets/styles/theme';
import {AlarmItem} from '../../components/Alarm';
import {BottomSheet} from '../../components/BottomSheet';
import {Button, FilterButton, NavigateButton} from '../../components/Button';
import {Gap} from '../../components/Gap';
import {ListItem} from '../../components/List';
import {Modal} from '../../components/Modal';
import {Ranking} from '../../components/Ranking';
import {Searching} from '../../components/Searching';
import {Text} from '../../components/Text';
import {WeeklyCalendar} from '../../components/WeeklyCalendar/WeeklyCalendar';
import {type RootStackParamList} from '../../navigators';
import useStore from '../../store/client/useStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props): React.JSX.Element {
  const {counter, increase, decrease} = useStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch] = useState('');

  const [tabModalVisible, setTabModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('search api logic', search);
  }, [search]);

  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        <Text text="TITLE TEST 1" type="head1" />
        <Text text="TITLE TEST 2" type="head2" />
        <Text text="TITLE TEST 3" type="head3" />
        <Button
          text="로그인"
          size="sm"
          onPress={() => {
            navigation.push('Login');
          }}
        />
        <Button
          disabled
          text="회원가입"
          size="md"
          onPress={() => {
            navigation.push('Signup');
          }}
        />

        <Text text="Store TEST " type="head1" />
        <Text text={`${counter} ♪`} type="head2" />
        <Button text="증가" onPress={increase} />
        <Button text="감소" onPress={decrease} />
        <WeeklyCalendar />
        <Text text="Store TEST " type="head1" />
        <Text text={`${counter} ♪`} type="head2" />
        <Button text="증가" onPress={increase} />

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
          handleCancel={() => {
            setIsOpenModal(false);
          }}
          handleConfirm={() => {
            setIsOpenModal(false);
          }}
        />

        {/* <ConfirmModal
        visible={isOpenModal}
        title={`입력하신 메일로\n인증번호가 발송되었어요.`}
        subTitle="메일 확인 후, 인증번호를 입력해주세요."
        handleConfirm={() => setIsOpenModal(false)}
      /> */}

        <Button
          text="모달 열기"
          onPress={() => {
            setIsOpenModal(true);
          }}
        />

        <Gap size="10px" />

        <Searching
          placeholder="닉네임, 매칭 제목을 검색해주세요."
          handleSearch={setSearch}
        />

        <Gap size="10px" />

        <FilterButton
          isActive={false}
          onPress={() => {
            console.log('필터 선택 screen으로 이동');
          }}
        />
        <FilterButton
          isActive={true}
          onPress={() => {
            console.log('필터 선택 screen으로 이동');
          }}
        />

        <Ranking infos={['XXX kcal', 'XXX kcal', 'XXX kcal']} />

        <AlarmItem
          alarmType="team"
          message="[name]이 팀원신청을 했어요."
          time="2023-08-10 21:32:00"
        />
        <AlarmItem
          alarmType="member"
          message="[name]이 운동을 기록하였어요."
          time="2023-08-09 13:32:00"
        />
        <AlarmItem
          alarmType="matching"
          message="[name]이 매칭을 신청했어요."
          time="2023-08-01 16:32:00"
        />

        <ScrollView horizontal>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 30,
              gap: 12,
            }}>
            <NavigateButton text="오늘 하루 요약" onPress={() => '화면이동'} />
            <NavigateButton
              text="상대팀 진행 현황"
              onPress={() => '화면이동'}
            />
          </View>
        </ScrollView>

        <Button
          text="바텀 모달 열기"
          onPress={() => {
            setModalVisible(true);
          }}
        />

        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <View style={{height: 100}}>
            <Text text="기본 컨텐츠" />
          </View>
        </BottomSheet>

        <Button
          text="바텀 탭 모달 열기"
          onPress={() => {
            setTabModalVisible(true);
          }}
        />

        <BottomSheet
          modalVisible={tabModalVisible}
          setModalVisible={setTabModalVisible}
          defaultSelectedId="name">
          <BottomSheet.TabList>
            <BottomSheet.Tab id="name" title="이름" />
            <BottomSheet.Tab id="age" title="나이" />
          </BottomSheet.TabList>

          <BottomSheet.Content id="name">
            <View style={{height: 100}}>
              <Text text="이름 컨텐츠" />
            </View>
          </BottomSheet.Content>
          <BottomSheet.Content id="age">
            <View style={{height: 100}}>
              <Text text="나이 컨텐츠" />
            </View>
          </BottomSheet.Content>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
}
