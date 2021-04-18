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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Spinner />
                </div>
            );
        }
        else if (this.props.SeoResult) {
            return (<SearchResult SeoResult={this.props.SeoResult} />)
        }
        else if(this.props.Error) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'red' }}>
                    <p>An unexpected error occured: {this.props.Error}</p>
                </div> 
            )

        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                Results will be shown here
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.seoCheck)(ResultDisplay as any);
