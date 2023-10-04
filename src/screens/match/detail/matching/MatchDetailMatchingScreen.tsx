import React from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {arrowRightXmlData} from '../../../../assets/svg';
import {Icon} from '../../../../components/Icon';
import {Line} from '../../../../components/Line';
import {ListItem} from '../../../../components/List';
import {Text} from '../../../../components/Text';
import {
  MatchApplyList,
  MatchApplyHeader,
} from '../../../../features/match/components/MatchDetailMatching';
import {useGetInfiniteFieldEntryBattleDetail} from '../../../../features/match/hooks/fieldEntry';
import {type TUserRole, type IField} from '../../../../features/match/types';
import {type MatchStackParamList} from '../../../../navigators/MatchNavigator';

interface IMatchDetailMatchingScreenProps {
  id: number;
  assignedField: IField;
  userRole: TUserRole;
}

export const MatchDetailMatchingScreen = ({
  id,
  assignedField,
  userRole,
}: IMatchDetailMatchingScreenProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const {
    data: sentFieldEntryBattleData,
    isLoading: isLoadingSentFieldEntryBattle,
  } = useGetInfiniteFieldEntryBattleDetail({
    id,
    page: 0,
    size: 3,
    fieldDirection: 'SENT',
  });

  const {
    data: receivedFieldEntryBattleData,
    isLoading: isLoadingReceivedFieldEntryBattle,
  } = useGetInfiniteFieldEntryBattleDetail({
    id,
    page: 0,
    size: 3,
    fieldDirection: 'RECEIVED',
  });

  if (isLoadingSentFieldEntryBattle || isLoadingReceivedFieldEntryBattle)
    return <></>;

  const sentFieldLength =
    sentFieldEntryBattleData?.pages != null
      ? sentFieldEntryBattleData?.pages[0]?.totalCount
      : 0;

  const receivedFieldLength =
    receivedFieldEntryBattleData?.pages != null
      ? receivedFieldEntryBattleData?.pages[0]?.totalCount
      : 0;

  const handleMoreMatch = (type: 'SENT' | 'RECEIVED'): void => {
    navigation.navigate('MatchDetailMatchingMore', {id, type, userRole});
  };

  const handleTeamDetail = (matchId: number): void => {
    navigation.push('MatchDetail', {id: matchId});
  };

  return (
    <SafeAreaView
      style={{backgroundColor: theme.palette['gray-0'], height: '100%'}}>
      <ScrollView>
        {assignedField !== null ? (
          <>
            <MatchApplyHeader type="MATCHED" />
            <ListItem {...assignedField} />
          </>
        ) : (
          <>
            <MatchApplyHeader
              type="SENT"
              settingIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleMoreMatch('SENT');
                  }}>
                  <Icon svgXml={arrowRightXmlData} width={44} height={44} />
                </TouchableOpacity>
              }
            />
            <MatchApplyList
              type="SENT"
              fieldEntryBattleData={sentFieldEntryBattleData}
              onPressTeamDetail={handleTeamDetail}
            />
            {sentFieldLength > 3 && (
              <StyledButton
                onPress={() => {
                  handleMoreMatch('SENT');
                }}>
                <Text
                  type="body2"
                  color="gray-600"
                  fontWeight="400"
                  text="더보기"
                />
              </StyledButton>
            )}

            <Line size="lg" />

            <MatchApplyHeader
              type="RECEIVED"
              settingIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleMoreMatch('RECEIVED');
                  }}>
                  <Icon svgXml={arrowRightXmlData} width={44} height={44} />
                </TouchableOpacity>
              }
            />
            <MatchApplyList
              type="RECEIVED"
              fieldEntryBattleData={receivedFieldEntryBattleData}
              onPressTeamDetail={handleTeamDetail}
            />
            {receivedFieldLength > 3 && (
              <StyledButton
                onPress={() => {
                  handleMoreMatch('RECEIVED');
                }}>
                <Text
                  type="body2"
                  color="gray-600"
                  fontWeight="400"
                  text="더보기"
                />
              </StyledButton>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  margin: auto;
  color: ${props => props.theme.palette['gray-600']};
  background-color: ${props => props.theme.palette['gray-50']};
  margin: 10px 17px 30px 17px;
  padding: 27px 0px;
`;
