import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as SeoCheckStore from '../../store/SeoCheck';

type SearchBarProps =
    SeoCheckStore.SeoCheckState
    & typeof SeoCheckStore.actionCreators

const SearchBar = (props: SearchBarProps) => {
    const [url, setUrl] = useState<string>('www.sympli.com.au');
    const [keyword, setKeyword] = useState<string>('esettlements');
    const [engine, setEngine] = React.useState<string>('Google');

    const handleSearchClicked = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.seoCheck(keyword, url, engine);
    };

    return (
        <React.Fragment>
            <div className='col-md-12'>
                <h2>Search</h2>
                <form onSubmit={handleSearchClicked}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='form-group'>
                                <label>Keyword</label>
                                <input className='form-control'
                                    name='keyword'
                                    type="text"
                                    onChange={event => setKeyword(event.target.value)}
                                    value={keyword}
                                    disabled={props.isLoading}
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
                                    disabled={props.isLoading}
                                />
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='form-group'>
                                <label>Search Engine</label>
                                <select className='form-control'
                                    value={engine}
                                    onChange={event => setEngine(event.target.value)}
                                    disabled={props.isLoading}
                                >
                                    <option value='Google'>Google</option>
                                    <option value='Bing'>Bing</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <button className="btn btn-primary right"
                                disabled={props.isLoading}
                                style={{ backgroundColor: '#18cdb6', borderColor: '#18cdb6' }}>
                                Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default connect(
    (state: ApplicationState) => state.seoCheck, SeoCheckStore.actionCreators)(SearchBar as any);
