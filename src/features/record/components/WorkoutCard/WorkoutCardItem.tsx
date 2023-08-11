import styled from '@emotion/native';
import {View} from 'react-native';
import {Tag} from '../../../../components/Tag';
import {Text} from '../../../../components/Text';
import {HKWorkoutQueriedSampleType} from 'react-native-health';

import {
  TWorkoutActivityType,
  WORKOUT_ACTIVITY,
} from '../../../../lib/AppleHealthKit';
import {Icon} from '../../../../components/Icon';
import {verticalDotsData} from '../../../../assets/svg';

// TODO: activity별로 묶일 경우 id -> activityId 사용
export type TWorkoutCardItemProps = Pick<
  HKWorkoutQueriedSampleType,
  'id' | 'activityId' | 'activityName' | 'calories' | 'duration'
> & {
  onPressCard?: (id: string) => void;
  onPressSetting?: (id: string) => void;
};

export function WorkoutCardItem({
  id,
  activityId,
  activityName,
  calories,
  duration,
  onPressCard,
  onPressSetting,
}: TWorkoutCardItemProps) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  return (
    <View>
      <StyledSetting onPress={() => onPressSetting && onPressSetting(id)}>
        <Icon svgXml={verticalDotsData} width={20} height={4} />
      </StyledSetting>
      <StyledWorkoutCard onPress={() => onPressCard && onPressCard(id)}>
        <StyledWorkoutCardHeader>
          <StyledWorkoutProfile>
            <Text
              type="head3"
              text={
                WORKOUT_ACTIVITY[activityName as TWorkoutActivityType].emoji ||
                '🏃'
              }></Text>
          </StyledWorkoutProfile>
          <Text
            text={
              WORKOUT_ACTIVITY[activityName as TWorkoutActivityType].label ||
              activityName
            }
            type="body1"
            fontWeight="600"
          />
        </StyledWorkoutCardHeader>
        <StyledTagContainer>
          <Tag
            text={`칼로리 ${calories}kcal`}
            type="sm"
            hasBorder
            borderColor="gray-200"
            backgroundColor="gray-50"
            color="gray-600"
          />
          <Tag
            text={`운동시간 ${hours}시간 ${minutes}분`}
            type="sm"
            hasBorder
            borderColor="gray-200"
            backgroundColor="gray-50"
            color="gray-600"
          />
        </StyledTagContainer>
      </StyledWorkoutCard>
    </View>
  );
}

const StyledWorkoutCard = styled.TouchableOpacity`
  border-radius: 12px;
  background-color: ${props => props.theme.palette['gray-50']};
  padding: 11px 8px 20px;
`;

const StyledWorkoutCardHeader = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;

const StyledWorkoutProfile = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: ${props => props.theme.palette['gray-0']};
  margin-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTagContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const StyledSetting = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 20px;
  width: 44px;
  height: 44px;
`;
