import h from 'hyperscript'

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
export default Score;