import CentredElement from 'components/Templates/CentredElement';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as SeoCheckStore from '../../../store/SeoCheck';
import Spinner from '../../Atoms/Spinner';
import SearchResult from '../../Molecules/SearchResult';

export type ResultDisplayProps = SeoCheckStore.SeoCheckState

const ResultDisplay = (props: ResultDisplayProps) => {
    if (props.isLoading) {
        return (
            <CentredElement>
                <Spinner size='large' />
            </CentredElement>
        );
    }
    else if (props.SeoResult) {
        return (<SearchResult testId='search-result' SeoResult={props.SeoResult} />)
    }
    else if(props.Error) {
        return (
            <CentredElement >
                <p data-testid='error-msg'>An unexpected error occured: {props.Error}</p>
            </CentredElement>
        )
    }
    return (
        <CentredElement>
            <span data-testid='placeholder'>Results will be shown here</span>
        </CentredElement>
    );
}

export default connect(
    (state: ApplicationState) => ({...state.seoCheck}))(ResultDisplay as any);
