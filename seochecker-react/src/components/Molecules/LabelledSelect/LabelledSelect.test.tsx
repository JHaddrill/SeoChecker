import * as React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render,  screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import LabelledSelect from '.';


const props = {
   testId: 'testId',
   name: 'Label',
   value: 'Option1',
   children: (<><option value='Option1'>Option1</option><option value='Option2'>Option2</option></>),
   onChange: jest.fn()
 }


it('renders correctly', () => {
   const tree = renderer.create(<LabelledSelect {...props} />).toJSON();
   expect(tree).toMatchSnapshot();
 });
 
 describe('LabelledSelect label', () => {

   const labelId = `${props.testId}-lbl`;

   test('renders', () => {
     render(<LabelledSelect {...props} />)
     expect(screen.getByTestId(labelId)).toBeInTheDocument();
   })

   test('label is set by name', () => {
      render(<LabelledSelect {...props} />)
      expect(screen.getByTestId(labelId)).toHaveTextContent(props.name);
    })
 });

 describe('LabelledSelect select', () => {
   test('renders', () => {
     render(<LabelledSelect {...props} />)
     expect(screen.getByTestId(props.testId)).toBeInTheDocument();
   })

   test('changing option triggers onChange callback', () => {
      render(<LabelledSelect {...props} />)

      fireEvent.change(screen.getByRole('listbox'), {
         target: { value: 'Option' },
       });
      
       expect(props.onChange).toHaveBeenCalledTimes(1);   
   })

   test('disabled set by prop', () => {
      render(<LabelledSelect disabled={true} {...props} />)
      expect(screen.getByTestId(props.testId)).toBeDisabled()
    })
  
    test('disabled set by prop', () => {
      render(<LabelledSelect disabled={false} {...props} />)
      expect(screen.getByTestId(props.testId)).not.toBeDisabled()
    })

    test('disabled set by prop', () => {
      render(<LabelledSelect  {...{...props, value:'Option2'}} />)
      expect(screen.getByTestId(props.testId)).toHaveValue('Option2')
    })

    test('renders children', () => {
      render(<LabelledSelect  {...props} />)
      expect(screen.getByText('Option1')).toBeInTheDocument()
      expect(screen.getByText('Option2')).toBeInTheDocument()
    })
 });
