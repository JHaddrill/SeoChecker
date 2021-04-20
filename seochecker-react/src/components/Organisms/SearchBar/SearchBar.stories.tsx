import React from 'react';
import { Story, Meta } from '@storybook/react';
import SearchBar, { SearchBarProps } from '.';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';


export default {
  title: 'Organisms/SearchBar',
  component: SearchBar,
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

const Template: Story<SearchBarProps> = (args) => <Provider store={store}><SearchBar {...args}/></Provider>;

export const Standard = Template.bind({});
Template.args ={
  isLoading: false
}


