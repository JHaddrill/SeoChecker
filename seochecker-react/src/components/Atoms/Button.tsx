import * as React from 'react';

type ButtonProps = {
    label: string
    disabled: boolean,
    position?: 'left' | 'right',
    onClick?: (e: React.SyntheticEvent) => void
}

const Button = (props: ButtonProps) =>  {

    const btnClass = (props.position && props.position === 'right') 
    ? "btn btn-primary right"
    : "btn btn-primary";

    return (
        <button className={btnClass} disabled={props.disabled} onClick={props.onClick} style={{ backgroundColor: '#18cdb6', borderColor: '#18cdb6' }}>{props.label}</button>
    )
};

export default Button;
