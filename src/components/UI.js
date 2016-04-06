import config from '../config';

const Button = (props)=> {
    const btn = document.createElement('button');
    btn.className = props.className;
    const text = document.createTextNode(props.text || '');
    btn.appendChild(text);
    return btn;
};

const Card = (props) => {
    const img = document.createElement('img');
    img.src = config.makeUrl(props);
    img.className = props.className;

    return img;
};
const Spinner = (props)=> {
    const spinner = document.createElement('spinner');
    const text = document.createTextNode('Loading');
    spinner.appendChild(text);
    spinner.className = 'loader';
    return spinner;
};
export {Button, Card, Spinner};