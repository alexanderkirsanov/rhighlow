import config from '../config';
import h from 'hyperscript'


const Button = (props)=> h(`button.${props.className}`, {onclick: props.onClick});
const cardStyle = (props)=> {
    return {
        style: {
            position: 'absolute',
            width: `${props.width}px`,
            left: `${props.left}px`,
            top: `${props.top}px`,
            'border-radius': '3%',
            overflow: 'hidden',
            height: `${props.height}px`,
            'background-image': `url('${config.makeUrl(props)}')`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        }
    };
};
const Card = (props)=> h('div', cardStyle(props));

const ActionCard = (props) => h('div', [h('div.high'),h('div.low')], cardStyle(props));


const Spinner = ()=> {
    const items = [1, 2, 3, 4, 5].map(i=> h(`div.rect${i}`));
    return h('div.spinner', items);
};

export {Button, ActionCard, Card, Spinner};