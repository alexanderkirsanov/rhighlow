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
    const opened = props.cards.filter(x=>x.open);
    return h(
        'div.status',
        [
            h('div.firstLine',
                [
                    h('p', 'Cards'),
                    h('p', `${opened}/${props.cards.length}`)
                ]
            ),
            h('progress.cardProgress', {max: props.cards.length, value: opened})
        ]);
};
const Info = (props) => {
    return h('div.info', [h('div.logo'), Status(props)]);
};
const ProgressInfo = (props) => {

    const numFaces = 13;
    const myDeck = Array.from(new Array(numFaces), (x, n) => CardItem.default(n, props.suiteIndex));
    const items = myDeck.map(x=> {
        return {
            face: x.face[0].toUpperCase(),
            opened: (props.opened || []).indexOf(x.face) !== -1
        }
    }).reverse();
    const createItem = (item) => h(`p.${item.opened ? 'opened' : 'notopened'}`, item.face);
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
                    'background-image': `url('${props.groupIcon}')`,
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                }
            }),
            h('div.items', [h('div', ...firstPart), h('div', ...secondPart)])
        ]
    );
};
const Spinner = ()=> {
    const items = [1, 2, 3, 4, 5].map(i=> h(`div.rect${i}`));
    return h('div.spinner', items);
};

export {Button, ActionCard, Card, Spinner, ProgressInfo, Info};