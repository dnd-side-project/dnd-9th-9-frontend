import {ComponentMeta, StoryObj} from '@storybook/react';
import {ITextProps, Text} from './Text';

const TypographyOptions = [
  'head1',
  'head2',
  'head3',
  'head4',
  'body1',
  'body2',
  'body3',
  'caption',
];

export default {
  title: 'components/Text',
  component: Text,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: TypographyOptions,
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
