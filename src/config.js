const imagePath = 'http://reltio.high.low.s3-us-west-1.amazonaws.com/';
const defaultImage = 'http://reltio.high.low.s3-us-west-1.amazonaws.com/defualt.png';
const makeUrl = (props) => {
    return props.suite
        ? `${imagePath}${props.suite}_${props.face}.png` :
        defaultImage;
};
const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const cutFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
const getIndexByName = (name) => suits.indexOf(name);
const getRankByName = (name, cut) => cut ? cutFaces.indexOf(name) : faces.indexOf(name);
export default {
    makeUrl,
    getIndexByName,
    getRankByName,
    faces,
    suits,
    defaultImage
}