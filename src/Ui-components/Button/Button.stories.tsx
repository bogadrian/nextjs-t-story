import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  size: 'large',
  primary: true,
  label: 'Button'
};

export const SecondaryLarge = Template.bind({});
SecondaryLarge.args = {
  size: 'large',
  label: 'Button'
};

export const OutlineLarge = Template.bind({});
OutlineLarge.args = {
  size: 'large',
  outline: true,
  label: 'Button'
};

export const PrimaryMedium = Template.bind({});
PrimaryMedium.args = {
  size: 'medium',
  primary: true,
  label: 'Button'
};

export const SecondaryMedium = Template.bind({});
SecondaryMedium.args = {
  size: 'medium',
  label: 'Button'
};

export const OutlineMedium = Template.bind({});
OutlineMedium.args = {
  size: 'medium',
  outline: true,
  label: 'Button'
};
export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  size: 'small',
  primary: true,
  label: 'Button'
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  size: 'small',
  label: 'Button'
};

export const OutlineSmall = Template.bind({});
OutlineSmall.args = {
  size: 'small',
  outline: true,
  label: 'Button'
};
