import React from 'react';
import { Story, Meta } from '@storybook/react';
import LabelledSelect, { LabelledTextInputProps } from '.';

export default {
  title: 'Molecules/LabelledSelect',
  component: LabelledSelect,
  parameters: { actions: { argTypesRegex: '^on.*' } }
} as Meta;

const Template: Story<LabelledTextInputProps> = (args) => <LabelledSelect {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  name: 'Label',
  value: 'Option1',
  disabled: false,
  children: (<><option value='Option1'>Option1</option><option value='Option2'>Option2</option></>),
}