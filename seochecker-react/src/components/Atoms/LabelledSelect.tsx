import FullColumn from 'components/Templates/FullColumn';
import * as React from 'react';

type LabelledTextInputProps = {
    name: string
    value: string,
    disabled: boolean,
    children?: React.ReactNode,
    onChange: (value: string) => void
}

const LabelledSelect = (props: LabelledTextInputProps) => (
    <FullColumn>
        <div className='form-group'>
            <label>{props.name}</label>
            <select className='form-control'
                value={props.value}
                onChange={event => props.onChange(event.target.value)}
                disabled={props.disabled}
            >
                {props.children}
            </select>
        </div>
    </FullColumn>
);
export default LabelledSelect;

