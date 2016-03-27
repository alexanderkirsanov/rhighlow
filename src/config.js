const imagePath = 'http://reltio.high.low.s3-us-west-1.amazonaws.com/';
const defualtImage = 'http://reltio.high.low.s3-us-west-1.amazonaws.com/defualt.png';
const makeUrl = (props) => {
    return props.suite
        ? `${imagePath}${props.suite}_${props.face}.png`:
        defualtImage;
};

export default {
    makeUrl
}