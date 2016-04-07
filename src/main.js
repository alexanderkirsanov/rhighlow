import {Spinner} from './components/UI';
import config from './config';
import ImageLoader from './imageLoader';
import h from 'hyperscript'

const GameLoader = (element) => {
    const concat = Array.prototype.concat;
    const makeUrl = config.makeUrl;
    const images = config.suits.reduce((prev, suite) => concat.call(prev, config.faces.map(face => makeUrl({
        suite,
        face
    }))), [config.defaultImage]);
    element.appendChild(Spinner());
    ImageLoader.loadImages(images).then(()=> {
        h('div#game', h('div'));
    });
};
GameLoader(document.getElementById('game'));
