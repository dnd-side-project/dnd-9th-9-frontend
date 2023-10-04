import React from 'react';

import {type RouteProp, useRoute} from '@react-navigation/native';

import {
  AutoMatchError,
  AutoMatchLoading,
  AutoMatchResult,
} from '../../../features/match/components/AutoMatch';
import {useGetAutoField} from '../../../features/match/hooks/field';
import {type MatchStackParamList} from '../../../navigators';

export const AutoMatchResultScreen = (): React.JSX.Element => {
  const route = useRoute<RouteProp<MatchStackParamList, 'AutoMatchResult'>>();
  const {fieldType} = route.params;

  const {
    data: autoFieldData,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetAutoField({fieldType});

  if (isError)
    return <AutoMatchError message={error?.response?.data?.message} />;

  if (isLoading) return <AutoMatchLoading />;

  if (isSuccess && !isLoading)
    return (
      <AutoMatchResult
        fieldType={fieldType}
        autoFieldData={autoFieldData}
        // TODO (@chajuhui123) : 매칭 신청하기 API 연동
        onPressMatchApply={() => {}}
        onPressRefetch={() => {
          void refetch();
        }}
      />
    );

  return <></>;
};
