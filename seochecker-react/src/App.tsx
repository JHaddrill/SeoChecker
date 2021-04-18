import * as React from 'react';
import './custom.css'
import PageTemplate from './components/Templates/Page';
import SideBySide from './components/Templates/SideBySide';
import SearchBar from './components/Organisms/SearchBar';
import ResultDisplay from './components/Organisms/ResultDisplay';

export default () => (
	<PageTemplate>
		<SideBySide
			Left={<SearchBar />}
			Right={<ResultDisplay />}
		/>
	</PageTemplate>
);
