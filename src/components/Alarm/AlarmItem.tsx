import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {type TPalette} from '../../assets/styles/emotion';
import {dayjs} from '../../lib/dayjs';
import {checkValidDateTimeFormat} from '../../utils/regex';
import {Gap} from '../Gap';
import {Text} from '../Text';

export interface IAlarmItemProps {
  alarmType: 'matching' | 'member' | 'team';
  message: string;
  time: string; // YYYY-MM-DD HH:MM:SS
}

interface IStyledAlarmIcon {
  color: TPalette;
}

interface IAlarmTypeData {
  matching: {text: string; color: TPalette};
  member: {text: string; color: TPalette};
  team: {text: string; color: TPalette};
}

export const AlarmItem = ({
  alarmType,
  message,
  time,
}: IAlarmItemProps): React.JSX.Element => {
  const alarmTypeData: IAlarmTypeData = {
    matching: {text: '매칭', color: 'main-200'},
    member: {text: '팀원', color: 'sub-400'},
    team: {text: '팀 소식', color: 'gray-600'},
  };

  const getAlarmTimeText = (date: string): string => {
    if (!checkValidDateTimeFormat(date)) return '';

    const currentDate = dayjs();
    const alarmDate = dayjs(date);
    const diffMin: number = currentDate.diff(alarmDate, 'minute');

    const HOUR = 60;
    const DAY = 24 * HOUR;

    if (diffMin < HOUR) return '방금전';
    else if (diffMin < DAY) return `${Math.floor(diffMin / 60)}시간 전`;
    else if (diffMin < DAY * 2) return '어제';
    else return `${alarmDate.month() + 1}월 ${alarmDate.date()}일`;
  };

  return (
    <StyledFlexView>
      <StyledAlarmIcon color={alarmTypeData[alarmType].color} />
      <View>
        <Text
          type="caption"
          color="black"
          fontWeight="300"
          text={alarmTypeData[alarmType].text}
        />
        <Gap size="12px" />
        <Text type="body2" color="black" fontWeight="400" text={message} />
      </View>

      <View style={{marginLeft: 'auto'}}>
        <Text
          type="body3"
          color="black"
          fontWeight="300"
          text={getAlarmTimeText(time)}
        />
      </View>
    </StyledFlexView>
  );
};

const StyledAlarmIcon = styled.View<IStyledAlarmIcon>`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  margin: 1px 10px 0 0;
  background-color: ${props => props.theme.palette[props.color]};
`;

const StyledFlexView = styled.View`
  flex-direction: row;
  padding: 16px;
`;