import React from 'react';

const TextInput = ({label}) => (
	<div>
		<div className='form-group'>
            <label>{label}</label>
            <input className='form-control' type="text" />
		</div>
	</div>
);

export default TextInput;
