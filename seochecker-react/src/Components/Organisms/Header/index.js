import React from 'react';
import {COLORS} from 'Constants/colours'

const Header = () => (
	<div style={{backgroundColor: COLORS.Aqua, color: 'white', padding: '10px'}}>
		<div className = 'container' style={{textAlign: 'center'}}>
            <h1>SeoChecker</h1>
		</div>
	</div>
);

export default Header;
