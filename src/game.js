const Game = (element)=> {
    const hand = Hand(5);
    const setup = () => {
        const deck = CardDeck();
        for (let i = 0; i < hand.size; i++) {
            hand.addCard(deck.deal());
        }
        this.nextCard = 1;
        const {suit, face} = hand.getCard(0);
        const images = Array.from({length: 5}, (x, i)=> {
            return {index: i}
        });
        images[0] = Object.assign(images[0], {suit, face});
        this.setState({cardImages: images, game: 'started'});
    }
};