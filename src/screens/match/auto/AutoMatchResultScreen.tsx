import React, {useState} from 'react';

import {
  type RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {ConfirmModal} from '../../../components/Modal';
import {
  AutoMatchError,
  AutoMatchLoading,
  AutoMatchResult,
} from '../../../features/match/components/AutoMatch';
import {useGetAutoField} from '../../../features/match/hooks/field';
import {usePostFieldEntryBattle} from '../../../features/match/hooks/fieldEntry';
import Toast from '../../../lib/toast';
import {type MatchStackParamList} from '../../../navigators';

export const AutoMatchResultScreen = (): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();
  const route = useRoute<RouteProp<MatchStackParamList, 'AutoMatchResult'>>();

  const {fieldType} = route.params;

  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const {
    data: autoFieldData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
    refetch,
  } = useGetAutoField({fieldType});

  const {mutate: postFieldEntryBattle} = usePostFieldEntryBattle({
    onSuccessCallback: () => {
      setModalInfo({
        isVisible: true,
        title: '매칭 신청 완료',
        subTitle: '매칭신청이 수락되면 알려드릴게요.',
      });
    },
    onErrorCallback: error => {
      const message =
        error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.';
      Toast.show({message});
    },
  });

  if (isError)
    return (
      <AutoMatchError
        message={
          error?.response?.data?.message ?? '알 수 없는 오류가 발생하였습니다.'
        }
      />
    );

  if (isLoading || isFetching) return <AutoMatchLoading />;

  if (isSuccess && !isLoading)
    return (
      <>
        <AutoMatchResult
          fieldType={fieldType}
          autoFieldData={autoFieldData}
          onPressMatchApply={() => {
            const body = {
              targetFieldId: autoFieldData?.id,
              battleType: fieldType,
            };
            postFieldEntryBattle({body});
          }}
          onPressRefetch={() => {
            void refetch();
          }}
        />
        <ConfirmModal
          visible={modalInfo.isVisible}
          title={modalInfo.title}
          subTitle={modalInfo.subTitle}
          handleConfirm={() => {
            setModalInfo({isVisible: false, title: '', subTitle: ''});
            navigation.navigate('MatchList', {
              page: 0,
              size: 10,
              fieldType: 'DUEL',
              goal: [],
              memberCount: null,
              period: [],
              skillLevel: [],
              strength: [],
              keyword: '',
            });
          }}
        />
      </>
    );

  return <></>;
};
