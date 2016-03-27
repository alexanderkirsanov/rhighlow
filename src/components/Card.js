import React from 'react';
import config from '../config';

const Card = (props)=> (
    <img src={config.makeUrl(props)}/>
);

export default Card;