import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';

export default {
  title: 'Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'large',
  value: ''
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'small',
  value: ''
};
