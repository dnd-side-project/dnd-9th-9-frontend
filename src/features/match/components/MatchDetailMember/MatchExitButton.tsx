import React from 'react';

import {TouchableOpacity} from 'react-native';

import {Tag} from '../../../../components/Tag';
import {useDeleteUserFieldExit} from '../../hooks/userField/useDeleteUserFieldExit';

interface IMatchExitButtonProps {
  id: number;
}

export const MatchExitButton = ({
  id,
}: IMatchExitButtonProps): React.JSX.Element => {
  const {mutate: exitField} = useDeleteUserFieldExit();

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
    </TouchableOpacity>
  );
};
