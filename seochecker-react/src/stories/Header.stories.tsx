import React from 'react';
import { Story, Meta } from '@storybook/react';

import Header from '../components/Molecules/Header';

export default {
  title: 'Example/Header',
  component: Header,
} as Meta;

const Template: Story = () => <Header />;

export const HeaderDisplay = Template.bind({});
