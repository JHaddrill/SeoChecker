import React from 'react';
import Header from '../Atoms/Header';

const PageTemplate = (props: { children?: React.ReactNode }) => (
	<React.Fragment>
		<Header/>
		<div className="container" style={{ padding: '10px 0' }}>
			{props.children}
		</div>
	</React.Fragment>
);

export default PageTemplate;
