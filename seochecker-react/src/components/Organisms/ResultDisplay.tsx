import CentredElement from 'components/Templates/CentredElement';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as SeoCheckStore from '../../store/SeoCheck';
import Spinner from '../Atoms/Spinner';
import SearchResult from '../Molecules/SearchResult';

class ResultDisplay extends React.PureComponent<SeoCheckStore.SeoCheckState> {
    
    public render() {
        if (this.props.isLoading) {
            return (
                <CentredElement>
                    <Spinner size='large' />
                </CentredElement>
            );
        }
        else if (this.props.SeoResult) {
            return (<SearchResult SeoResult={this.props.SeoResult} />)
        }
        else if(this.props.Error) {
            return (
                <CentredElement>
                    <p>An unexpected error occured: {this.props.Error}</p>
                </CentredElement>
            )
        }
        return (
            <CentredElement>
                <span>Results will be shown here</span>
            </CentredElement>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.seoCheck)(ResultDisplay as any);
