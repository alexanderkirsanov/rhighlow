import {Spinner} from './components/UI';
import config from './config';
import ImageLoader from './imageLoader';
import Game from './game';
import h from 'hyperscript'

const GameLoader = (element) => {
    const concat = Array.prototype.concat;
    const makeUrl = config.makeUrl;
    const images = config.suits.reduce((prev, suite) => concat.call(prev, config.faces.map(face => makeUrl({
        suite,
        face
    }))), [config.defaultImage]);
    const spinner = Spinner();
    element.appendChild(spinner);
    ImageLoader.loadImages(images).then(()=> {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        Game(element).setup();
    });
};
GameLoader(document.getElementById('game'));
