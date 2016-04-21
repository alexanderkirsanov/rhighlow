import h from 'hyperscript'

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

export default ProgressInfo;