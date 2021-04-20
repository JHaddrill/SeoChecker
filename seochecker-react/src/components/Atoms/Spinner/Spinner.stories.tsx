import React from 'react';
import { Story, Meta } from '@storybook/react';
import Spinner, { SpinnerProps } from '.';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: { actions: { argTypesRegex: '^on.*' } }
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small'
}

export const Large = Template.bind({});
Large.args = {
  size: 'large'
}