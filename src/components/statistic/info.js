import h from 'hyperscript'
import Status from './status';

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
export default Info;