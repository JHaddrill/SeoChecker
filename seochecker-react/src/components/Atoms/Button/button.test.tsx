import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render,  screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import Button, { ButtonProps } from './';

const props: ButtonProps = {
  testId: "TestButton",
  label: "LabelTest",
  onClick: jest.fn()
}

it('renders correctly', () => {
  const tree = renderer.create(<Button {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Button', () => {
  test('loads', () => {
    render(<Button {...props} />)
    expect(screen.getByTestId('TestButton')).toBeInTheDocument();
  })

  test('className doesn not contain right when position is left', () => {
    render(<Button position='left' {...props} />)
    expect(screen.getByTestId('TestButton').className).toContain('btn btn-primary')
  })

  test('className contains right when position is right', () => {
    render(<Button position='right' {...props} />)
    expect(screen.getByTestId('TestButton').className).toContain('btn btn-primary right')
  })

  test('disabled set by prop', () => {
    render(<Button disabled={true} {...props} />)
    expect(screen.getByTestId('TestButton')).toBeDisabled()
  })

  test('disabled set by prop', () => {
    render(<Button disabled={false} {...props} />)
    expect(screen.getByTestId('TestButton')).not.toBeDisabled()
  })

  test('label renders as text', () => {
    render(<Button {...props} />)
    expect(screen.getByTestId('TestButton').innerHTML).toEqual('LabelTest')
  })

  test('onClick callback triggered on click', () => {
    render(<Button {...props} />)
    expect(screen.getByTestId('TestButton').innerHTML).toEqual('LabelTest')

    fireEvent.click(screen.getByTestId('TestButton'), {
      target: { value: 'Option' },
    });
   
    expect(props.onClick).toHaveBeenCalledTimes(1); 
  })
});




