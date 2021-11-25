import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toggle } from './Toggle';

export default {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = args => <Toggle {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small'
};
