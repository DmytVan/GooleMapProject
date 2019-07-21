import React from 'react';

function InputForSingIn(props) {
    const {type, text, value, onChange} = props;
    return (
        <p>
            <label htmlFor={type} className='authorizationLabel'>{text}</label>
            <input className='authorizationField' type={type} id={type} minLength={5} required
                   value={value}
                   onChange={(event) => {
                       onChange(event);
                   }}/>
        </p>
    )
}

export default InputForSingIn;