
import React from 'react';

const Spinner = () => {
    return (
        <div>
            <div className="spinner-border" role="status" style={{height: '8em', width: '8em'}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;