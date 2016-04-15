import {Card, ActionCard, ProgressComposite, DialogCover} from './UI';
import move from 'move-js';
const deck = (element, board, action) => {
    const ORIGINAL_WIDTH = 1100;
    const ORIGINAL_HEIGHT = 700;
    const proportion = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;

    if (board.width / proportion > board.height) {
        board.width = board.height * proportion;
    }
    const getCoordinates = (originalLeft, originalWidth, originalHeight) => {

        const left = Math.ceil(board.width * originalLeft / ORIGINAL_WIDTH);
        const width = Math.ceil(board.width * originalWidth / ORIGINAL_WIDTH);
        const height = Math.ceil(width * originalHeight / originalWidth);
        const maxHeight = Math.ceil(width * ORIGINAL_HEIGHT / originalWidth);
        const top = Math.ceil((maxHeight - height) / 2);
        return {left, top, width, height};
    };

    const firstCard = () => {
        const ORIGINAL_FIRST_WIDTH = 260;
        const ORIGINAL_LEFT = 1090 - ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 359;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'firstCard'}));
    };

    const secondCard = () => {
        const ORIGINAL_FIRST_WIDTH = 286;
        const ORIGINAL_LEFT = 1079 - ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 394;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'secondCard'}));
    };

    const thirdCard = () => {
        const ORIGINAL_FIRST_HEIGHT = 450;
        const ORIGINAL_FIRST_WIDTH = 325;
        const ORIGINAL_LEFT = 1062 - ORIGINAL_FIRST_WIDTH;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'thirdCard'}));
    };

    const centralCard = (state = {suite: null, face: null}, action = {}) => {
        const {suite, face} = state;
        const ORIGINAL_FIRST_HEIGHT = 530;
        const ORIGINAL_FIRST_WIDTH = Math.ceil(ORIGINAL_FIRST_HEIGHT / 1.44);
        const ORIGINAL_LEFT = 1030 - ORIGINAL_FIRST_WIDTH;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return ActionCard(Object.assign(coordinates, {className: 'centralCard', suite, face}, action));
    };


    const bigCard = (state = {suite: null, face: null}) => {
        const {suite, face} = state;
        const ORIGINAL_FIRST_HEIGHT = 620;
        const ORIGINAL_FIRST_WIDTH = Math.ceil(ORIGINAL_FIRST_HEIGHT / 1.44);
        const ORIGINAL_LEFT = 710 - ORIGINAL_FIRST_WIDTH;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'bigCard', suite, face}));
    };

    const progressInfo = (state) => {
        const ORIGINAL_INFO_WIDTH = 295;
        const ORIGINAL_LEFT = 0;
        const ORIGINAL_HEIGHT = 700;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_INFO_WIDTH, ORIGINAL_HEIGHT);
        return ProgressComposite(Object.assign(coordinates, state));
    };
    const render = (state) => {
        const {cardImages} = state;
        const draw = () => {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(progressInfo(state));

            const cards = [firstCard(),
                secondCard(),
                thirdCard(),
                centralCard(cardImages[1], action),
                bigCard(cardImages[0])];
            cards.forEach(card => element.appendChild(card));
            const card = $(".card");
            card.flip({autoSize: false, trigger: 'manual'});
            card.flip(true);
        };
        console.log(state);
        console.log(state.cardImages[1]);
        if (state.game === 'started') {
            if (state.cardImages.length < 52) {
                $(".card").flip(false);
                setTimeout(()=> {
                    draw()
                }, 600);
            } else {
                draw();
            }
        } else if (state.game === 'loose') {
            element.appendChild(DialogCover());
        }
    };
    return {render};
};

export default deck;