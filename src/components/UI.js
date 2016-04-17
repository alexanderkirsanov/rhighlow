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
const DialogCover = (scale, props)=>h('div.dialogCover',
    [
        h('div.dialogBody', [
            h('div.dialogText', props.dialogText.map((text, index)=> h('p', text)),
                {style: `font-size:${Math.ceil(scale * 32)}px`}),
            h('div.dialogExtraText', props.dialogExtraText.map((text, index)=> h('p', text)), {style: `font-size: ${Math.ceil(scale * 32)}px`}),
            h('div.dialogButton', props.dialogButtonText, {
                onclick: props.dialogOnClick,
                style: `font-size:${Math.ceil(scale * 32)}px`
            })
        ], {
            style: {
                top: `${props.dialogTop}px`,
                left: `${props.dialogLeft}px`,
                padding: `${scale * 40}px`
            }
        })
    ]
);
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
    if (props.score < 300) {
        classNames.push('disabled');
    }
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
const Progress = (cardLength, openedLength) => {
    return h('div.cardProgress', [
        h('div.progressBack', [
            h('div.progressFront', {
                style: {
                    width: `${100 - (openedLength / cardLength) * 100}%`
                }
            })
        ])]
    );
};
const Status = (scale, props) => {
    const flatten = list => list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );
    const cards = flatten(props.cards);
    const opened = cards.filter(x=>x.opened);
    return h(
        'div.status',
        [
            h('div.firstLine',
                [
                    h('span.cardTitle', 'Cards', {style: `font-size:${Math.ceil(scale * 13)}`}),
                    h('span.cardStats', `${opened.length}/${cards.length}`, {style: `font-size:${Math.ceil(scale * 13)}`})
                ]
            ),
            Progress(cards.length, opened.length)
        ]);
};
const Info = (scale, props) => {
    const height = Math.ceil(192 * scale);
    return h('div.info',
        [
            h('div.logo',
                {
                    style: {
                        height: `${height}px`
                    }
                }
            ),
            Status(scale, props)
        ]
    );
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
export {Main, Button, ActionCard, Card, Spinner, DialogCover, ProgressComposite, Info};