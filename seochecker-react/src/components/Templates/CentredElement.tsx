import * as React from 'react';

const CentredElement = (props: { children?: React.ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {props.children}
    </div>
);

export default CentredElement;


