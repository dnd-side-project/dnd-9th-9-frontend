import React from 'react';
import {IListItemProps, ListItem} from '../../../../components/List';

interface IMatchingListProps {
  data: IListItemProps[];
}

export const MatchingList = ({data}: IMatchingListProps) => {
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
        />
      ))}
    </>
  );
};
