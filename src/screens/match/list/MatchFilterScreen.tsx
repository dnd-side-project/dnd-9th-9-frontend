import React, {useState} from 'react';

import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {Button} from '../../../components/Button';
import {Count} from '../../../components/Count';
import {Gap} from '../../../components/Gap';
import {
  MatchFilterItem,
  MatchFilterSelect,
} from '../../../features/match/components/MatchFilter';
import {
  Goals,
  Periods,
  SkillLevels,
  Strengths,
} from '../../../features/match/const';
import {type IFieldListParams} from '../../../features/match/types';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

type TMatchFilterScreenProps = NativeStackScreenProps<
  MatchStackParamList,
  'MatchFilter'
>;

interface IMatchFilterParams extends IFieldListParams {
  memberCountCheckBox: boolean;
}

export const MatchFilterScreen = ({
  navigation,
  route,
}: TMatchFilterScreenProps): React.JSX.Element => {
  const {fieldType, goal, memberCount, period, skillLevel, strength} =
    route.params;

  const [matchFilterParams, setMatchFilterParams] =
    useState<IMatchFilterParams>({
      fieldType,
      goal: goal ?? [],
      memberCountCheckBox: !!(memberCount != null && memberCount >= 2),
      memberCount,
      period: period ?? [],
      skillLevel: skillLevel ?? [],
      strength: strength ?? [],
      keyword: '',
    });

  const periodKeys = Object.keys(Periods) as Array<keyof typeof Periods>;
  const skillLevelKeys = Object.keys(SkillLevels) as Array<
    keyof typeof SkillLevels
  >;
  const strengthKeys = Object.keys(Strengths) as Array<keyof typeof Strengths>;
  const goalKeys = Object.keys(Goals) as Array<keyof typeof Goals>;

  const handleMemberCount = (type: 'minus' | 'plus'): void => {
    if (matchFilterParams.memberCount === null) return;

    setMatchFilterParams(prev => {
      const {fieldType, memberCount} = prev;
      if (fieldType === 'DUEL' || memberCount === null) return {...prev};
      return {
        ...prev,
        memberCount: type === 'minus' ? memberCount - 1 : memberCount + 1,
      };
    });
  };

  /** filter에 대한 아이템을 선택할 때 실행하는 함수 */
  const handleFilterSelectIcon = (
    key: 'goal' | 'period' | 'skillLevel' | 'strength',
    value: any,
  ): void => {
    if (matchFilterParams[key].includes(value)) {
      // 이미 포함된 경우, 제외
      const filteredValue = matchFilterParams[key].filter(
        item => item !== value,
      );
      setMatchFilterParams(prev => {
        return {...prev, [key]: filteredValue};
      });
    } else {
      // 포함되지 않은 경우, 추가
      setMatchFilterParams(prev => {
        return {...prev, [key]: [...prev[key], value]};
      });
    }
  };

  /** filter에 대한 체크박스를 선택할 때 실행하는 함수 */
  const handleFilterCheckbox = (
    key: 'memberCount' | 'goal' | 'period' | 'skillLevel' | 'strength',
  ): void => {
    const {period, goal, skillLevel, strength} = matchFilterParams;
    if (key === 'memberCount') {
      setMatchFilterParams(prev => {
        return {
          ...prev,
          memberCount: fieldType === 'DUEL' ? 1 : 2,
          memberCountCheckBox: !prev.memberCountCheckBox,
        };
      });
    } else if (key === 'period') {
      setMatchFilterParams(prev => {
        return {
          ...prev,
          [key]: period.length !== 0 ? [] : [periodKeys[0]],
        };
      });
    } else if (key === 'goal') {
      setMatchFilterParams(prev => {
        return {...prev, [key]: goal.length !== 0 ? [] : [goalKeys[0]]};
      });
    } else if (key === 'skillLevel') {
      setMatchFilterParams(prev => {
        return {
          ...prev,
          [key]: skillLevel.length !== 0 ? [] : [skillLevelKeys[0]],
        };
      });
    } else if (key === 'strength') {
      setMatchFilterParams(prev => {
        return {
          ...prev,
          [key]: strength.length !== 0 ? [] : [strengthKeys[0]],
        };
      });
    }
  };

  /** filter를 초기화 하는 함수 */
  // const handleResetFilter = (): void => {
  //   // TODO: 추후 상단바 컴포넌트 작업 완료시 연동
  //   setMatchFilterParams(prev => {
  //     return {
  //       ...prev,
  //       goal: [],
  //       memberCountCheckBox: false,
  //       memberCount: null,
  //       period: [],
  //       skillLevel: [],
  //       strength: [],
  //     };
  //   });
  // };

  const minusDisabled =
    fieldType === 'DUEL' || matchFilterParams.memberCount === 2;

  const plusDisabled =
    fieldType === 'DUEL' || matchFilterParams.memberCount === 10;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        {fieldType !== 'DUEL' && (
          <MatchFilterItem
            filterKey="memberCount"
            isCheck={matchFilterParams.memberCountCheckBox}
            label="팀 인원수"
            onPressCheckBox={handleFilterCheckbox}>
            {matchFilterParams?.memberCountCheckBox ? (
              <>
                <Gap size="4px" />
                <Count
                  count={matchFilterParams.memberCount}
                  minusDisabled={minusDisabled}
                  plusDisabled={plusDisabled}
                  disabled={false}
                  handleMinus={() => {
                    handleMemberCount('minus');
                  }}
                  handlePlus={() => {
                    handleMemberCount('plus');
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </MatchFilterItem>
        )}

        <MatchFilterItem
          filterKey="skillLevel"
          isCheck={matchFilterParams.skillLevel.length > 0}
          label="운동레벨"
          onPressCheckBox={handleFilterCheckbox}>
          <MatchFilterSelect
            filterKey="skillLevel"
            filterParams={matchFilterParams}
            keys={skillLevelKeys}
            values={SkillLevels}
            onPressSelectItem={handleFilterSelectIcon}
          />
        </MatchFilterItem>
        <MatchFilterItem
          filterKey="strength"
          isCheck={matchFilterParams.strength.length > 0}
          label="운동강도"
          onPressCheckBox={handleFilterCheckbox}>
          <MatchFilterSelect
            filterParams={matchFilterParams}
            filterKey="strength"
            keys={strengthKeys}
            values={Strengths}
            onPressSelectItem={handleFilterSelectIcon}
          />
        </MatchFilterItem>
        <MatchFilterItem
          filterKey="period"
          isCheck={matchFilterParams.period.length > 0}
          label="진행기간"
          onPressCheckBox={handleFilterCheckbox}>
          <MatchFilterSelect
            filterParams={matchFilterParams}
            filterKey="period"
            keys={periodKeys}
            values={Periods}
            onPressSelectItem={handleFilterSelectIcon}
          />
        </MatchFilterItem>
        <MatchFilterItem
          filterKey="goal"
          isCheck={matchFilterParams.goal.length > 0}
          label="카테고리"
          onPressCheckBox={handleFilterCheckbox}>
          <MatchFilterSelect
            filterParams={matchFilterParams}
            filterKey="goal"
            keys={goalKeys}
            values={Goals}
            onPressSelectItem={handleFilterSelectIcon}
          />
        </MatchFilterItem>
        <Gap size="72px" />
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          text="선택 완료"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'MatchList',
                  params: {
                    ...matchFilterParams,
                    memberCount: matchFilterParams.memberCountCheckBox
                      ? matchFilterParams.memberCount
                      : null,
                  },
                },
              ],
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
