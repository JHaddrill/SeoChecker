import * as React from 'react';

type FormattedFormProps = {
    children?: React.ReactNode,
    onSubmit?: (event: React.SyntheticEvent) => void
}

const FormattedForm = (props: FormattedFormProps) => {   
    return (
        <form onSubmit={props.onSubmit}>
            <div className='row'>
                {props.children}
            </div>
        </form>
    )
};

export default FormattedForm;

