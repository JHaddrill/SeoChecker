import * as React from 'react';

export type KeyValueProps = {
    testId?: string,
    Key?: string,
    Value?: any
}

const KeyValue = (props: KeyValueProps) => (
    <tr data-testid={props.testId}>
        <td data-testid={`${props.testId}-key` }><b>{props.Key}</b></td>
        <td data-testid={`${props.testId}-value`} style={{ paddingLeft: '10px' }}>{props.Value}</td>
    </tr>
);
export default KeyValue;

