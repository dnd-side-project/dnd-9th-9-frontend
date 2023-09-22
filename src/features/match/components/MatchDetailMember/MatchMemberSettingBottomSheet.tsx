import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';

import {BottomSheet} from '../../../../components/BottomSheet';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {type MatchStackParamList} from '../../../../navigators';
import {type TUserRole} from '../../types';

interface IMatchMemberSettingBottomSheetProps {
  id: number;
  userRole: TUserRole;
  type: 'MEMBER' | 'DELETE' | 'ASSIGN' | 'REQUEST';
  isOpened: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MatchMemberSettingBottomSheet = ({
  id,
  userRole,
  type,
  isOpened,
  onOpen,
  onClose,
}: IMatchMemberSettingBottomSheetProps): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  return (
    <BottomSheet isOpened={isOpened} onOpen={onOpen} onClose={onClose}>
      {type === 'MEMBER' && (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onClose();
              navigation.navigate('MatchDetailMemberAssign', {id, userRole});
            }}>
            <Text
              type="body2"
              fontWeight="700"
              lineHeight="60px"
              text="방장 넘기기"
            />
          </TouchableOpacity>
          <Line size="sm" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onClose();
              navigation.navigate('MatchDetailMemberDelete', {id, userRole});
            }}>
            <Text
              type="body2"
              fontWeight="700"
              lineHeight="60px"
              text="팀원 삭제"
            />
          </TouchableOpacity>
        </>
      )}
      {type === 'REQUEST' && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onClose();
            navigation.navigate('MatchDetailMemberRequestAccept', {
              id,
              userRole,
            });
          }}>
          <Text
            type="body2"
            fontWeight="700"
            lineHeight="60px"
            text="수락하기"
          />
        </TouchableOpacity>
      )}
    </BottomSheet>
  );
};
