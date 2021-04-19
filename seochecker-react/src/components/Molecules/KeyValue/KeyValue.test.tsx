import * as React from 'react';
import renderer from 'react-test-renderer';
import { render,  screen } from '@testing-library/react'
import KeyValue, { KeyValueProps } from './';
import "@testing-library/jest-dom/extend-expect";

const props: KeyValueProps = {
   testId: "KeyValueId",
   Key: "Key",
   Value: "Value"
}

it('renders correctly', () => {
   const tree = renderer.create(<KeyValue {...props} />).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('KeyValue', () => {
   test('renders', () => {
     render(<tbody><KeyValue {...props} /></tbody>)
     expect(screen.getByTestId('KeyValueId')).toBeInTheDocument();
   })

   test('renders with key', () => {
      render(<tbody><KeyValue {...props} /></tbody>)
      expect(screen.getByTestId('KeyValueId-key').textContent).toBe(props.Key);
   })

   test('renders with value', () => {
      render(<tbody><KeyValue {...props} /></tbody>)
      expect(screen.getByTestId('KeyValueId-value').textContent).toBe(props.Value);
   })
 });
