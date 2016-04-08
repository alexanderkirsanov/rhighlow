import config from '../config';
import h from 'hyperscript'


const Button = (props)=> h(`button.${props.className}`, {onclick: props.onClick});
const Card = (props)=>
    h('div', {
            style: {
                position: 'absolute',
                width: `${props.width}px`,
                left: `${props.left}px`,
                top: `${props.top}px`,
                'border-radius': '3%',
                overflow: 'hidden',
                height: `${props.height}px`
            }
        },
        h(`img.${props.className}`,
            {
                src: config.makeUrl(props)
            }, {
                style: {
                    'max-width': '100%',
                    'max-height': '100%'
                }
            }
        )
    );

const Spinner = ()=> {
    const items = [1, 2, 3, 4, 5].map(i=> h(`div.rect${i}`));
    return h('div.spinner', items);
};

export {Button, Card, Spinner};