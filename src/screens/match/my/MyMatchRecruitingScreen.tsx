import React, {useMemo} from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {Line} from '../../../components/Line';
import {Text} from '../../../components/Text';
import {MyMatchList} from '../../../features/match/components/MyMatch/MyMatchList';
import {useGetUserFieldRecruiting} from '../../../features/match/hooks/userField/useGetUserFieldRecruiting';

export const MyMatchRecruitingScreen = (): React.JSX.Element => {
  const {data: fieldRecruitingData} = useGetUserFieldRecruiting();

  const teamData = useMemo(() => {
    if (fieldRecruitingData == null) return [];
    return fieldRecruitingData.filter(value => value.fieldType !== 'DUEL');
  }, [fieldRecruitingData]);

  const duelData = useMemo(() => {
    if (fieldRecruitingData == null) return [];
    return fieldRecruitingData.filter(value => value.fieldType === 'DUEL');
  }, [fieldRecruitingData]);

  return (
    <View>
      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="팀" />
      </StyledHeaderWrapper>
      <MyMatchList
        type="RECRUITING"
        fieldEntryType="TEAM"
        fieldEntryData={teamData}
      />

      <Line size="sm" />

      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="1VS1" />
      </StyledHeaderWrapper>
      <MyMatchList
        type="RECRUITING"
        fieldEntryType="DUEL"
        fieldEntryData={duelData}
      />
    </View>
  );
};

const StyledHeaderWrapper = styled.View`
  padding: 18px 16px;
`;
