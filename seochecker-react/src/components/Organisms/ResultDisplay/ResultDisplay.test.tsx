import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import "@testing-library/jest-dom/extend-expect";
import { render,  screen } from '@testing-library/react'
import configureStore from 'store/configureStore';
import ResultDisplay from '.';
 
describe('SearchBar', () => {
  
  let state = {
    seoCheck: {
      isLoading: false,
      SeoResult: undefined,
      Error: ''
    },
  }

  let store = configureStore(state);
  let component = <Provider store={store}><ResultDisplay /></Provider> 

  beforeEach(() => {
    act(() => {
      store.dispatch({ type: 'SEO_CHECK_CLEAR' });
    });
  });

  it('renders correctly', () => {
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
 
  it('should render', () => {
      render(component);
      expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });

  it('should render error', () => {
    const errorMsg = 'an error occured'
    const expected = 'An unexpected error occured: ' + errorMsg;
    act(() => {
      store.dispatch({ type: 'SEO_CHECK_ERROR', error: errorMsg });
    });

    render(component);
    expect(screen.getByTestId('error-msg')).toBeInTheDocument();
    expect(screen.getByTestId('error-msg')).toHaveTextContent(expected);
  });
 

  it('should render SeoResult', () => {
    const res = {
      positions: [1,2],
      keyword: 'Keyword',
      url: 'Url',
      searchEngine: 'Engine',
      numberOfOccurrences: 2
    }
    act(() => {
      store.dispatch({ type: 'SEO_CHECK_SUCCESS', seoResult: res });
    });

    render(component);
    expect(screen.getByTestId('search-result')).toBeInTheDocument();
  });
 
  // it('components should be disbaled when running', () => {
  //   store.dispatch({ type: 'SEO_CHECK_REQUEST' })
  //   render(component);
  //   expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  //   expect(screen.getByTestId('search-btn')).toBeDisabled();
  //   expect(screen.getByTestId('engine-select')).toBeDisabled();
  //   expect(screen.getByTestId('url-input')).toBeDisabled();
  //   expect(screen.getByTestId('keyword-input')).toBeDisabled();
  // });

  // it('components should be disbaled when running', () => {
  //   render(component);
  //   expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  //   expect(screen.getByTestId('search-btn')).toBeEnabled();
  //   expect(screen.getByTestId('engine-select')).toBeEnabled();
  //   expect(screen.getByTestId('url-input')).toBeEnabled();
  //   expect(screen.getByTestId('keyword-input')).toBeEnabled();
  // });
});