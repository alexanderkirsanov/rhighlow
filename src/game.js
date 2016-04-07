import CardDeck from './cardDeck';
import Hand from './hand';
// import {CardComponent, Button} from './components/UI';
import deck from './components/deck';
const Game = (element, size = 5)=> {
    const currentDeck = deck(element, {
        height: element.offsetHeight,
        width: element.offsetWidth
    });
    currentDeck.render();

    const hand = Hand(size);
    // const setup = () => {
    //     const deck = CardDeck();
    //     for (let i = 0; i < hand.size; i++) {
    //         hand.addCard(deck.deal());
    //     }
    //     this.nextCard = 1;
    //     const {suit, face} = hand.getCard(0);
    //     const images = Array.from({length: size}, (x, i)=> {
    //         return {index: i}
    //     });
    //     images[0] = Object.assign(images[0], {suit, face});
    //     this.setState({cardImages: images, game: 'started'});
    // }
};

export default Game;