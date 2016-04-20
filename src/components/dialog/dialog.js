import h from 'hyperscript'

const DialogCover = (scale, props)=>h('div.dialogCover',
    [
        h('div.dialogBody', [
            h('div.dialogText', props.dialogText.map((text, index)=> h('p', text)),
                {style: `font-size:${Math.ceil(scale * 32)}px`}),
            h('div.dialogExtraText', props.dialogExtraText.map((text, index)=> h('p', text)),
                {style: `font-size: ${Math.ceil(scale * 32)}px`}),
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

export default DialogCover;