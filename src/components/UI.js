import config from '../config';
import h from 'hyperscript'

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
const Card = (props)=> h(`div.${props.className}`, cardStyle(props));


const Button = (props)=> h(`div.button.${props.className}`, h('div', props.label, {
        style: {
            'font-size': props.fontSize
        }
    }),
    {
        onclick: props.onClick,
        style: {
            position: 'absolute',
            width: `${Math.ceil(props.width)}px`,
            height: `${Math.ceil(props.height)}px`,
            top: `${Math.ceil(props.top)}px`,
            left: `${Math.ceil(props.left)}px`
        }
    });

const ActionCard = (props) => {
    const originalWidth = 406;
    const originalHeight = 560;
    const buttonWidth = 180;
    const buttonHeight = 80;
    const right = 110;
    const highTop = 230;
    const lowTop = 325;
    const recommendedTop = 440;
    const scaleW = props.width / originalWidth;
    const scaleH = props.height / originalHeight;
    const buttonCoords = {
        width: scaleW * buttonWidth,
        height: scaleH * buttonHeight,
        left: scaleW * (originalWidth - right - buttonWidth)
    };
    const high = Button(Object.assign(buttonCoords, {
        onClick: props.highClick,
        className: 'high',
        label: 'HIGH',
        fontSize: `${scaleH * 33}px`,
        top: highTop * scaleH
    }));
    const low = Button(Object.assign(buttonCoords, {
        onClick: props.lowClick,
        className: 'low',
        label: 'LOW',
        fontSize: `${scaleH * 33}px`,
        top: lowTop * scaleH
    }));
    const classNames = ['recommend'];
    const recommend = Button(Object.assign(buttonCoords, {
        onClick: props.recommendClick,
        className: classNames.join('.'),
        label: '',
        fontSize: `${scaleH * 15}px`,
        top: recommendedTop * scaleH
    }));

    return h('div.card.cardBorder', [h('div.back', [high, low, recommend], {
        style: {
            position: 'absolute',
            width: `${props.width}px`,
            left: `0px`,
            top: `0px`,
            height: `${props.height}px`,
            'background-image': `url('${config.makeUrl({})}')`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
        }
    }), h('div.front', {
        style: {
            'background-image': `url('${config.makeUrl(props)}')`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%',
            width: `${props.width}px`,
            height: `${props.height}px`
        }
    })], {
        style: {
            position: 'absolute',
            width: `${props.width}px`,
            left: `${props.left}px`,
            top: `${props.top}px`,
            'border-radius': '3%',
            overflow: 'hidden',
            height: `${props.height}px`
        }
    });
};

const Spinner = ()=> {
    const items = [1, 2, 3, 4, 5].map(i=> h(`div.rect${i}`));
    return h('div.spinner', items);
};
const Main = (height, width, items) => {
    return h('div.main', items, {
        style: {
            height: `${Math.ceil(height) + 5}px`,
            width: `${Math.ceil(width)}px`
        }
    })
};
export {Main, Button, ActionCard, Card, Spinner};