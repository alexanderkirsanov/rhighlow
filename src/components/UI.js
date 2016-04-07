import config from '../config';

const createElement = (tag, props)=> {
    const element = document.createElement(tag);
    for (let prop of Object.keys(props)) {
        element[prop] = props[prop];
    }
    return element;
};
const Button = (props)=> {
    const btn = createElement('button', {className: props.className});
    const text = document.createTextNode(props.text || '');
    btn.appendChild(text);
    return btn;
};

const Card = (props) => {
    const img = createElement('img', {
        className: props.className,
        src: config.makeUrl(props)
    });
    return img;
};
const Spinner = ()=> {
    const spinner = createElement('div', {
        className: 'spinner'
    });
    [1, 2, 3, 4, 5].forEach(i=> {
        spinner.appendChild(createElement('div', {className: `rect${i}`}));
    });
    return spinner;
};
export {Button, Card, Spinner};