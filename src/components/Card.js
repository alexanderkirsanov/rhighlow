import React from 'react';
import config from '../config';
const cardStyle = {
    maxWidth: 300,
    border: 1,
    borderColor: 'red',
    marginRight: 20
};
const Card = (props)=> (
    <img style={cardStyle}  src={config.makeUrl(props)}/>
);

export default Card;