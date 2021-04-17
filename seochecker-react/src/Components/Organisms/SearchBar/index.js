import React, { useState } from 'react';
import { connect } from 'react-redux';
import { seoCheck } from 'Redux/Actions';
import {COLORS} from 'Constants/colours'


const SearchBar = ({seoCheck, isLoading}) => 
{
    const [url, setUrl] = useState('');
    const [keyword, setKeyword] = useState('');


    const handleSearchClick = (e) => {
        e.preventDefault();
        seoCheck(keyword, url);
    };

    return (
        <div>
            <h2>Search</h2>
            <form onSubmit={handleSearchClick}>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='form-group'>
                            <label>Keyword</label>
                            <input className='form-control'
                            name='keyword'
                            type="text"
                            onChange={event => setKeyword(event.target.value)}
                            disabled={isLoading}
                            />
                        </div>
                    </div>                
                    <div className='col-md-12'>
                        <div className='form-group'>
                            <label>Url</label>
                            <input className='form-control' 
                            name='url'
                            type="text"
                            onChange={event => setUrl(event.target.value)}
                            disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <button className="btn btn-primary right"
                        disabled={isLoading}
                        style={{backgroundColor: COLORS.Aqua, borderColor: COLORS.Aqua}}>
                            Search</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

const mapStateToProps = (state) => ({
    isLoading: state.seoCheck.checkingSeo
});

const mapDispatchToProps = (dispatch) => ({
	seoCheck: (keyword,url) => {
        dispatch(seoCheck(keyword,url));}
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
