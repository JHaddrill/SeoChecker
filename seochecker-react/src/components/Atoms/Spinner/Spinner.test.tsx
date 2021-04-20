import * as React from 'react';
import renderer from 'react-test-renderer';
import { render,  screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import Spinner from '.';


it('renders correctly', () => {
   const tree = renderer.create(<Spinner />).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('Spinner', () => {
   test('renders with no props', () => {
     render(<Spinner />)
     expect(screen.getByRole('status')).toBeInTheDocument();
   })
 });