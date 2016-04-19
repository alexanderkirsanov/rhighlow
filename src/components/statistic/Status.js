import h from 'hyperscript'
import {flatten} from '../../util/ArrayUtils';
import Progress from './progress';
const Status = (scale, props) => {
    
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

export default Status;