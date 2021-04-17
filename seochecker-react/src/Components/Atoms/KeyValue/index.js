
import React from 'react';

const KeyValue = ({name, value}) => (
    <tr>
        <td><b>{name}</b></td>
        <td style={{paddingLeft:'10px'}}>{value}</td>
    </tr>
);

export default KeyValue;