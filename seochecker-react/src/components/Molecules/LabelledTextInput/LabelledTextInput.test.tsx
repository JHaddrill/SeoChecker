import * as React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render,  screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import LabelledTextInput from '.';


const props = {
   testId: 'testId',
   name: 'Label',
   value: 'value',
   onChange: jest.fn()
 }


it('renders correctly', () => {
   const tree = renderer.create(<LabelledTextInput {...props} />).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('LabelledTextInput label', () => {

   const labelId = `${props.testId}-lbl`;

   test('renders', () => {
     render(<LabelledTextInput {...props} />)
     expect(screen.getByTestId(labelId)).toBeInTheDocument();
   })

   test('label is set by name', () => {
      render(<LabelledTextInput {...props} />)
      expect(screen.getByTestId(labelId)).toHaveTextContent(props.name);
    })
 });

 describe('LabelledTextInput select', () => {
   test('renders', () => {
     render(<LabelledTextInput {...props} />)
     expect(screen.getByTestId(props.testId)).toBeInTheDocument();
   })

   test('changing option triggers onChange callback', () => {
      render(<LabelledTextInput {...props} />)

      fireEvent.change(screen.getByTestId(props.testId), {
         target: { value: 'Value' },
       });
      
       expect(props.onChange).toHaveBeenCalledTimes(1);   
   })

   test('disabled set by prop', () => {
      render(<LabelledTextInput disabled={true} {...props} />)
      expect(screen.getByTestId(props.testId)).toBeDisabled()
    })
  
    test('disabled set by prop', () => {
      render(<LabelledTextInput disabled={false} {...props} />)
      expect(screen.getByTestId(props.testId)).not.toBeDisabled()
    })

    test('disabled set by prop', () => {
      render(<LabelledTextInput  {...{...props, value:'Option2'}} />)
      expect(screen.getByTestId(props.testId)).toHaveValue('Option2')
    })
 });
