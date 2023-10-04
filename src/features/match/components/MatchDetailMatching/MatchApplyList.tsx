import React from 'react';

import styled from '@emotion/native';
import {type InfiniteData} from '@tanstack/react-query';
import {FlatList} from 'react-native';

import {MatchApplyListItem} from './MatchApplyListItem';
import {Text} from '../../../../components/Text';
import {type IBattleEntry} from '../../types';

interface IMatchApplyListProps {
  type: 'RECEIVED' | 'SENT';
  isSettingMode?: boolean;
  fieldEntryBattleData?: InfiniteData<{
    battleEntries: IBattleEntry[];
    currentPageNumber: number;
    currentPageSize: number;
    totalCount: number;
  }>;
  checkedId?: number;
  onPressTeamDetail: (fieldId: number) => void;
  onPressCheckBox?: (entryId: number | undefined) => void;
  onEndReached?: () => void;
}

export const MatchApplyList = ({
  type,
  isSettingMode = false,
  fieldEntryBattleData,
  checkedId = undefined,
  onPressTeamDetail,
  onPressCheckBox = () => {},
  onEndReached = () => {},
}: IMatchApplyListProps): React.JSX.Element => {
  const infoByType = {
    RECEIVED: '요청받은 매칭',
    SENT: '신청한 매칭',
  } as const;

  return (
    <FlatList
      scrollEnabled={false}
      data={fieldEntryBattleData?.pages.map(page => page.battleEntries).flat()}
      keyExtractor={item => `field-entry-${item.fieldType}-${item.fieldId}`}
      renderItem={({item}) => (
        <MatchApplyListItem
          key={`${type}-${item.fieldId}`}
          isSettingMode={isSettingMode}
          apply={item}
          isCheck={item.entryId === checkedId}
          onPressTeamDetail={onPressTeamDetail}
          onPressCheckBox={() => {
            item.entryId === checkedId
              ? onPressCheckBox(undefined)
              : onPressCheckBox(item.entryId);
          }}
        />
      )}
      ListEmptyComponent={
        <StyledNoContentsWrapper>
          <Text
            type="body2"
            color="gray-400"
            fontWeight="600"
            text={`${infoByType[type]}이 없습니다.`}
          />
        </StyledNoContentsWrapper>
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const StyledNoContentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 120px;
  margin: 0px auto 30px auto;
`;
