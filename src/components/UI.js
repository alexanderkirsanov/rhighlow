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
const Info = (props) => {
    return h('div.info', [h('div.logo'), Status(props)]);
};
const ProgressInfo = (items, groupIcon) => {

    const createItem = (item) => h(`div.cell.${item.open ? 'opened' : 'notopened'}`, item.face);
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
                    'background-image': `url('${groupIcon}')`,
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                }
            }),
            h('div.items', [...firstPart, ...secondPart])
        ]
    );
};
const ProgressComposite = (state)=> {
    const items = [Info(state)];
    state.cards.forEach((cardSet, index)=> {
        items.push(ProgressInfo(cardSet, index))
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