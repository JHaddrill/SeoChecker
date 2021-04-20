import * as React from 'react';
import renderer from 'react-test-renderer';
import { render,  screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import Header from '.';

it('renders correctly', () => {
   const tree = renderer.create(<Header/>).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('Header', () => {
   test('renders', () => {
     render(<Header />)
     expect(screen.getByTestId('header')).toBeInTheDocument();
   })
 });
