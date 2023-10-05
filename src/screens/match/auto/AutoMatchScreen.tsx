import React, {useState} from 'react';

import styled from '@emotion/native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {informationXmlData} from '../../../assets/svg';
import {BottomSheet} from '../../../components/BottomSheet';
import {CheckBox} from '../../../components/CheckBox';
import {Gap} from '../../../components/Gap';
import {Icon} from '../../../components/Icon';
import {Text} from '../../../components/Text';
import {type MatchStackParamList} from '../../../navigators';

export const AutoMatchScreen = (): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [checkedItem, setCheckedItem] = useState('');

  const handleMatchType = (type: 'DUEL' | 'TEAM_BATTLE'): void => {
    if (type === 'DUEL') {
      // TODO (@chajuhui123): DUEL 매칭에 속하지 않은 경우 모달 return
      setCheckedItem('DUEL');
      navigation.navigate('AutoMatchResult', {fieldType: 'DUEL'});
    } else if (type === 'TEAM_BATTLE') {
      // TODO (@chajuhui123): TEAM_BATTLE 매칭에 속하지 않은  모달 return
      setCheckedItem('TEAM_BATTLE');
      navigation.navigate('AutoMatchResult', {fieldType: 'TEAM_BATTLE'});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setCheckedItem('');
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <StyledHeaderWrapper>
        <Text type="head3" fontWeight="700" text="자동 매칭" />
        <TouchableOpacity
          onPress={() => {
            setIsBottomSheetOpen(true);
          }}>
          <Icon width={44} height={44} svgXml={informationXmlData} />
        </TouchableOpacity>
      </StyledHeaderWrapper>
      <StyledSectionWrapper>
        <CheckBox
          isCheck={checkedItem === 'DUEL'}
          label="1vs1 매칭"
          onPress={() => {
            handleMatchType('DUEL');
          }}
        />
        <Gap size="42px" />
        <CheckBox
          isCheck={checkedItem === 'TEAM_BATTLE'}
          label="팀vs팀 매칭"
          onPress={() => {
            handleMatchType('TEAM_BATTLE');
          }}
        />
      </StyledSectionWrapper>

      <BottomSheet
        isOpened={isBottomSheetOpen}
        onOpen={() => {
          setIsBottomSheetOpen(true);
        }}
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}>
        <View>
          <Text
            type="body1"
            fontWeight="700"
            text="Q. 자동 매칭이 무엇인가요?"
          />
          <Gap size="28px" />
          <Text
            type="body2"
            color="gray-700"
            fontWeight="400"
            text={`내가 매칭을 만들때 선택한 조건과\n최대한 비슷한 상대, 상대팀을 찾아주는 기능이에요.`}
          />
          <Gap size="15px" />
          <Text
            type="body2"
            color="gray-700"
            fontWeight="400"
            text={`따라서 먼저 매칭을 만들어야\n1vs1, 팀vs팀 자동매칭을 선택할 수 있어요.`}
          />
          <Gap size="30px" />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const StyledHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 12px 57px 26px;
  align-items: center;
`;

const StyledSectionWrapper = styled.View`
  padding: 0px 16px;
`;
