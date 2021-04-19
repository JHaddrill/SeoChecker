import * as React from 'react';
import { SeoResult } from '../../../types/SeoResult';
import KeyValue from '../KeyValue';

export type SearchResultProps = {
    testId: string,
    SeoResult: SeoResult
}

class SearchResult extends React.PureComponent<SearchResultProps> {

    positions: string = (this.props.SeoResult.positions && this.props.SeoResult.positions.length > 0) ? this.props.SeoResult.positions.join(', ') : '0';

    public render() {
        return (
            <React.Fragment>
                <div data-testid={this.props.testId} className='col-md-12'>
                    <div className='col-md-12' >
                        <h2>Positions:</h2>
                        <p data-testid={`${this.props.testId}-pos-result`} style={{ fontSize: '4vw' }}>{this.positions}</p>
                    </div>

                    <div className='col-md-12' style={{ borderTop: '1px #ced4da solid', paddingTop: '10px' }}>
                        <h3>Details:</h3>
                        <table>
                            <tbody>
                                <KeyValue testId={`${this.props.testId}-keyword`} Key="Keyword:" Value={this.props.SeoResult.keyword} />
                                <KeyValue testId={`${this.props.testId}-url`} Key="Url:" Value={this.props.SeoResult.url} />
                                <KeyValue testId={`${this.props.testId}-engine`} Key="Search Engine:" Value={this.props.SeoResult.searchEngine} />
                                <KeyValue testId={`${this.props.testId}-pos`} Key="Positions:" Value={this.positions} />
                                <KeyValue testId={`${this.props.testId}-num`} Key="Number of Occurances:" Value={this.props.SeoResult.numberOfOccurrences} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default SearchResult;
