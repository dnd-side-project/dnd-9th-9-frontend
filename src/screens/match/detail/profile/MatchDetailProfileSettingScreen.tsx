import React, {useState} from 'react';

import styled from '@emotion/native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import Toast from 'react-native-simple-toast';

import {theme} from '../../../../assets/styles/theme';
import {Line} from '../../../../components/Line';
import {Modal} from '../../../../components/Modal';
import {Text} from '../../../../components/Text';
import {MatchDetailProfileSettingMenuItem} from '../../../../features/match/components/MatchDetailProfile';
import {useGetFieldDetail} from '../../../../features/match/hooks/field';
import {useDeleteField} from '../../../../features/match/hooks/field/useDeleteField';
import {type MatchStackParamList} from '../../../../navigators';

type TMatchDetailProfileSettingRouteProps = RouteProp<
  MatchStackParamList,
  'MatchDetailProfileSetting'
>;

export const MatchDetailProfileSettingScreen = (): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const router = useRoute<TMatchDetailProfileSettingRouteProps>();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const {mutate: deleteField} = useDeleteField({
    onSuccessCallback: () => {
      Toast.show('팀을 삭제하였습니다.', Toast.SHORT, {
        backgroundColor: '#000000c5',
      });
      navigation.navigate('MatchList', {
        page: 0,
        size: 10,
        fieldType: 'DUEL',
        goal: [],
        memberCount: null,
        period: [],
        skillLevel: [],
        strength: [],
        keyword: '',
      });
    },
    onErrorCallback: error => {
      Toast.show(
        error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.',
        Toast.SHORT,
        {
          backgroundColor: '#000000c5',
        },
      );
    },
  });

  const {data: fieldDetailData} = useGetFieldDetail({
    id: router?.params?.id,
  });

  // TODO: Error 처리
  if (fieldDetailData === undefined) return <></>;

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.palette['gray-0'],
        height: '100%',
      }}>
      <StyledHeaderWrapper>
        <Text type="head3" fontWeight="700" text="팀" />
      </StyledHeaderWrapper>

      <MatchDetailProfileSettingMenuItem
        title="팀 정보 수정"
        description="운동난이도, 레벨, 기간, 팀 인원수 등을 수정할 수 있어요."
        onPressHeader={() => {
          navigation.navigate('UpdateInformation', {
            id: fieldDetailData?.fieldDto?.id,
            fieldType: fieldDetailData?.fieldDto?.fieldType,
            maxSize: fieldDetailData?.fieldDto?.maxSize,
            period: fieldDetailData?.fieldDto?.period,
            goal: fieldDetailData?.fieldDto?.goal,
            skillLevel: fieldDetailData?.fieldDto?.skillLevel,
            strength: fieldDetailData?.fieldDto?.strength,
          });
        }}
      />
      <Line size="lg" />
      <MatchDetailProfileSettingMenuItem
        title="팀 프로필 수정"
        description="팀 이름, 규칙, 공개범위 등을 수정할 수 있어요."
        onPressHeader={() => {
          navigation.navigate('UpdateProfile', {
            id: fieldDetailData?.fieldDto?.id,
            profileImg: fieldDetailData?.fieldDto?.profileImg,
            name: fieldDetailData?.fieldDto?.name,
            description: fieldDetailData?.fieldDto?.description,
            rule: fieldDetailData?.fieldDto?.rule,
          });
        }}
      />
      <Line size="lg" />
      <MatchDetailProfileSettingMenuItem
        title="팀 삭제"
        description="매칭이 중단되고, 모든 기록이 삭제돼요."
        onPressHeader={() => {
          setIsModalVisible(true);
        }}
      />

      <Modal
        visible={isModalVisible}
        title="팀을 삭제하시겠어요?"
        subTitle="매칭이 중단되고, 모든 기록이 삭제 됩니다."
        handleCancel={() => {
          setIsModalVisible(false);
        }}
        handleConfirm={() => {
          deleteField({id: router.params.id});
        }}
      />
    </SafeAreaView>
  );
};

const StyledHeaderWrapper = styled.View`
  padding: 30px 16px 0 16px;
`;
