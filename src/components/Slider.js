import React from 'react';
import tweenState from 'react-tween-state';
import assign from 'object-assign';

var Slider = React.createClass({
    mixins: [tweenState.Mixin],
    componentWillMount() {
        this.setInitialDimensions();
    },

    componentDidMount() {
        this.setDimensions();
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            slideCount: nextProps.children.length
        });
        this.setDimensions();
        if (nextProps.slideIndex !== this.state.currentSlide) {
            this.goToSlide(nextProps.slideIndex);
        }
    },

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
    },

    nextSlide() {
        const childrenCount = React.Children.count(this.props.children);
        if (this.state.currentSlide >= childrenCount - this.props.slidesToShow) {
            return;
        }

        this.goToSlide(Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - this.props.slidesToShow));
    },

    previousSlide() {
        if (this.state.currentSlide <= 0) {
            return;
        }

        this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
    },

    animateSlide(easing, duration, endValue) {
        this.tweenState('left', {
            easing: easing || tweenState.easingTypes[this.props.easing],
            duration: duration || this.props.speed,
            endValue: endValue || this.getTargetLeft()
        });
    },

    setInitialDimensions() {
        this.setState({
            frameWidth: '100%',
            slideCount: React.Children.count(this.props.children),
            slideWidth: 0
        }, () => {
            this.setLeft();
        });
    },

    setLeft() {
        this.setState({
            left: this.getTargetLeft(),
            top: 0
        })
    },

    setDimensions() {
        var self = this,
            slideWidth,
            firstSlide,
            frame,
            frameWidth,

            frame = this.refs.frame;
        firstSlide = frame.childNodes[0].childNodes[0];
        if (firstSlide) {
            firstSlide.style.height = 'auto';
        }

        if (typeof this.props.slideWidth !== 'number') {
            slideWidth = parseInt(this.props.slideWidth);
        } else {
            slideWidth = (frame.offsetWidth / this.props.slidesToShow) * this.props.slideWidth;
        }
        slideWidth -= this.props.cellSpacing * ((100 - (100 / this.props.slidesToShow)) / 100);

        frameWidth = frame.offsetWidth;

        this.setState({
            frameWidth: frameWidth,
            slideWidth: slideWidth,
            slidesToScroll: 1,
            left: 0,
            top: 0
        }, () => {
            this.setLeft()
        });
    },

    formatChildren(children) {
        return React.Children.map(children, (child, index) => {
            return <li className='slider-slide' style={this.getSlideStyles()} key={index}>{child}</li>
        });
    },

    render() {
        const children = React.Children.count(this.props.children) > 1 ? this.formatChildren(this.props.children) : this.props.children;
        return (
            <div className={['slider', this.props.className || ''].join(' ')} ref="slider"
                 style={assign(this.getSliderStyles(), this.props.style || {})}>
                <div className="slider-frame"
                     ref="frame"
                     style={this.getFrameStyles()}>
                    <ul className="slider-list" ref="list" style={this.getListStyles()}>
                        {children}
                    </ul>
                </div>
            </div>
        )
    },

    getFrameStyles() {
        return {
            position: 'relative',
            display: 'block',
            overflow: 'hidden',
            height: 'auto',
            margin: this.props.framePadding,
            padding: 0,
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
            msTransform: 'translate(0, 0)',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box'
        }
    },

    getListStyles() {
        var listWidth = this.state.slideWidth * React.Children.count(this.props.children);
        var spacingOffset = this.props.cellSpacing * React.Children.count(this.props.children);
        var transform = 'translate3d(' +
            this.getTweeningValue('left') + 'px, ' +
            this.getTweeningValue('top') + 'px, 0)';
        return {
            transform,
            WebkitTransform: transform,
            msTransform: 'translate(' +
            this.getTweeningValue('left') + 'px, ' +
            this.getTweeningValue('top') + 'px)',
            position: 'relative',
            display: 'block',
            margin: '0px ' + (this.props.cellSpacing / 2) * -1 + 'px',
            padding: 0,
            height: 'auto',
            width: listWidth + spacingOffset,
            cursor: this.state.dragging === true ? 'pointer' : 'inherit',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box'
        }
    },

    getSliderStyles() {
        return {
            position: 'relative',
            display: 'block',
            width: this.props.width,
            height: 'auto',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            visibility: this.state.slideWidth ? 'visible' : 'hidden'
        }
    },

    getTargetLeft() {
        const offset = -this.props.cellSpacing * (this.state.currentSlide);

        return ((this.state.slideWidth * this.state.currentSlide) - offset) * -1;
    },
    getSlideStyles() {
        return {
            display: 'inline-block',
            listStyleType: 'none',
            verticalAlign: 'top',
            width:  this.state.slideWidth,
            height: 'auto',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            marginLeft: this.props.cellSpacing / 2,
            marginRight: this.props.cellSpacing / 2,
            marginTop:  'auto',
            marginBottom:  'auto'
        }
    },
    getDefaultProps(){
        return {
            cellAlign: 'left',
            cellSpacing: 0,
            easing: 'easeOutCirc',
            slidesToScroll: 1,
            slidesToShow: 3,
            slideWidth: 1,
            speed: 500,
            width: '100%'
        }
    }
});

export default Slider;
