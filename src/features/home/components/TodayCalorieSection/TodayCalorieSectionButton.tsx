import React from 'react';

import styled from '@emotion/native';
import dayjs from 'dayjs';

import {Text} from '../../../../components/Text';
import {useGetHealthKitAuthStatus} from '../../../../hooks/healthKit';
import {useGetBurnedCalorieGoal} from '../../../record/hooks/exercise';

export const TodayCalorieSectionButton = (): React.JSX.Element => {
  const today = dayjs().format('YYYY-MM-DD');
  const {refetch: refetchBurnedCalorieGoal} = useGetBurnedCalorieGoal({
    date: today,
  });

  const {data: healthKitAuthStatus} = useGetHealthKitAuthStatus();

  // const {mutate: initHealthKit} = useInitHealthKit();

  const StyledResetContainer =
    healthKitAuthStatus?.isAllLinked ?? false
      ? StyledResetButton
      : StyledResetText;

  return (
    <StyledResetContainer
      disabled={healthKitAuthStatus?.isAllLinked ?? false}
      onPress={() => {
        if (healthKitAuthStatus?.isAllLinked ?? false) {
          void refetchBurnedCalorieGoal();
        }
        //  else {
        //  NOTE: 기기당 한번씩만 설정 가능
        //   initHealthKit(defaultPermissions);
        // }
      }}>
      <Text
        text={
          healthKitAuthStatus?.isAllLinked ?? false
            ? '새로고침'
            : '건강앱 미연동'
        }
        type="caption"
        fontWeight="600"
        color="gray-600"
      />
    </StyledResetContainer>
  );
};

const StyledResetButton = styled.TouchableOpacity`
  border-radius: 12.449px;
  background: #f0f0f5;
  padding: 8px 11px;
`;

const StyledResetText = styled.View`
  border-radius: 12.449px;
  background: #f0f0f5;
  padding: 8px 11px;
`;
