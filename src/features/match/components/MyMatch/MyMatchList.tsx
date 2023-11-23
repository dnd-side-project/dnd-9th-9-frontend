import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {MyMatchListItem} from './MyMatchListItem';
import {Text} from '../../../../components/Text';
import {type TFieldType, type IUserFieldMyMatch} from '../../types';

interface IMyMatchListProps {
  type: 'APPLICATION' | 'RECRUITING' | 'PROGRESS' | 'COMPLETE';
  fieldEntryType: TFieldType;
  fieldEntryData?: IUserFieldMyMatch[];
}

export const MyMatchList = ({
  type,
  fieldEntryType,
  fieldEntryData = [],
}: IMyMatchListProps): React.JSX.Element => {
  const noDataMessage = {
    APPLICATION: '신청 내역이 존재하지 않습니다.',
    RECRUITING: '진행전인 매칭이 존재하지 않습니다',
    PROGRESS: '진행중인 매칭이 존재하지 않습니다.',
    COMPLETE: '매칭 완료한 내역이 존재하지 않습니다.',
  };

  return (
    <View>
      {fieldEntryData.length > 0 ? (
        fieldEntryData.map(
          (
            {
              currentSize,
              fieldType,
              id,
              maxSize,
              name,
              period,
              skillLevel,
              leader,
            },
            idx,
          ) => (
            <MyMatchListItem
              key={`${type}-${fieldEntryType}-${idx}`}
              fieldId={id}
              currentSize={currentSize}
              fieldType={fieldType}
              maxSize={maxSize}
              name={name}
              period={period}
              skillLevel={skillLevel}
              isLeader={leader}
              // profileImg=""
            />
          ),
        )
      ) : (
        <StyledNonDataWrapper>
          <Text
            type="body2"
            color="gray-400"
            fontWeight="600"
            text={noDataMessage[type]}
          />
        </StyledNonDataWrapper>
      )}
    </View>
  );
};

const StyledNonDataWrapper = styled.View`
  text-align: center;
  margin: 30px auto 50px auto;
`;
