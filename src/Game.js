import CardDeck from './cardDeck';
import Hand from './hand';
import CardComponent from './components/Card';
import React from 'react';
class Game extends React.Component {
    constructor() {
        super();
        this.cardImages = Array.from({length: 5}, (x,i)=>{return {index: i}});
        const deck = CardDeck();
        this.hand = Hand(5);
        for (let i = 0; i < this.hand.size; i++) {
            this.hand.addCard(deck.deal());
        }
        this.nextCard = 1;
        const {suit, face} = this.hand.getCard(0);
        this.cardImages[0] = Object.assign(this.cardImages[0], {suit, face});
    }

    render() {
        return (
            <div>{this.cardImages.map(x=> <CardComponent suite = {x.suit} face = {x.face} key={x.index}/>)}</div>
        )
    }
}
export default Game;