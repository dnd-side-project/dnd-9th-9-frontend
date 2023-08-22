import React from 'react';

import {type IMatchListItem, ListItem} from '../../../../components/List';

interface IMatchingListProps {
  data: IMatchListItem[];
  onPress: (matchId: number) => void;
}

export const MatchingList = ({
  data,
  onPress,
}: IMatchingListProps): React.JSX.Element => {
  return (
    <>
      {data.map((item, idx) => (
        <ListItem
          key={`match-item-${idx}`}
          image={item.image}
          title={item.title}
          level={item.level}
          matchingType={item.matchingType}
          isFinish={item.isFinish}
          currentMember={item.currentMember}
          maximumMember={item.maximumMember}
          period={item.period}
          onPress={() => {
            onPress(idx);
          }}
        />
      ))}
    </>
  );
};
