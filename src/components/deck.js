import {Card, ActionCard, ProgressComposite} from './UI';
import move from 'move-js';
const deck = (element, board) => {
    const getCoordinates = (originalLeft, originalWidth, originalHeight) => {
        const ORIGINAL_WIDTH = 1100;
        const ORIGINAL_HEIGHT = 700;
        const left = Math.ceil(board.width * originalLeft / ORIGINAL_WIDTH);
        const width = Math.ceil(board.width * originalWidth / ORIGINAL_WIDTH);
        const height = Math.ceil(width * originalHeight / originalWidth);
        const maxHeight = Math.ceil(width * ORIGINAL_HEIGHT / originalWidth);
        const top = Math.ceil((maxHeight - height) / 2);
        return {left, top, width, height};
    };

    const firstCard = () => {
        const ORIGINAL_FIRST_WIDTH = 260;
        const ORIGINAL_LEFT = 1076 - ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 359;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'firstCard'}));
    };

    const secondCard = () => {
        const ORIGINAL_FIRST_WIDTH = 286;
        const ORIGINAL_LEFT = 1061 - ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 394;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'secondCard'}));
    };

    const thirdCard = () => {
        const ORIGINAL_FIRST_WIDTH = 325;
        const ORIGINAL_LEFT = 1025- ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 450;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'thirdCard'}));
    };

    const centralCard = (state = {suite:null, face:null}, action={}) => {
        const {suite, face} = state;
        const ORIGINAL_FIRST_WIDTH = 406;
        const ORIGINAL_LEFT = 978-ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 560;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return ActionCard(Object.assign(coordinates, {className: 'centralCard'}, action));
    };


    const bigCard = (state = {suite:null, face:null}) => {
        const {suite, face} = state;
        const ORIGINAL_FIRST_WIDTH = 460;
        const ORIGINAL_LEFT = 640 - ORIGINAL_FIRST_WIDTH;
        const ORIGINAL_FIRST_HEIGHT = 633;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_FIRST_WIDTH, ORIGINAL_FIRST_HEIGHT);
        return Card(Object.assign(coordinates, {className: 'bigCard', suite, face}));
    };

    const progressInfo = (state) => {
        const ORIGINAL_INFO_WIDTH = 295;
        const ORIGINAL_LEFT = 0;
        const ORIGINAL_HEIGHT= 700;
        const coordinates = getCoordinates(ORIGINAL_LEFT, ORIGINAL_INFO_WIDTH, ORIGINAL_HEIGHT);
        return ProgressComposite(Object.assign(coordinates,  state));
    };
    const render = (state) => {
        console.log(state);
        const {cardImages} = state;
        
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.appendChild(progressInfo(state));
        const action = {
            recommendClick: ()=>alert('recommend'),
            highClick: ()=>alert('high'),
            lowClick: ()=> alert('low')
        };
        const cards = [firstCard(),
            secondCard(),
            thirdCard(),
            centralCard(cardImages[1], action),
            bigCard(cardImages[0])];
        cards.forEach(card => element.appendChild(card));

    };
    return {render};
};

export default deck;