import FullColumn from 'components/Templates/FullColumn';
import * as React from 'react';

type LabelledTextInputProps = {
    name: string
    value: string,
    disabled: boolean,
    onChange: (value: string) => void
}

const LabelledTextInput = (props: LabelledTextInputProps) => (
    <FullColumn>
        <div className='form-group'>
            <label>{props.name}</label>
            <input className='form-control'
                name={props.name}
                type="text"
                onChange={event => props.onChange(event.target.value)}
                value={props.value}
                disabled={props.disabled}
            />
        </div>
    </FullColumn>
);
export default LabelledTextInput;

