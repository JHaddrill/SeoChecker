import React, { useState } from 'react';
import { connect } from 'react-redux';
import { seoCheck } from 'Redux/Actions';
import {COLORS} from 'Constants/colours'


const SearchBar = ({seoCheck, isLoading}) => 
{
    const [url, setUrl] = useState('www.sympli.com.au');
    const [keyword, setKeyword] = useState('esettlements');
    const [engine, setEngine] = useState('Google');


    const handleSearchClick = (e) => {
        e.preventDefault();
        seoCheck(keyword, url, engine);
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
                            value={keyword}
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
                            value={url}
                            disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='form-group'>
                            <label>Search Engine</label>
                            <select className='form-control'
                                value={engine} 
                                onChange={event => setEngine(event.target.value)}
                                disabled={isLoading}
                            >
                                <option value ='Google'>Google</option>
                                <option value ='Bing'>Bing</option>
                            </select>
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
	seoCheck: (keyword, url, engine) => {
        dispatch(seoCheck(keyword, url, engine));}
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
