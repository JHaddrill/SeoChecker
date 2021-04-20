import * as React from 'react';

export type SpinnerProps = {
    size?: 'small' | 'large'
}

const Spinner = (props: SpinnerProps) => {

    const spinnerSize = props.size && props.size === 'large'
    ? { height: '8em', width: '8em' }
    : {}

    return (
        <React.Fragment>
            <div className="spinner-border" role="status" style={spinnerSize}>
                <span className="sr-only">Loading...</span>
            </div>
        </React.Fragment>
    );
}


export default Spinner;

