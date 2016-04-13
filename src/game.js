import CardDeck from './cardDeck';
import Hand from './hand';
import deck from './components/deck';
import config from './config';
const Game = (element, size = 52)=> {
    let nextCard = 0;
    let state = {};
    const cardDeck = CardDeck();
    const hand = Hand(size);
    const openCard = (suite, face) => {
        const index = config.getIndexByName(suite);
        state.cards[index].filter(card=>card.face === face).forEach(card=>card.opened = true);
    };
    const processAction = (action)=> {
        const {suite, face, rank} = hand.getCard(nextCard);
        const images = state.cardImages;
        images[1] = Object.assign(images[1], {suite, face});
        openCard(suite, face);
        const rank1 = hand.getCard((nextCard - 1)).rank;
        if (action === 'lower') {
            if (rank <= rank1) {
                nextCard++;
                images.shift();
                state.score += 100;
            } else {
                Object.assign(state, {game: 'loose'});
            }
        }
        if (action === 'higher') {
            if (rank >= rank1) {
                nextCard++;
                images.shift();
                state.score += 100;
            } else {
                Object.assign(state, {game: 'loose'})
            }
        }
        const secretCard = hand.getCard(nextCard);
        images[1] = Object.assign(images[1], secretCard);
        Object.assign(state, {cardImages: images});
        currentDeck.render(state);
        if (nextCard % 5 === 0) {
            Object.assign(state, {game: 'win'});
        }
        currentDeck.render(state);
    };
    const action = {
        recommendClick: ()=>alert('recommend'),
        highClick: ()=>processAction('higher'),
        lowClick: ()=> processAction('lower')
    };
    const currentDeck = deck(element, {
        height: element.offsetHeight,
        width: element.offsetWidth
    }, action);


    const initCards = () => cardDeck.getOriginal().map(y=>y.map(x=> {
        return {
            face: x.face === '10' ? x.face.toUpperCase() : x.face[0].toUpperCase(),
            opened: false
        }
    }).reverse());

    const setup = () => {
        for (let i = 0; i < hand.size; i++) {
            hand.addCard(cardDeck.deal());
        }
        nextCard = 1;
        const {suite, face} = hand.getCard(0);
        const secretCard = hand.getCard(1);
        const images = Array.from({length: size}, (x, i)=> {
            return {index: i}
        });
        images[0] = Object.assign(images[0], {suite, face});
        images[1] = Object.assign(images[1], secretCard);
        state = {cardImages: images, game: 'started', cards: initCards(), score: 0};
        openCard(suite, face);
        currentDeck.render(state);
    };
    return {setup};

};

export default Game;