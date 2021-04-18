import * as React from 'react';

const Spinner = () => (
    <React.Fragment>
        <div>
            <div className="spinner-border" role="status" style={{ height: '8em', width: '8em' }}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </React.Fragment>
);

export default Spinner;

