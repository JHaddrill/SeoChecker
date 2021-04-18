import React from 'react';
import { Story, Meta } from '@storybook/react';
import LabelledTextInput, { LabelledTextInputProps } from '.';

export default {
  title: 'Atoms/LabelledTextInput',
  component: LabelledTextInput,
  parameters: { actions: { argTypesRegex: '^on.*' } }
} as Meta;

const Template: Story<LabelledTextInputProps> = (args) => <LabelledTextInput {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  name: 'Label',
  value: 'Value',
  disabled: false
}