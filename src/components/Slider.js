import React from 'react';
import ReactDom from 'react-dom';

class Slider extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.setInitialDimensions();
    }

    componentDidMount() {
        this.setDimensions();
        this.bindEvents();
        this.setExternalData();
    }

    setInitialDimensions() {
        var self = this, slideWidth, frameHeight, slideHeight;

        slideWidth = 0;
        slideHeight = 0;

        frameHeight = ((this.props.cellSpacing / 2) * (this.props.slidesToShow - 1));

        this.setState({
            frameWidth: this.props.vertical ? frameHeight : '100%',
            slideCount: React.Children.count(this.props.children),
            slideWidth: slideWidth
        }, () => {
            this.setLeft();
            this.setExternalData();
        });
    }

}
