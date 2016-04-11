import CardDeck from './cardDeck';
import Hand from './hand';
import deck from './components/deck';
const Game = (element, size = 5)=> {
    const currentDeck = deck(element, {
        height: element.offsetHeight,
        width: element.offsetWidth
    });
    let nextCard = 0;
    let state = {};
    const cardDeck = CardDeck();

    const initCards = () => cardDeck.getOriginal().map(y=>y.map(x=> {
        return {
            face: x.face === '10' ? x.face.toUpperCase() :x.face[0].toUpperCase(),
            opened: false
        }
    }).reverse());

    const setup = () => {
        const hand = Hand(size);
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

        setTimeout(()=> {
            currentDeck.render(state);
        }, 100)
    };
    return {setup};

};

export default Game;