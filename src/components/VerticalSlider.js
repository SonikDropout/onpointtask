import React, { Component } from "react";
import '../styles/VerticalSlider.scss';


export default class VerticalSlider extends Component {
  static defaultProps = {
    width: 1024,
    height: 768,
    MIN_DRAG_TO_SWITCH_SLIDES: 200
  }

  state = {
    index: 0,
    lastIndex: 0,
    dragStart: 0,
    drag: 0
  }

  handleDragStart = (event) => {
    // ignore event if user touches horizontal slider
    if (!event.target.classList.contains('toggle__thumb')) {
      this.setState({
        dragStart: event.touches[0].pageY
      });
    }
  }

  handleDragMove = (event) => {
    const { height } = this.props;
    const { dragStart, lastIndex } = this.state;
    
    // ignore on horizontal slider action
    if (!dragStart) return;

    const drag = event.touches[0].pageY - dragStart;
    let newIndex = lastIndex - drag/height;

    newIndex = this.constraintNewIndex(newIndex);

    this.setState({
      index: newIndex,
      drag: drag
    });
  }

  handleDragEnd = () => {
    const {
      MIN_DRAG_TO_SWITCH_SLIDES,
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

    newIndex = this.constraintNewIndex(newIndex);

    this.setState({
      dragStart: 0,
      index: newIndex,
      lastIndex: newIndex
    })
  }

  constraintNewIndex(index) {
    const maxIndex = this.props.children.length - 1;

    if (index < 0) {
      return 0;
    } else if (index > maxIndex) {
      return maxIndex;
    }

    return index;
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
          {
          index < 0.5 ? 
          <div className="slider__scrollHint">Листайте вниз</div> :
          null
          }
          <div
            className="slidesWrapper"
            onTouchStart={this.handleDragStart}
            onTouchMove={this.handleDragMove}
            onTouchEnd={this.handleDragEnd}
            style={wrapperStyle}
            ref={this.slidesWrapper}>
            { children }
          </div>
      </div>
    );
  }
}