import config from './config';
const Card = (face, suit) => {
    const {faces, suits} = config;
    return {
        face: faces[face],
        suite: suits[suit],
        rank: face
    }

};
export default Card;