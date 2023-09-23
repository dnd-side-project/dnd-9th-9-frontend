import React, {useMemo} from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {Line} from '../../../components/Line';
import {Text} from '../../../components/Text';
import {MyMatchList} from '../../../features/match/components/MyMatch/MyMatchList';
import {useGetUserFieldProgress} from '../../../features/match/hooks/userField';

export const MyMatchProgressScreen = (): React.JSX.Element => {
  const {data: fieldProgressData} = useGetUserFieldProgress();

  const teamData = useMemo(() => {
    if (fieldProgressData == null) return [];
    return fieldProgressData.filter(value => value.fieldType !== 'DUEL');
  }, [fieldProgressData]);

  const duelData = useMemo(() => {
    if (fieldProgressData == null) return [];
    return fieldProgressData.filter(value => value.fieldType === 'DUEL');
  }, [fieldProgressData]);

  return (
    <View>
      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="팀" />
      </StyledHeaderWrapper>
      <MyMatchList
        type="PROGRESS"
        fieldEntryType="TEAM"
        fieldEntryData={teamData}
      />

      <Line size="sm" />

      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text="1VS1" />
      </StyledHeaderWrapper>
      <MyMatchList
        type="PROGRESS"
        fieldEntryType="DUEL"
        fieldEntryData={duelData}
      />
    </View>
  );
};

const StyledHeaderWrapper = styled.View`
  padding: 18px 16px;
`;
