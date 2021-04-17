import React from 'react';
import KeyValue from 'Components/Atoms/KeyValue'
const SearchResult = ({seoResult}) => {
    const positions  = (seoResult.positions.length > 0) ? seoResult.positions.join() : '0';
    
    return (  
        <div>
            {/* <h2>{seoResult.keyword}</h2>
            <h3>{seoResult.url}</h3>
            <p><span>Search Engine:</span><span>{seoResult.searchEngine}</span></p> */}
            <h1><span>Positions:</span><span>{positions}</span></h1>
            {/* <p><span>Occurances:</span><span>{seoResult.numberOfOccurences}</span></p> */}


            <table>
                <tbody>
                    <KeyValue name="Keyword:" value={seoResult.keyword} />
                    <KeyValue name="Url:" value={seoResult.url} />
                    <KeyValue name="Search Engine:" value={seoResult.searchEngine} />
                    <KeyValue name="Positions:" value={positions} />
                    <KeyValue name="Occurances:" value={seoResult.numberOfOccurences} />
                </tbody>
            </table>
        </div>
    )
}



export default SearchResult;