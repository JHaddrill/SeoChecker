import Button from 'components/Atoms/Button';
import LabelledSelect from 'components/Molecules/LabelledSelect';
import LabelledTextInput from 'components/Molecules/LabelledTextInput';
import FormattedForm from 'components/Templates/FormattedForm';
import FullColumn from 'components/Templates/FullColumn';
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
            <FullColumn>
                <h2>Search</h2>
                <FormattedForm>
                    <LabelledTextInput testId='keyword-input' name='Keyword' value={keyword} disabled={props.isLoading}onChange={setKeyword} />
                    <LabelledTextInput testId='url-input' name='Url' value={url} disabled={props.isLoading} onChange={setUrl} />
                    <LabelledSelect testId='engine-select' name='Search Engine' value={engine} disabled={props.isLoading} onChange={setEngine}>
                        <option value='Google'>Google</option>
                        <option value='Bing'>Bing</option>
                    </LabelledSelect>
                    <FullColumn>
                        <Button testId='search-btn' label='Search' disabled={props.isLoading} position='right' onClick={handleSearchClicked} />
                    </FullColumn>
                </FormattedForm>
            </FullColumn>
        </React.Fragment>
    );
}

export default connect(
    (state: ApplicationState) => state.seoCheck, SeoCheckStore.actionCreators)(SearchBar as any);
