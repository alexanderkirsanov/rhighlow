import config from '../config';
import Info from './statistic/info';
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

const Score = (scale, props)=> h('div',
    [h('div.scoreTitle', 'SCORE', {
        style: {
            'font-size': `${Math.ceil(16 * scale)}px`,
            'padding-top': `${Math.ceil(20 * scale)}px`
        }
    }),
        h('div.score', props.score, {
            style: {
                'font-size': `${Math.ceil(60 * scale)}px`
            }
        })
    ]
);

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

const ProgressInfo = (scale, items, groupIcon) => {

    const color = groupIcon === 0 || groupIcon === 3 ? 'black' : 'red';
    const createStyle = (prop)=> {
        const result = [];
        result.push(prop.opened ? 'opened' : 'notopened');
        if (prop.preLast) {
            result.push('selected');
        }
        return result.join('.')
    };
    const createItem = (item) => h(`div.color-${color}.cell.${createStyle(item)}`, item.face, {
        style: {
            height: `${Math.ceil(25 * scale)}px`,
            'font-size': `${Math.ceil(20 * scale)}px`
        }
    });
    const firstPart = items.filter((x, index)=> {
        return index <= 6
    }).map(createItem);
    const secondPart = items.filter((x, index)=> {
        return index > 6
    }).map(createItem);

    return h('div.progressInfo',
        [
            h('div.icon', {
                style: {
                    width: `${Math.ceil(scale * 50)}px`,
                    height: `${Math.ceil(scale * 50)}px`,
                    'background-image': `url('resources/images/card-type-${groupIcon}.png')`,
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                }
            }),
            h('div.items', [...firstPart, ...secondPart])
        ], {
            style: {
                padding: `${Math.ceil(scale * 25)}px ${Math.ceil(scale * 25)}px ${Math.ceil(scale * 10)}px ${Math.ceil(scale * 25)}px`
            }
        }
    );
};
const ProgressComposite = (state)=> {
    const ORIGINAL_WIDTH = 295;
    const scale = state.width / ORIGINAL_WIDTH;
    const items = [Info(scale, state)];
    state.cards.forEach((cardSet, index)=> {
        items.push(ProgressInfo(scale, cardSet, index))
    });
    items.push(Score(scale, state));
    return h('div.progressComposite', items, {
        style: {
            position: 'absolute',
            width: `${state.width}px`,
            left: '0px',
            top: '0px',
            height: `${state.height}px`
        }
    })
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
export {Main, Button, ActionCard, Card, Spinner, ProgressComposite};