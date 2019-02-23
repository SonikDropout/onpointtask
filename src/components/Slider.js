import React, { Component } from "react";
import '../styles/Slider.scss';

class Slider extends Component {
  static defaultProps = {
    width: 1024,
    height: 768,
    MIN_DRAG_TO_SWITCH_SLIDES: 30
  }

  state = {
    index: 0,
    lastIndex: 0,
    dragStart: 0,
    drag: 0
  }

  slidesWrapper = React.createRef();

  handleDragStart = (event) => {
    this.setState({
      dragStart: event.pageY
    });
  }

  handleDragMove = (event) => {
    const { height } = this.props;
    const { dragStart, lastIndex } = this.state;
    if (dragStart) {
      const drag = event.pageY - dragStart;
      const newIndex = lastIndex - drag/height;
      this.setState({
        index: newIndex,
        drag: drag
      });
    }
  }

  handleDragEnd = (event) => {
    const {
      height,
      MIN_DRAG_TO_SWITCH_SLIDES,
      children
    } = this.props;
    const { index, drag } = this.state;
    let newIndex;

    if (Math.abs(drag) > MIN_DRAG_TO_SWITCH_SLIDES) {
      newIndex = (drag > 0) ?
        Math.ceil(index) - 1 :
        Math.floor(index) + 1;
    } else {
      newIndex = Math.round(index);
    }

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= children.length) {
      newIndex = children.length - 1;
    }

    this.setState({
      dragStart: 0,
      index: newIndex,
      lastIndex: newIndex
    })
  }

  componentWillMount() {
    const {
      children,
      width,
      height
    } = this.props;

    children.forEach(child => {
      child.props.style.height = height;
    });
  }

  renderNav() {
    const {
      children
    } = this.props;

    const {
      index
    } = this.state;

    const indicators = children.map((slide, i) => {
      return (<div 
        className={(i === Math.round(index) ?
          "slider__indicator slider__indicator_active" :
          "slider__indicator")}
        key={i}
        />);
    });

    return (
      <div className="slider__indicators">
        {indicators}
      </div>
    );
  }


  render() {
    const {
      children,
      width,
      height
    } = this.props;

    const {
      index
    } = this.state;

    const offset = -index*height;

    let wrapperStyle = {
      transform: `translateY(${offset}px)`
    };

    return (
      <div 
        className="slider" 
        style={{width: width, height: height}}>
          {this.renderNav()}
          <div
            className="slidesWrapper"
            onMouseDown={this.handleDragStart}
            onMouseMove={this.handleDragMove}
            onMouseUp={this.handleDragEnd}
            style={wrapperStyle}
            ref={this.slidesWrapper}>
            { children }
          </div>
      </div>
    );
  }
}

export default class SliderExample extends Component {
  render() {
    return (
      <Slider>
        <div className="slide" style={{ background: '#21BB9A' }}>A</div>
        <div className="slide" style={{ background: '#329ADD' }}>B</div>
        <div className="slide" style={{ background: '#9A5CB9' }}>C</div>
      </Slider>
    )
  }
}