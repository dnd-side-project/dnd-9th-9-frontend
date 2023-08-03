import {ComponentMeta, StoryObj} from '@storybook/react';
import {IButtonProps, Button} from './Button';

const buttonSizeOptions = ['sm', 'md', 'lg'];

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    onPress: {action: 'pressed'},
    disabled: {
      control: 'boolean',
    },
    size: {
      control: {
        type: 'select',
        options: buttonSizeOptions,
      },
    },
  },
} as ComponentMeta<typeof Button>;

export const Basic: StoryObj<IButtonProps> = {
  args: {
    text: '다음',
    disabled: false,
    size: 'md',
  },
};
