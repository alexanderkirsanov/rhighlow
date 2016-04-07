import config from '../config';
import h from 'hyperscript'


const Button = (props)=> h(`button.${props.className}`, {onclick: props.onClick});
const Card = (props)=> h(`img.${props.className}`, {src: config.makeUrl(props)});

const Spinner = ()=> {
    const items = [1, 2, 3, 4, 5].map(i=> h(`div.rect${i}`));
    return h('div.spinner',items);
};

export {Button, Card, Spinner};