import * as React from 'react';
import renderer from 'react-test-renderer';
import { render,  screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import SearchResult from '.';
import { SeoResult } from 'types/SeoResult';

const defaultProps = {
  testId: 'testid',
  SeoResult: {
    positions: [],
    keyword: 'Keyword',
    url: 'Url',
    searchEngine: 'Engine',
    numberOfOccurrences: 0
  }
}

it('renders correctly', () => {
   const tree = renderer.create(<SearchResult {...defaultProps}/>).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('SearchResult', () => {
   test('renders', () => {
     render(<SearchResult {...defaultProps}/>)
     expect(screen.getByTestId(defaultProps.testId)).toBeInTheDocument();
   })
   
   describe('positions', () => {
    const posId =`${defaultProps.testId}-pos-result`
    
    test('renders 0 when empty', () => {
      render(<SearchResult {...defaultProps}/>)
      expect(screen.getByTestId(posId)).toHaveTextContent('0');
    });

    test('renders single number when count is 1', () => {
      const props = {
        testId: 'testid',
        SeoResult: {
          ...defaultProps.SeoResult,
          positions: [1]
        }
      }
      render(<SearchResult {...props}/>)
      expect(screen.getByTestId(posId)).toHaveTextContent('1');
    });

    test('renders single number when count is greater than 1', () => {
      const props = {
        testId: 'testid',
        SeoResult: {
          ...defaultProps.SeoResult,
          positions: [1,2]
        }
      }
      render(<SearchResult {...props}/>)
      expect(screen.getByTestId(posId)).toHaveTextContent('1, 2');
    });

   });

   describe('details', () => {

      const seo:SeoResult = defaultProps.SeoResult;
      
      test('renders keyword with value', () => {
        render(<SearchResult {...defaultProps}/>)
        expect(screen.getByTestId(`${defaultProps.testId}-keyword`))
        .toHaveTextContent(`Keyword:${seo.keyword}`);
      })

      test('renders url with value', () => {
        render(<SearchResult {...defaultProps}/>)
        expect(screen.getByTestId(`${defaultProps.testId}-url`))
        .toHaveTextContent(`Url:${seo.url}`);
      })

      test('renders engine with value', () => {
        render(<SearchResult {...defaultProps}/>)
        expect(screen.getByTestId(`${defaultProps.testId}-engine`))
        .toHaveTextContent(`Search Engine:${seo.searchEngine}`);
      })

      test('renders positions with value', () => {
        render(<SearchResult {...defaultProps}/>)
        expect(screen.getByTestId(`${defaultProps.testId}-pos`))
        .toHaveTextContent(`Positions:${seo.positions}`);
      })

      test('renders occurances with value', () => {
        render(<SearchResult {...defaultProps}/>)
        expect(screen.getByTestId(`${defaultProps.testId}-num`))
        .toHaveTextContent(`Number of Occurances:${seo.numberOfOccurrences}`);
      })
   })
 });
