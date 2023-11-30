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
import {useGetFieldDetailResult} from '../../../../features/match/hooks/field';
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

  const {data: resultData} = useGetFieldDetailResult({id: fieldId});

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
  if (isTeamWorkRatingDone === undefined || resultData === undefined)
    return <></>;

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
            ourTeamImage={resultData.home.profileImg}
            awayTeamImage={resultData.away.profileImg}
            ourTeamName={resultData.home.name}
            awayTeamName={resultData.away.name}
            ourScore={resultData.home.totalScore}
            awayScore={resultData.away.totalScore}
            period={resultData.period}
            winStatus={resultData.winStatus}
          />
        ) : (
          <MatchDetailResultRateCard
            ourTeamImage={resultData.home.profileImg}
            awayTeamImage={resultData.away.profileImg}
            ourTeamName={resultData.home.name}
            awayTeamName={resultData.away.name}
            ourScore={resultData.home.totalScore}
            awayScore={resultData.away.totalScore}
            period={resultData.period}
            winStatus={resultData.winStatus}
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
          ourTeamName={resultData.home.name}
          awayTeamName={resultData.away.name}
          elementWiseWin={resultData.elementWiseWin}
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
