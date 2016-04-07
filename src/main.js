import {Spinner} from './components/UI';
import config from './config';
import ImageLoader from './imageLoader';

const render = (parent, element) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    if (element) {
        parent.appendChild(element);
    }
};
const GameLoader = (element) => {
    render(element, Spinner());
    const concat = Array.prototype.concat;
    const makeUrl = config.makeUrl;
    const images = config.suits.reduce((prev, suite) => concat.call(prev, config.faces.map(face => makeUrl({
        suite,
        face
    }))), [config.defaultImage]);

    ImageLoader.loadImages(images).then(()=> {
        render(element);
    });
};
GameLoader(document.getElementById('game'));
