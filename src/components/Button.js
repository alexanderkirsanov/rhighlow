import React from 'react';

const Button = (props)=> (
    <div onClick={props.action}>
        {props.text}
    </div>
);

export default Button;