import config from '../config';
import h from 'hyperscript'
import * as CardItem from '../card';

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

const ActionCard = (props) => h('div', [h('div.high'), h('div.low')], cardStyle(props));

const Status = (props) => {
    const flatten = list => list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );
    const cards = flatten(props.cards);
    const opened = cards.filter(x=>x.open);
    return h(
        'div.status',
        [
            h('div.firstLine',
                [
                    h('p', 'Cards'),
                    h('p', `${opened}/${cards.length}`)
                ]
            ),
            h('progress.cardProgress', {max: cards.length, value: opened})
        ]);
};
const Info = (scale, props) => {
    const height = 192 * scale;
    return h('div.info', [h('div.logo', {style: {height: `${height}px`}}), Status(props)]);
};
const ProgressInfo = (scale, items, groupIcon) => {

    const createItem = (item) => h(`div.cell.${item.open ? 'opened' : 'notopened'}`, item.face, {
        style: {height: `${25 * scale}px`}
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
                    width: `${scale * 50}px`,
                    height: `${scale * 50}px`,
                    'background-image': `url('resources/images/card-type-${groupIcon}.png')`,
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                }
            }),
            h('div.items', [...firstPart, ...secondPart])
        ]
    );
};
const ProgressComposite = (state)=> {
    const ORIGINAL_WIDTH = 295;
    const scale = state.width / ORIGINAL_WIDTH;
    const items = [Info(scale, state)];
    state.cards.forEach((cardSet, index)=> {
        items.push(ProgressInfo(scale, cardSet, index))
    });
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

export {Button, ActionCard, Card, Spinner, ProgressComposite, Info};