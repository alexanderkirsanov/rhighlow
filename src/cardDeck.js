import Card from './card';
import clone  from 'clone';
const CardDeck = () => {
    const numSuits = 4, numFaces = 13;
    let myNextCardSuit = 0, myNextCardFace = 0;
    const original = Array.from(new Array(numSuits), (x, i) => Array.from(new Array(numFaces), (x, n) => Card(n, i)));
    const myDeck = clone(original);
    const getOriginal = () => original;

    const shuffle = () => {
        let temp;
        for (let s = 0; s < numSuits; s++) {
            for (let f = 0; f < numFaces; f++) {
                const rS = Math.floor(Math.random() * numSuits);
                const rF = Math.floor(Math.random() * numFaces);
                temp = myDeck[s][f];
                myDeck[s][f] = myDeck[rS][rF];
                myDeck[rS][rF] = temp;
            }
        }
    };
    const deal = () => {
        const card = myDeck[myNextCardSuit][myNextCardFace];
        myNextCardFace++;
        if (myNextCardFace === numFaces) {
            myNextCardSuit++;
            myNextCardFace = 0;
        }
        return card;
    };
    shuffle();
    return {deal, getOriginal};
};
export default CardDeck;