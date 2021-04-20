import React from 'react';
import { Story, Meta } from '@storybook/react';
import ResultDisplay, { ResultDisplayProps } from '.';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';


export default {
  title: 'Organisms/ResultDisplay',
  component: ResultDisplay,
  parameters: { actions: { argTypesRegex: '^on.*' } }
} as Meta;

let state = {
  seoCheck: {
    isLoading: false,
    SeoResult: undefined,
    Error: ''
  },
}

let store = configureStore(state);

const Template: Story<ResultDisplayProps> = (args) => <Provider store={store}><ResultDisplay {...args}/></Provider>;

export const Standard = Template.bind({});
Template.args ={
  isLoading: false
}


