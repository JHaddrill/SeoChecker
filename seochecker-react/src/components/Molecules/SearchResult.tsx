import * as React from 'react';
import { SeoResult } from '../../types/SeoResult';
import KeyValue from '../Atoms/KeyValue';

type SearchResultProps = {
    SeoResult: SeoResult
}

class SearchResult extends React.PureComponent<SearchResultProps> {

    positions: string = (this.props.SeoResult.positions && this.props.SeoResult.positions.length > 0) ? this.props.SeoResult.positions.join(', ') : '0';

    public render() {
        return (
            <React.Fragment>
                <div className='col-md-12' >
                    <h2>Positions:</h2>
                    <p style={{ fontSize: '4vw' }}>{this.positions}</p>
                </div>

                <div className='col-md-12' style={{ borderTop: '1px #ced4da solid', paddingTop: '10px' }}>
                    <h3>Details:</h3>
                    <table>
                        <tbody>
                            <KeyValue Key="Keyword:" Value={this.props.SeoResult.keyword} />
                            <KeyValue Key="Url:" Value={this.props.SeoResult.url} />
                            <KeyValue Key="Search Engine:" Value={this.props.SeoResult.searchEngine} />
                            <KeyValue Key="Positions:" Value={this.positions} />
                            {/* <KeyValue Key="Number of Occurances:" Value={this.props.SeoResult.NumberOfOccurances} /> */}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
};

export default SearchResult;
