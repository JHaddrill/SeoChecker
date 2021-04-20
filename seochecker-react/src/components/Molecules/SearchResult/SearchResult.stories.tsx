import React from 'react';
import { Story, Meta } from '@storybook/react';

import SearchResult, { SearchResultProps } from '.';

export default {
  title: 'Molecules/SearchResult',
  component: SearchResult,
} as Meta;

const Template: Story<SearchResultProps> = (args) =><div style={{width: '400px'}}><SearchResult {...args}/></div> ;

export const NoMatches = Template.bind({});
NoMatches.args = {
  SeoResult: {
    positions: [],
    keyword: 'Keyword',
    url: 'Url',
    searchEngine: 'Engine',
    numberOfOccurrences: 0
  }
}

export const Matches = Template.bind({});
Matches.args = {
  SeoResult: {
    positions: [1,2],
    keyword: 'Keyword',
    url: 'Url',
    searchEngine: 'Engine',
    numberOfOccurrences: 2
  }
}