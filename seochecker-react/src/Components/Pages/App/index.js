import React from 'react';
import PageTemplate from 'Components/Templates/PageTemplate';
import SearchBar from 'Components/Organisms/SearchBar';
import Header from 'Components/Organisms/Header';
import ResultDisplay from 'Components/Organisms/ResultDisplay';
import { connect } from 'react-redux';
import SideBySide from '../../Templates/SideBySide';


const App = (seoResult) => (
	<div>
		<Header />
		<PageTemplate body={
			<SideBySide left={<SearchBar />} right={<ResultDisplay seoResult={seoResult} />}></SideBySide>
		} />
	</div>
);

const mapStateToProps = (state) => ({
	seoResult: state.seoCheck.seoResult,
});

export default connect(mapStateToProps)(App);
