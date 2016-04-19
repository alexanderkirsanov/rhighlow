import h from 'hyperscript'

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
export default Progress;