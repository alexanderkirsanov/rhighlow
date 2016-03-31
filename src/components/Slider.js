import React from 'react';
import ReactDom from 'react-dom';
import tweenState from 'react-tween-state';

class Slider extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.setInitialDimensions();
    }

    componentDidMount() {
        this.setDimensions();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            slideCount: nextProps.children.length
        });
        this.setDimensions();
        if (nextProps.slideIndex !== this.state.currentSlide) {
            this.goToSlide(nextProps.slideIndex);
        }
    }

    goToSlide(index) {
        var self = this;
        if (index >= React.Children.count(this.props.children) || index < 0) {
            return;
        }

        this.setState({
            currentSlide: index
        }, () => {
            self.animateSlide();
        });
    }

    nextSlide() {
        const childrenCount = React.Children.count(this.props.children);
        if (this.state.currentSlide >= childrenCount - this.props.slidesToShow) {
            return;
        }

        this.goToSlide(Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - this.props.slidesToShow));
    }

    previousSlide() {
        if (this.state.currentSlide <= 0) {
            return;
        }

        this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
    }

    animateSlide(easing, duration, endValue){
        this.tweenState(this.props.vertical ? 'top' : 'left', {
            easing: easing || tweenState.easingTypes[this.props.easing],
            duration: duration || this.props.speed,
            endValue: endValue || this.getTargetLeft()
        });
    }

    tweenState
    setInitialDimensions() {
        this.setState({
            frameWidth: '100%',
            slideCount: React.Children.count(this.props.children),
            slideWidth: 0
        }, () => {
            this.setLeft();
        });
    }

    setLeft() {
        this.setState({
            left: this.getTargetLeft(),
            top: 0
        })
    }

    setDimensions() {
        var self = this,
            slideWidth,
            firstSlide,
            frame,
            frameWidth,
            frameHeight,
            slideHeight;

        frame = this.refs.frame;
        firstSlide = frame.childNodes[0].childNodes[0];
        if (firstSlide) {
            firstSlide.style.height = 'auto';
            slideHeight = firstSlide.offsetHeight * this.props.slidesToShow;
        } else {
            slideHeight = 100;
        }

        if (typeof this.props.slideWidth !== 'number') {
            slideWidth = parseInt(this.props.slideWidth);
        } else {
            if (this.props.vertical) {
                slideWidth = (slideHeight / this.props.slidesToShow) * this.props.slideWidth;
            } else {
                slideWidth = (frame.offsetWidth / this.props.slidesToShow) * this.props.slideWidth;
            }
        }
        slideWidth -= this.props.cellSpacing * ((100 - (100 / this.props.slidesToShow)) / 100);

        frameHeight = slideHeight + ((this.props.cellSpacing / 2) * (this.props.slidesToShow - 1));
        frameWidth = this.props.vertical ? frameHeight : frame.offsetWidth;

        this.setState({
            frameWidth: frameWidth,
            slideWidth: slideWidth,
            slidesToScroll: 1,
            left: 0,
            top: 0
        }, () => {
            this.setLeft()
        });
    }

    getTargetLeft() {
        const offset = -this.props.cellSpacing * (this.state.currentSlide);

        return ((this.state.slideWidth * this.state.currentSlide) - offset) * -1;
    }
}
