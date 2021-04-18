import * as React from 'react';

class Header extends React.PureComponent {

    public render() {
        return (
            <React.Fragment>
                <div style={{backgroundColor: '#18cdb6', color: 'white', padding: '10px' }}>
                    <div className='container' style={{ textAlign: 'center' }}>
                        <h1>SeoChecker</h1>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Header;
