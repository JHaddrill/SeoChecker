import FullColumn from 'components/Templates/FullColumn';
import * as React from 'react';

export type LabelledTextInputProps = {
    testId: string,
    name: string
    value: string,
    disabled?: boolean,
    onChange?: (value: string) => void
}

const LabelledTextInput = (props: LabelledTextInputProps) => (
    <FullColumn>
        <div className='form-group'>
            <label data-testid={`${props.testId}-lbl`}>{props.name}</label>
            <input data-testid={props.testId} className='form-control'
                name={props.name}
                type="text"
                onChange={event =>props.onChange && props.onChange(event.target.value)}
                value={props.value}
                disabled={props.disabled}
            />
        </div>
    </FullColumn>
);
export default LabelledTextInput;

