import {ComponentMeta, StoryObj} from '@storybook/react';
import {IGapProps, Gap} from './Gap';

export default {
  title: 'components/Gap',
  component: Gap,
  argTypes: {},
} as ComponentMeta<typeof Gap>;

export const Basic: StoryObj<IGapProps> = {
  args: {
    size: '8px',
  },
};
