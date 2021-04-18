import * as React from 'react';

type SideBySideProps = {
    Left: React.ReactNode,
    Right: React.ReactNode
}

const SideBySide = (props: SideBySideProps) => (
    <div className='row'>
        <div className="col-md-6 side">
            <div style={{ height: '100%' }}>{props.Left}</div>
        </div>

        <div className="col-md-6 side">
            <div style={{ height: '100%' }}>{props.Right}</div>
        </div>
    </div>
);

export default SideBySide;

