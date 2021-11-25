import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HamburgerButton } from './HamburgerButton';

export default {
  title: 'HamburgerButton',
  component: HamburgerButton
} as ComponentMeta<typeof HamburgerButton>;

const Template: ComponentStory<typeof HamburgerButton> = args => (
  <HamburgerButton {...args} />
);

export const Large = Template.bind({});
Large.args = {
  size: 'large'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small'
};
