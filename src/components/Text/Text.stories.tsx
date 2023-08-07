import {ComponentMeta, StoryObj} from '@storybook/react';
import {ITextProps, Text} from './Text';
import {typographyOptions} from '../../assets/styles/option';

export default {
  title: 'components/Text',
  component: Text,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: typographyOptions,
      },
    },
  },
} as ComponentMeta<typeof Text>;

export const Basic: StoryObj<ITextProps> = {
  args: {
    text: '제목을 입력해주세요.',
    type: 'head1',
  },
};
