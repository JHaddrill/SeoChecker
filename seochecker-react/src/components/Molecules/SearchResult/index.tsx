import * as React from 'react';
import { SeoResult } from '../../../types/SeoResult';
import KeyValue from '../KeyValue';

export type SearchResultProps = {
    testId: string,
    SeoResult: SeoResult
}

const SearchResult = (props: SearchResultProps) => {

    let positions: string = (props.SeoResult.positions && props.SeoResult.positions.length > 0) ? props.SeoResult.positions.join(', ') : '0';

    return (
        <React.Fragment>
            <div data-testid={props.testId} className='col-md-12'>
                <div className='col-md-12' >
                    <h2>Positions:</h2>
                    <p data-testid={`${props.testId}-pos-result`} style={{ fontSize: '4vw' }}>{positions}</p>
                </div>

                <div className='col-md-12' style={{ borderTop: '1px #ced4da solid', paddingTop: '10px' }}>
                    <h3>Details:</h3>
                    <table>
                        <tbody>
                            <KeyValue testId={`${props.testId}-keyword`} Key="Keyword:" Value={props.SeoResult.keyword} />
                            <KeyValue testId={`${props.testId}-url`} Key="Url:" Value={props.SeoResult.url} />
                            <KeyValue testId={`${props.testId}-engine`} Key="Search Engine:" Value={props.SeoResult.searchEngine} />
                            <KeyValue testId={`${props.testId}-pos`} Key="Positions:" Value={positions} />
                            <KeyValue testId={`${props.testId}-num`} Key="Number of Occurrences:" Value={props.SeoResult.numberOfOccurrences} />
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
} 

export default SearchResult;
