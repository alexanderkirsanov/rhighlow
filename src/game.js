import CardDeck from './cardDeck';
import Hand from './hand';
import deck from './components/deck';
const Game = (element, size = 52)=> {
    let nextCard = 0;
    let state = {};
    const cardDeck = CardDeck();
    const hand = Hand(size);

    const processAction = (action)=> {
        const {suit, face, rank} = this.hand.getCard(nextCard);
        const images = state.cardImages;
        images[nextCard] = Object.assign(images[nextCard], {suit, face});
        const rank1 = hand.getCard((nextCard - 1)).rank;
        if (action === 'lower') {
            if (rank <= rank1) {
                nextCard++;
            } else {
                Object.assign(state, {game: 'loose'});
            }
        }
        if (action === 'higher') {
            if (rank >= rank1) {
                nextCard++;
            } else {
                Object.assign(state, {game: 'loose'})
            }
        }
        Object.assign(state, {cardImages: images});
        currentDeck.render(state);
        if (nextCard === 5) {
            Object.assign(state, {game: 'win'});
        }
        currentDeck.render(state);
    };
    const action = {
        recommendClick: ()=>alert('recommend'),
        highClick: ()=>processAction('high'),
        lowClick: ()=> processAction('low')
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
        const images = Array.from({length: size}, (x, i)=> {
            return {index: i}
        });
        images[0] = Object.assign(images[0], {suite, face});
        state = {cardImages: images, game: 'started', cards: initCards()};
        currentDeck.render(state);
    };
    return {setup};

};

export default Game;