import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Screen = Template.bind({});
Screen.args = {
  device: 'screen'
};

export const Mobile = Template.bind({});
Mobile.args = {
  device: 'mobile'
};
