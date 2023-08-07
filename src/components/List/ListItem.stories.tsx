import {ComponentMeta, StoryObj} from '@storybook/react';
import {IListItemProps, ListItem} from './ListItem';

export default {
  title: 'components/ListItem',
  component: ListItem,
  argTypes: {},
} as ComponentMeta<typeof ListItem>;

export const Basic: StoryObj<IListItemProps> = {
  args: {
    title: 'DND 다이어트 대결',
    level: '초보',
    matchingType: 'TEAM',
    isFinish: false,
    isSecret: false,
    currentMember: 3,
    maximumMember: 4,
    period: 1,
  },
};
