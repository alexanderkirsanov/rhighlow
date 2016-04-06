
import {Spinner} from './components/UI';
/**
 *
 const concat = Array.prototype.concat;
 const makeUrl = config.makeUrl;
 this.images = config.suits.reduce((prev, suite) => concat.call(prev, config.faces.map(face => makeUrl({
            suite,
            face
        }))), []);
 this.images.push(config.defaultImage);
 */
const render = (parent, element) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.appendChild(element);
};
const GameLoader = (element) => {
    render(element, Spinner());
};
GameLoader(document.getElementById('game'));
