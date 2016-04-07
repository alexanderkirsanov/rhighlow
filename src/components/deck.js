import h from 'hyperscript';

const deck = (element, board) => {
    const ORIGINAL_WIDTH = 1100;
    const ORIGINAL_HEIGHT = 700;
    const firstCard = () => {
        const ORIGINAL_RIGHT = 1041;
        const ORIGINAL_FIRST_WIDTH = 260;
        const ORIGINAL_FIRST_HEIGHT = 359;
        console.log(board.width);
        const left = Math.ceil(board.width * (ORIGINAL_WIDTH - ORIGINAL_RIGHT) / ORIGINAL_WIDTH);
        const width = Math.ceil(board.width * ORIGINAL_FIRST_WIDTH / ORIGINAL_WIDTH);
        const height = Math.ceil(width * ORIGINAL_FIRST_HEIGHT / ORIGINAL_FIRST_WIDTH);
        return h(`div.firstCard`, {
            style: {
                'background-color': '#2f2',
                position: 'absolute',
                width: `${width}px`,
                left: `${left}px`,
                height: `${height}px`
            }
        });
    };
    const render = (state) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.appendChild(firstCard());

    }
    return {render};
}

export default deck;