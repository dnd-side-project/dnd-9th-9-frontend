import React, {useEffect} from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Gap} from '../../../components/Gap';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {TeamworkRateHistoryCard} from '../../../features/my/components/teamworkRate';
import {useGetTeamworkRateHistory} from '../../../features/my/hooks/teamworkRate';
import {type ITeamworkRateHistory} from '../../../features/my/types';
import {dayjs} from '../../../lib/dayjs';
import {type MyStackParamList} from '../../../navigators/MyNavigator';

type Props = NativeStackScreenProps<MyStackParamList, 'TeamworkRateHistory'>;

export const TeamworkRateHistory = ({navigation}: Props): React.JSX.Element => {
  // const dummy: ITeamworkRateHistory[] = [
  //   {
  //     endDate: '2023-12-15',
  //     fieldType: 'DUEL',
  //     myFieldName: 'string',
  //     opponentName: '김마르',
  //     period: 'ONE_WEEK',
  //     teamworkRate: 4,
  //     winStatus: 'WIN',
  //   },
  //   {
  //     endDate: '2023-12-15',
  //     fieldType: 'TEAM_BATTLE',
  //     myFieldName: '작심삼년',
  //     opponentName: '가보자고',
  //     period: 'ONE_WEEK',
  //     teamworkRate: 3,
  //     winStatus: 'DRAW',
  //   },
  //   {
  //     endDate: '2023-12-14',
  //     fieldType: 'TEAM_BATTLE',
  //     myFieldName: '작심삼년',
  //     opponentName: '가보자고',
  //     period: 'ONE_WEEK',
  //     teamworkRate: 2,
  //     winStatus: 'LOSE',
  //   },
  //   {
  //     endDate: '2023-12-13',
  //     fieldType: 'TEAM',
  //     myFieldName: '작심삼년',
  //     opponentName: '가보자고',
  //     period: 'ONE_WEEK',
  //     teamworkRate: 1,
  //     winStatus: 'DRAW',
  //   },
  // ];

  const {data} = useGetTeamworkRateHistory({
    fieldType: 'DUEL',
    page: 0,
    size: 10,
  });

  const histories =
    data?.pages.flatMap(page => page.teamworkRateHistoryDtos) ?? [];

  const renderItem = ({
    item,
    index,
  }: {
    item: ITeamworkRateHistory;
    index: number;
  }): React.JSX.Element => {
    const isDateLabelVisible =
      index === 0 || item.endDate !== histories[index - 1].endDate;
    return (
      <>
        {isDateLabelVisible && (
          <>
            <Gap size="16px" />
            <Text
              text={dayjs(item.endDate).format('MM월 DD일')}
              color="gray-400"
            />
            <Gap size="8px" />
          </>
        )}
        <TeamworkRateHistoryCard teamworkRateHistory={item} />
        <Gap size="12px" />
      </>
    );
  };

  // TODO: 공통 hook 으로 분리
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          paddingHorizontal: 16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderWidth: 1,
          borderColor: theme.palette['gray-50'],
          position: 'absolute',
        },
        tabBarVisible: true,
      });
  }, [navigation]);

  return (
    <>
      <>
        <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
        <TopBar showBackButton headerText="불꽃 히스토리" />
        <StyledTabContainer>
          <TouchableOpacity>
            <Text text="전쳬보기" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="1:1 매칭" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="팀 매칭" type="body3" color="gray-400" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text text="매칭 없는 팀" type="body3" color="gray-400" />
          </TouchableOpacity>
        </StyledTabContainer>

        <StyledScrollView>
          <StyledCardContainer>
            {histories.length > 0 ? (
              <FlatList
                data={histories}
                renderItem={renderItem}
                // TODO(@minimalKim): history item id 프로퍼티 백엔드에 추가 요청
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{padding: 20}}
                ListFooterComponent={
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <StyledMoreButton
                      onPress={() => {
                        // TODO(@minimalKim): 추가 로드
                      }}>
                      <Text
                        text="더보기"
                        type="body3"
                        fontWeight="600"
                        color="gray-600"
                      />
                    </StyledMoreButton>
                    <View style={{height: 150}} />
                  </View>
                }
              />
            ) : (
              <StyledNoContentsWrapper>
                <Text
                  type="body2"
                  color="gray-400"
                  fontWeight="600"
                  text="내역이 존재하지 않습니다."
                />
              </StyledNoContentsWrapper>
            )}
          </StyledCardContainer>
        </StyledScrollView>
      </>
    </>
  );
};

const StyledTabContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 16px;
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledScrollView = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
`;

const StyledCardContainer = styled.View`
  display: flex;
`;

const StyledMoreButton = styled.TouchableOpacity`
  border-radius: 16px;
  background-color: ${({theme}) => theme.palette['gray-100']};
  padding: 16px 60px;
  margin: 20px 0;
`;

const StyledNoContentsWrapper = styled.View`
  margin: 40px auto 30px auto;
  height: 100%;
`;
