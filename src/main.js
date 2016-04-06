import Game from './old/Game';
import config from './config';
import Loader from 'react-loader';
import ImageLoader from './old/imageLoader';
import ReactDOM from 'react-dom';
import React from 'react';

class GameLoader extends React.Component {
    constructor() {
        super();
        this.state = {loaded: false};
        const concat = Array.prototype.concat;
        const makeUrl = config.makeUrl;
        this.images = config.suits.reduce((prev, suite) => concat.call(prev, config.faces.map(face => makeUrl({
            suite,
            face
        }))), []);
        this.images.push(config.defaultImage);
    }

    componentDidMount() {
        ImageLoader.loadImages(this.images).then(this.onSuccess.bind(this)
        ).catch((e)=> {
            console.log(e)
        })
    }

    onSuccess() {
        this.setState({loaded: true})
    }

    render() {
        var style = {display: this.state.loaded ? 'none' : 'visible'};
        return (
            <div>
                <Loader loaded={this.state.loaded}>
                    <Game/>
                </Loader>
                <div style={style}>Loading resources</div>
            </div>
        );
    }
}

ReactDOM.render(<GameLoader/>, document.getElementById('game'));
