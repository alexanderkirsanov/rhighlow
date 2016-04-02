import CardDeck from './cardDeck';
import Hand from './hand';
import CardComponent from './components/Card';
import Button from './components/Button';
import React from 'react';
import Slider from './components/Slider';
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            game: 'notStarted',
            cardImages: []
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
        const images = Array.from({length: 5}, (x, i)=> {
            return {index: i}
        });
        images[0] = Object.assign(images[0], {suit, face});
        this.setState({cardImages: images, game: 'started'});
    }

    action(source) {
        const {suit, face, rank} = this.hand.getCard(this.nextCard);
        const images = this.state.cardImages;
        images[this.nextCard] = Object.assign(images[this.nextCard], {suit, face});
        const rank1 = this.hand.getCard((this.nextCard - 1)).rank;
        if (source === 'lower') {
            if (rank < rank1) {
                this.nextCard++;
            } else {
                this.setState({game: 'loose'});
            }
        }
        if (source === 'higher') {
            if (rank > rank1) {
                this.nextCard++;
            } else {
                this.setState({game: 'loose'})
            }
        }
        this.setState({cardImages: images});
        if (this.nextCard === 5) {
            this.setState({game: 'win'})
        }

    }


    render() {
        let message = null;
        switch (this.state.game) {
            case 'win':
                message = 'win! :)';
                break;
            case 'loose':
                message = 'Loose :(';
                break;
            default:
                message = null;
                break;
        }
        const style = {
            position: 'absolute',
            top: '40',
            left: '240',
            right: '40',
            bottom: '40',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4',
            outline: 'none',
            padding: 20,
            width: 250,
            height: 50,
            display: message === null ? 'none' : 'block'
        };
        return (
            <div>
                <Slider>
                    {this.state.cardImages.map(x=> <CardComponent suite={x.suit} face={x.face}
                                                                  key={x.index}/>)}
                </Slider>
                <div style={style}>{message}</div>
                <div>
                    <Button disabled={this.state.game !== 'started'} action={() => this.action('higher')}
                            text='higher'/>
                    <Button disabled={this.state.game !== 'started'} action={() => this.action('lower')} text='lower'/>
                    <Button action={() => this.setup()} text='restart'/>
                </div>
            </div>
        )
    }
}
export default Game;