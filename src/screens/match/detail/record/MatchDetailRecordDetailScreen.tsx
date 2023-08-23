import React from 'react';

import styled from '@emotion/native';
import {type RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {lockXmlData} from '../../../../assets/svg';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {RecordDetailInformationItem} from '../../../../features/match/components/MatchDetailRecord';
import {WORKOUT_ACTIVITIES} from '../../../../lib/AppleHealthKit';
import {dayjs} from '../../../../lib/dayjs';
import {type MatchStackParamList} from '../../../../navigators';

type TMatchDetailScreenRouteProps = RouteProp<
  MatchStackParamList,
  'MatchDetailRecordDetail'
>;

export const MatchDetailRecordDetailScreen = (): React.JSX.Element => {
  const route = useRoute<TMatchDetailScreenRouteProps>();
  const {
    burnedCalorie,
    durationMinute,
    exerciseDateTime,
    isLeader,
    isMemoPublic,
    memoContent,
    memoImg,
    name,
    profileImg,
    sports,
  } = route.params;

  const durationHours = Math.floor(durationMinute / 60);
  const durationRemainMinutes = durationMinute % 60;

  const formattedExerciseDateTime = dayjs(exerciseDateTime).format('HH:mm');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.palette['gray-0'],
      }}>
      <ScrollView>
        <StyledSectionWrapper>
          <StyledFlexSection style={{justifyContent: 'space-between'}}>
            <StyledFlexSection>
              <StyledProfile style={{marginRight: 10}} />
              <View>
                <Text
                  type="body1"
                  color="gray-600"
                  fontWeight="600"
                  text={isLeader ? '방장' : '팀원'}
                />
                <Gap size="2px" />
                <Text
                  type="body1"
                  color="gray-950"
                  fontWeight="600"
                  text={name}
                />
              </View>
            </StyledFlexSection>
            <Text
              type="body2"
              color="gray-600"
              fontWeight="400"
              text={formattedExerciseDateTime}
            />
          </StyledFlexSection>
        </StyledSectionWrapper>

        <Line size="lg" />

        <StyledSectionWrapper>
          {/* TODO: 상수로 변경 */}
          <RecordDetailInformationItem
            label="운동 종류"
            value={WORKOUT_ACTIVITIES[sports].label}
          />
          <Gap size="42px" />
          <RecordDetailInformationItem
            label="운동 시간"
            value={`${durationHours}시간 ${durationRemainMinutes}분`}
          />
          <Gap size="42px" />
          <RecordDetailInformationItem
            label="예상 소비 칼로리"
            value={`${burnedCalorie}kcal`}
          />
          <Gap size="37px" />
        </StyledSectionWrapper>

        <Line size="lg" />

        <StyledSectionWrapper>
          <Text type="head3" fontWeight="600" text="메모" />
          {profileImg.length > 0 && isMemoPublic && (
            <>
              <Gap size="24px" />
              <StyledMemoSection>
                {/* TODO: img 연동 */}
                <Text type="body2" fontWeight="400" text={memoImg} />
              </StyledMemoSection>
            </>
          )}

          {isMemoPublic ? (
            <>
              <Gap size="24px" />
              <StyledMemoSection style={{padding: 20}}>
                <Text type="body2" fontWeight="400" text={memoContent} />
              </StyledMemoSection>
            </>
          ) : (
            <>
              <Gap size="24px" />
              <StyledMemoSection
                style={{alignItems: 'center', paddingVertical: 56}}>
                <Icon color={theme.palette['gray-400']} svgXml={lockXmlData} />
                <Text
                  type="body2"
                  color="gray-400"
                  fontWeight="400"
                  text="비공개 입니다."
                />
              </StyledMemoSection>
            </>
          )}
        </StyledSectionWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledSectionWrapper = styled.View`
  padding: 20px 16px;
`;

const StyledProfile = styled.View`
  width: 58px;
  height: 58px;
  border-radius: 50px;
  background-color: ${props => props.theme.palette['gray-200']};
`;

const StyledFlexSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledMemoSection = styled.View`
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.palette['gray-50']};
`;
