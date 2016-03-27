import React from 'react';

const Button = (props)=> (
    <p onClick={props.handleClick}>
        props.text
    </p>
);

export default Button;