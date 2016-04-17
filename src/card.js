import config from './config';
const Card = (face, suit) => {
    const {faces, suits} = config;
    return {
        face: faces[face],
        suite: suits[suit],
        rank: face
    }

};
Card.compareTo = (o1, o2) => o1.rank - o2.rank;

export default Card;