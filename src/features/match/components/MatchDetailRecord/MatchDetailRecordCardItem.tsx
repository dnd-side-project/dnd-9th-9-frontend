import React from 'react';

import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {heartXmlData} from '../../../../assets/svg';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Tags} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {dayjs} from '../../../../lib/dayjs';
import {type IMatchDetailRecord} from '../../types';

interface IMatchDetailRecordCardItemProps extends IMatchDetailRecord {
  onPressCardItem: (value: IMatchDetailRecord) => void;
}

export const MatchDetailRecordCardItem = ({
  burnedCalorie,
  durationMinute,
  exerciseDateTime,
  id,
  isLeader = true,
  isMemoPublic,
  memoContent,
  memoImg,
  name,
  profileImg = '',
  sports,
  userId,
  onPressCardItem,
}: IMatchDetailRecordCardItemProps): React.JSX.Element => {
  const durationHours = Math.floor(durationMinute / 60);
  const durationRemainMinutes = durationMinute % 60;

  const formattedExerciseDateTime = dayjs(exerciseDateTime).format('HH:mm');

  return (
    <StyledCardItemWrapper>
      <StyledFlexSection
        style={{
          justifyContent: 'space-between',
          paddingLeft: 12,
          paddingRight: 17,
        }}>
        <StyledFlexSection style={{gap: 10}}>
          <StyledProfile />
          <View>
            {isLeader && (
              <>
                <Text
                  type="body3"
                  fontWeight="600"
                  color="gray-600"
                  text="방장"
                />
                <Gap size="2px" />
              </>
            )}
            <Text type="body3" fontWeight="600" text={name} />
          </View>
        </StyledFlexSection>

        <TouchableOpacity activeOpacity={0.8}>
          <StyledFlexSection>
            <Icon svgXml={heartXmlData} width={20} height={20} />
            <Text type="body3" fontWeight="600" text="응원하기" />
          </StyledFlexSection>
        </TouchableOpacity>
      </StyledFlexSection>

      <StyledCardContentWrapper>
        <StyledCardItem
          onPress={() => {
            onPressCardItem({
              burnedCalorie,
              durationMinute,
              exerciseDateTime,
              id,
              isLeader,
              isMemoPublic,
              memoContent,
              memoImg,
              name,
              profileImg,
              sports,
              userId,
            });
          }}
          activeOpacity={0.8}>
          {memoImg.length > 0 && (
            <View
              style={{
                height: 240,
                backgroundColor: theme.palette['gray-100'],
                borderTopStartRadius: 12,
                borderTopEndRadius: 12,
              }}></View>
          )}
          <View style={{padding: 12}}>
            <StyledFlexSection style={{justifyContent: 'space-between'}}>
              <StyledFlexSection style={{gap: 6}}>
                {/* TODO: sports에 대한 상수값 적용 */}
                <StyledCardItemProfile />
                <Text type="body1" fontWeight="600" text={`${sports}`} />
              </StyledFlexSection>
              <Text
                type="body3"
                fontWeight="600"
                color="gray-400"
                text={formattedExerciseDateTime}
              />
            </StyledFlexSection>
            <Gap size="10px" />
            <Tags
              type="sm"
              hasBorder
              fontWeight="400"
              color="gray-600"
              borderColor="gray-200"
              backgroundColor="gray-0"
              texts={[
                `칼로리 ${burnedCalorie}kcal`,
                `운동시간 ${durationHours}시간 ${durationRemainMinutes}분`,
              ]}
            />
            {isMemoPublic && (
              <>
                <Gap size="15px" />
                <Text type="body3" fontWeight="400" text={memoContent} />
              </>
            )}
          </View>
        </StyledCardItem>
      </StyledCardContentWrapper>
    </StyledCardItemWrapper>
  );
};

const StyledCardItemWrapper = styled.View``;

const StyledFlexSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledProfile = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 50px;
  background-color: ${props => props.theme.palette['gray-200']};
`;

const StyledCardContentWrapper = styled.View`
  margin: 0 0 0 30px;
  border-color: ${props => props.theme.palette['gray-100']};
  border-left-width: 2px;
`;

const StyledCardItem = styled.TouchableOpacity`
  width: 80%;
  border-color: ${props => props.theme.palette['gray-50']};
  border-radius: ${props => props.theme.borderRadius.md};
  border-width: 2px;
  margin: 14px auto 30px auto;
`;

const StyledCardItemProfile = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 50px;
  background-color: ${props => props.theme.palette['gray-200']};
`;
