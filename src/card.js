const Card = (face, suit) => {
    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
    return {
        face: faces[face],
        suit: suits[suit],
        rank: face
    }

};
Card.compareTo = (o1,o2) => o1.rank-o2.rank;

export default Card;