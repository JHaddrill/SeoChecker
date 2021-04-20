import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import SearchBar from '.';
import "@testing-library/jest-dom/extend-expect";
import { render,  screen } from '@testing-library/react'
import configureStore from 'store/configureStore';
 
describe('SearchBar', () => {
  
  let state = {
    seoCheck: {
      isLoading: false,
      SeoResult: undefined,
      Error: ''
    },
  }

  let store = configureStore(state);
  let component = <Provider store={store}><SearchBar /></Provider> 

  beforeEach(() => {
    act(() => {
      store.dispatch({ type: 'SEO_CHECK_CLEAR' })
    });
  });

  it('renders correctly', () => {
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
 
  it('should render', () => {
      render(component);
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
 
  it('components should be disbaled when running', () => {
    act(() => {
      store.dispatch({ type: 'SEO_CHECK_REQUEST' })
    });
    render(component);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-btn')).toBeDisabled();
    expect(screen.getByTestId('engine-select')).toBeDisabled();
    expect(screen.getByTestId('url-input')).toBeDisabled();
    expect(screen.getByTestId('keyword-input')).toBeDisabled();
  });

  it('components should be disbaled when running', () => {
    render(component);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-btn')).toBeEnabled();
    expect(screen.getByTestId('engine-select')).toBeEnabled();
    expect(screen.getByTestId('url-input')).toBeEnabled();
    expect(screen.getByTestId('keyword-input')).toBeEnabled();
  });
});