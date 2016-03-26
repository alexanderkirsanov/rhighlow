import Card from './card';

const CardDeck = () => {
    const numSuits = 4, numFaces = 13;
    let myNextCardSuit = 0, myNextCardFace = 0;
    const myDeck = Array.from(new Array(numSuits), (x, i) => Array.from(new Array(numFaces), (x, n) => Card(n, i)));
    console.log('ordered deck:' + JSON.stringify(myDeck));
    const shuffle = () => {
        let temp;
        for (let s = 0; s < numSuits; s++) {
            for (let f = 0; f < numFaces; f++) {
                const rS = Math.random() * numSuits;
                const rF = Math.random() * numFaces;
                temp = myDeck[s][f];
                myDeck[s][f] = myDeck[rS][rF];
                myDeck[rS][rF] = temp;
            }
        }
        console.log('shuffled deck:' + JSON.stringify(myDeck));
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
    return {deal, shuffle};
};
export default CardDeck;