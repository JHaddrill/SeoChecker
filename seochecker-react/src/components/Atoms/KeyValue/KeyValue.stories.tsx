import React from 'react';
import { Story, Meta } from '@storybook/react';
import KeyValue, { KeyValueProps } from './';

export default {
  title: 'Atoms/KeyValue',
  component: KeyValue,
} as Meta;

const Template: Story<KeyValueProps> = (args) => <KeyValue {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    testId: '',
    Key: 'Key',
    Value: 'Value'
}