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

const component = <table><tbody><KeyValue {...props} /></tbody></table>

it('renders correctly', () => {
   const tree = renderer.create(component).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('KeyValue', () => {
   test('renders', () => {
     render(component)
     expect(screen.getByTestId('KeyValueId')).toBeInTheDocument();
   })

   test('renders with key', () => {
      render(component)
      expect(screen.getByTestId('KeyValueId-key').textContent).toBe(props.Key);
   })

   test('renders with value', () => {
      render(component)
      expect(screen.getByTestId('KeyValueId-value').textContent).toBe(props.Value);
   })
 });
