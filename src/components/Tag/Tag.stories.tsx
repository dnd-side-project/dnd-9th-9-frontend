import {ComponentMeta, StoryObj} from '@storybook/react';
import {ITagProps, Tag} from './Tag';
import {colorOptions} from '../../assets/styles/option';

const tagSizeOptions = ['xs', 'sm', 'md', 'lg'];

export default {
  title: 'components/Tag',
  component: Tag,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: tagSizeOptions,
      },
    },
    color: {
      control: {
        type: 'select',
        options: colorOptions,
      },
    },
    backgroundColor: {
      control: {
        type: 'select',
        options: colorOptions,
      },
    },
    borderColor: {
      control: {
        type: 'select',
        options: colorOptions,
      },
    },
  },
} as ComponentMeta<typeof Tag>;

export const Basic: StoryObj<ITagProps> = {
  args: {
    text: 'TEST TAG',
    type: 'sm',
    hasBorder: false,
  },
};
