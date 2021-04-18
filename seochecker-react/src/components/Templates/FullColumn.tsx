import * as React from 'react';

const FullColumn = (props: { children?: React.ReactNode }) => (
    <div className='col-md-12'>
        {props.children}
    </div>
);

export default FullColumn;

