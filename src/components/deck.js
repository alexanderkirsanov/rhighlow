import {Card, ActionCard, ProgressComposite, Main, DialogCover} from './UI';
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
            const items = [];
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            items.push(progressInfo(state));

            const cards = [firstCard(),
                secondCard(),
                thirdCard(),
                centralCard(cardImages[1], action),
                bigCard(cardImages[0])];
            items.push.apply(items, cards);
            const coordinates = getCoordinates(0, ORIGINAL_WIDTH, ORIGINAL_HEIGHT);
            element.appendChild(Main(coordinates.height, coordinates.width, items));
            const card = $(".card");
            card.flip({autoSize: false, trigger: 'manual'});
            card.flip(true);
        };
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
        } else if (state.game === 'loose' || state.game === 'win') {
            const flatten = list => list.reduce(
                (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
            );
            const cards = flatten(state.cards);
            const opened = cards.filter(x=>x.opened);
            const count =  state.game === 'loose'? opened.length - 1: opened.length;
            element.firstChild.appendChild(DialogCover(board.width / ORIGINAL_WIDTH, {
                dialogText: [
                    'Congratulations you got',
                    `${count} correct in a row`,
                    'Make better decisions with'
                ],
                dialogExtraText: [
                    'Reliable data &',
                    'Recommended Actions'
                ],
                dialogOnClick: state.playAgain,
                dialogButtonText: 'Play Again',
                dialogTop: Math.ceil(board.width / proportion / 2),
                dialogLeft: Math.ceil(board.width / 2)
            }));
        }
    };
    return {render};
};

export default deck;