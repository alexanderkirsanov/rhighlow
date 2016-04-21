import Info from '../statistic/info';
import h from 'hyperscript'
import ProgressInfo from './ProgressInfo';
import Score from './Score';

const ProgressComposite = (scale, state)=> {
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

export default ProgressComposite;