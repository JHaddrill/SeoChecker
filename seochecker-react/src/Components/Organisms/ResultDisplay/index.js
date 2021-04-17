import React from 'react';
import Spinner from 'Components/Atoms/Spinner'
import { connect } from 'react-redux';
import SearchResult from '../../Molecules/SearchResult';

function ResultDisplay ({checkingSeo, seoResult}) {
    
    if(checkingSeo) {
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                <Spinner />
            </div>
        );
    } 
    else if (seoResult) {
        return ( <SearchResult seoResult={seoResult} /> )
    }
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
            Results will be shown here
        </div>
    )
    
}

const mapStateToProps = (state) =>  {
    return ({
        checkingSeo: state.seoCheck?.checkingSeo ?? false,
        seoResult: state.seoCheck?.seoResult,
    })
};

export default connect(mapStateToProps)(ResultDisplay);