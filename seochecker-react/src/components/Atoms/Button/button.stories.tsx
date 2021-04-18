import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from './';

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Search = Template.bind({});
Search.args = {
    label: 'Search',
    disabled: false
}