const imagePath = 'http://reltio.high.low.s3-us-west-1.amazonaws.com/';
const defaultImage = 'http://reltio.high.low.s3-us-west-1.amazonaws.com/defualt.png';
const makeUrl = (props) => {
    return props.suite
        ? `${imagePath}${props.suite}_${props.face}.png`:
        defaultImage;
};
const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
export default {
    makeUrl,
    faces,
    suits,
    defaultImage
}