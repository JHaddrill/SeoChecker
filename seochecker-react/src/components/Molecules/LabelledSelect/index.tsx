import FullColumn from 'components/Templates/FullColumn';
import * as React from 'react';

export type LabelledTextInputProps = {
    testId: string
    name: string
    value: string,
    disabled?: boolean,
    children?: React.ReactNode,
    onChange?: (value: string) => void
}

const LabelledSelect = (props: LabelledTextInputProps) => (
    <FullColumn>
        <div className='form-group'>
            <label data-testid={`${props.testId}-lbl`} >{props.name}</label>
            <select 
                data-testid={props.testId}
                className='form-control'
                value={props.value}
                role='listbox'
                onChange={event =>props.onChange && props.onChange(event.target.value)}
                disabled={props.disabled}
            >
                {props.children}
            </select>
        </div>
    </FullColumn>
);
export default LabelledSelect;

