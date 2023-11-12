import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';

import {ConfirmModal} from '../../../../components/Modal';
import {Tag} from '../../../../components/Tag';
import Toast from '../../../../lib/toast';
import {type MatchStackParamList} from '../../../../navigators';
import {useDeleteUserFieldExit} from '../../hooks/userField/useDeleteUserFieldExit';

interface IMatchExitButtonProps {
  id: number;
}

export const MatchExitButton = ({
  id,
}: IMatchExitButtonProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const {mutate: exitField} = useDeleteUserFieldExit({
    onSuccessCallback: () => {
      const message = '팀에서 나갔습니다.';
      Toast.show({message});
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
    },
    onErrorCallback: error => {
      setModalInfo({
        isVisible: true,
        title: '팀 나가기',
        subTitle: error?.response?.data?.message ?? '오류가 발생하였습니다',
      });
    },
  });

  const handleExitTag = (): void => {
    exitField({id});
  };

  return (
    <TouchableOpacity
      onPress={handleExitTag}
      style={{paddingHorizontal: 16, marginTop: 30}}>
      <Tag
        type="sm"
        hasBorder={false}
        color="black"
        backgroundColor="gray-50"
        borderColor="gray-50"
        text="팀 나가기"
      />
      <ConfirmModal
        visible={modalInfo.isVisible}
        title={modalInfo.title}
        subTitle={modalInfo.subTitle}
        handleConfirm={() => {
          setModalInfo({isVisible: false, title: '', subTitle: ''});
        }}
      />
    </TouchableOpacity>
  );
};
