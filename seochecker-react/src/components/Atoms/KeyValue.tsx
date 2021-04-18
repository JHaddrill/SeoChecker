import * as React from 'react';

type KeyValueProps = {
    Key: string,
    Value: any
}

const KeyValue = (props: KeyValueProps) => (
    <tr>
        <td><b>{props.Key}</b></td>
        <td style={{ paddingLeft: '10px' }}>{props.Value}</td>
    </tr>
);
export default KeyValue;

