import CardDeck from './cardDeck';
import Hand from './hand';
import CardComponent from './components/Card';
import React from 'react';
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            cardImages: Array.from({length: 5}, (x, i)=> {
                return {index: i}
            }),
            game: 'notStarted'
        };
    }

    componentDidMount() {
        this.setup();
    }

    setup() {
        const deck = CardDeck();
        this.hand = Hand(5);
        for (let i = 0; i < this.hand.size; i++) {
            this.hand.addCard(deck.deal());
        }
        this.nextCard = 1;
        const {suit, face} = this.hand.getCard(0);
        const images = this.state.cardImages;
        images[0] = Object.assign(images[0], {suit, face});
        this.setState({cardImages: images, game: 'started'});
    }

    action(source) {
        const {suit, face, rank2} = this.hand.getCard(this.nextCard);
        const images = this.state.cardImages;
        images[this.nextCard] = Object.assign(images[0], {suit, face});
        const rank1 = this.hand.getCard((this.nextCard - 1)).rank;
        if (source === 'lower') {
            if (rank2 < rank1) {
                this.nextCard++;
            } else {
                this.setSate({game: 'loose'});
            }
        }
        if (source === 'higher') {
            if (rank2 > rank1){
                this.nextCard ++;
            } else{
                this.setState({game: 'loose'})
            }
        }
        this.setState({cardImages: images});
        if (this.nextCard === 5){
            this.setState({game: 'win'})
        }

    }

    render() {
        return (
            <div>{this.state.cardImages.map(x=> <CardComponent suite={x.suit} face={x.face} key={x.index}/>)}</div>
        )
    }
}
export default Game;