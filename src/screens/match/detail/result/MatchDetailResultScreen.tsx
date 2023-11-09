import React, {useState} from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {Button} from '../../../../components/Button';
import {Text} from '../../../../components/Text';
import {
  MatchDetailResultCard,
  MatchDetailResultAnalyzeTab,
  MatchDetailResultRateCard,
} from '../../../../features/match/components';
import {
  useGetTeamworkIsRatingDone,
  usePostTeamworkRate,
} from '../../../../features/match/hooks/teamworkRate';
import Toast from '../../../../lib/toast';

interface IMatchDetailResultScreenProps {
  fieldId: number;
}

export const MatchDetailResultScreen = ({
  fieldId,
}: IMatchDetailResultScreenProps): React.JSX.Element => {
  const [currentRate, setCurrentRate] = useState(0);

  const {data: isTeamWorkRatingDone} = useGetTeamworkIsRatingDone({
    fieldId,
  });

  const {mutate: postTeamworkRate} = usePostTeamworkRate({
    onSuccessCallback: () => {},
    onErrorCallback: error => {
      Toast.show({
        message:
          error.response?.data.message ?? '알 수 없는 오류가 발생하였습니다.',
      });
    },
  });

  // TODO: 예외처리
  if (isTeamWorkRatingDone === undefined) return <></>;

  const data = {
    away: {
      goalAchievedCount: 0,
      name: 'string',
      profileImg: 'string',
      totalBurnedCalorie: 0,
      totalExerciseTimeMinute: 0,
      totalRecordCount: 0,
      totalScore: 0,
    },
    elementWiseWin: {
      burnedCalorie: 'DRAW',
      exerciseTimeMinute: 'DRAW',
      goalAchievedCount: 'DRAW',
      recordCount: 'DRAW',
    },
    home: {
      goalAchievedCount: 0,
      name: 'string',
      profileImg: 'string',
      totalBurnedCalorie: 0,
      totalExerciseTimeMinute: 0,
      totalRecordCount: 0,
      totalScore: 0,
    },
    period: 'ONE_WEEK',
    winStatus: 'DRAW',
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        <Text
          type="body1"
          text="매칭결과"
          fontWeight="600"
          style={{
            marginTop: 32,
            marginBottom: 17,
            marginHorizontal: 16,
          }}
        />
        {isTeamWorkRatingDone ? (
          <MatchDetailResultCard
            ourTeamImage={data.home.profileImg}
            awayTeamImage={data.away.profileImg}
            ourTeamName={data.home.name}
            awayTeamName={data.away.name}
            ourScore={data.home.totalScore}
            awayScore={data.away.totalScore}
            period={'ONE_WEEK'}
            winStatus={'DRAW'}
          />
        ) : (
          <MatchDetailResultRateCard
            ourTeamImage={data.home.profileImg}
            awayTeamImage={data.away.profileImg}
            ourTeamName={data.home.name}
            awayTeamName={data.away.name}
            ourScore={data.home.totalScore}
            awayScore={data.away.totalScore}
            period={'ONE_WEEK'}
            winStatus={'DRAW'}
            currentRate={currentRate}
            onPressRate={setCurrentRate}
          />
        )}

        <Text
          type="body1"
          text="점수분석"
          fontWeight="600"
          style={{
            marginTop: 32,
            marginBottom: 35,
            marginHorizontal: 16,
          }}
        />
        <MatchDetailResultAnalyzeTab
          ourTeamName={data.home.name}
          awayTeamName={data.away.name}
          elementWiseWin={{
            burnedCalorie: 'DRAW',
            exerciseTimeMinute: 'DRAW',
            goalAchievedCount: 'DRAW',
            recordCount: 'DRAW',
          }}
        />
      </ScrollView>

      {!isTeamWorkRatingDone && (
        <Button
          text="확인"
          disabled={currentRate === 0}
          onPress={() => {
            postTeamworkRate({fieldId, teamworkRate: currentRate});
          }}
        />
      )}
    </SafeAreaView>
  );
};
