import * as React from 'react';

class Header extends React.PureComponent {

    public render() {
        return (
            <React.Fragment>
                <div style={{backgroundColor: '#18cdb6', color: 'white', padding: '10px' }}>
                    <div data-testid='header' className='container' style={{ textAlign: 'center' }}>
                        <h1>Seo Checker</h1>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Header;
