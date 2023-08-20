import React, {useState} from 'react';

import styled from '@emotion/native';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import {MatchApplyListItem} from './MatchApplyListItem';
import {arrowRightXmlData} from '../../../../assets/svg';
import {Button} from '../../../../components/Button';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {type IMatchApply} from '../../types';

interface IMatchApplyListProps {
  type: 'RECEIVED' | 'SENT' | 'MATCHED';
  totalCount: number;
  applies: IMatchApply[];
  isSummary?: boolean;
  onPressMore?: () => void;
  handleSettingConfirmButton?: () => void;
}

export const MatchApplyList = ({
  type,
  totalCount,
  applies,
  isSummary = true,
  onPressMore,
  handleSettingConfirmButton = () => {},
}: IMatchApplyListProps): React.JSX.Element => {
  const [isSettingMode, setIsSettingMode] = useState(false);
  const [checkedApply, setCheckedApply] = useState<number[]>([]);
  const [settingButtonText, setSettingButtonText] = useState('');

  const infoByType = {
    RECEIVED: '요청받은 매칭',
    SENT: '신청한 매칭',
    MATCHED: '매칭된 팀',
  } as const;

  const showAppliesData = isSummary ? applies.slice(0, 3) : applies;

  const handleSettingList = (): void => {
    if (type === 'SENT') {
      setIsSettingMode(value => !value);
      setCheckedApply([]);
      setSettingButtonText('신청 취소');
    } else if (type === 'RECEIVED') {
      setIsSettingMode(value => !value);
      setCheckedApply([]);
      // TODO: 제거/수락 모드 선택하는 플로우 추가
      setSettingButtonText('요청 수락');
    }
  };

  return (
    <View style={{flex: 1}}>
      <StyledHeaderWrapper>
        <Text type="head4" fontWeight="600" text={infoByType[type]} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isSummary ? onPressMore : handleSettingList}>
          {isSummary ? (
            <Icon svgXml={arrowRightXmlData} width={44} height={44} />
          ) : (
            <Text
              type="body2"
              color="gray-600"
              fontWeight="400"
              text={isSettingMode ? '설정취소' : '설정'}
            />
          )}
        </TouchableOpacity>
      </StyledHeaderWrapper>
      <ScrollView>
        {totalCount !== 0 ? (
          showAppliesData.map((apply, idx) => (
            <MatchApplyListItem
              key={`${type}-${idx}`}
              isSettingMode={isSettingMode}
              apply={apply}
              checked={checkedApply.includes(apply.entryId)}
              handleCheck={() => {
                checkedApply.includes(apply.entryId)
                  ? setCheckedApply(value => [
                      ...value.filter(id => id !== apply.entryId),
                    ])
                  : setCheckedApply(value => [...value, apply.entryId]);
              }}
            />
          ))
        ) : (
          <StyledNoContentsWrapper>
            <Text
              type="body2"
              color="gray-400"
              fontWeight="600"
              text={`${infoByType[type]}이 없습니다.`}
            />
          </StyledNoContentsWrapper>
        )}
      </ScrollView>

      {isSummary && totalCount > 3 && (
        <StyledButton onPress={onPressMore}>
          <Text type="body2" color="gray-600" fontWeight="400" text="더보기" />
        </StyledButton>
      )}

      {!isSummary && isSettingMode && (
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Button
            text={settingButtonText}
            disabled={checkedApply.length === 0}
            onPress={handleSettingConfirmButton}
          />
        </View>
      )}
    </View>
  );
};

const StyledHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 20px 16px;
`;

const StyledNoContentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 120px;
  margin: 0px auto 30px auto;
`;

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  margin: auto;
  color: ${props => props.theme.palette['gray-600']};
  background-color: ${props => props.theme.palette['gray-50']};
  margin: 10px 17px 30px 17px;
  padding: 27px 0px;
`;
