import React, { Component } from "react";
import Toggle from "./Toggle";
import '../styles/HorizontalSlider.scss';

export default class HorizontalSlider extends Component {
  static defaultProps = {
    navWidth: 640,
  }

  state = {
    index: 0,
    lastIndex: 0,
    dragStart: 0,
    drag: 0,
    slide: 1
  }

  handleDragStart = (event) => {
    event.stopPropagation();
    this.setState({
      dragStart: event.touches[0].pageX
    });
  }

  handleDragMove = (event) => {
    const {
      navWidth,
      children
    } = this.props;
    const { dragStart, lastIndex } = this.state;

    const drag = event.touches[0].pageX - dragStart;

    const navRangeWidth = navWidth / (children.length - 1);
    let newIndex = lastIndex - drag / navRangeWidth;

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > children.length - 1) {
      newIndex = children.length - 1;
    }

    const newSlide = Math.round(newIndex) + 1;

    this.setState({
      index: newIndex,
      drag: drag,
      slide: newSlide
    });
  }

  handleDragEnd = (event) => {
    const {
      navWidth,
      children
    } = this.props;
    const { index, drag } = this.state;

    const newIndex = Math.round(index);

    this.setState({
      dragStart: 0,
      index: newIndex,
      lastIndex: newIndex
    })
  }

  render() {
    const {
      children,
      navWidth
    } = this.props;

    const {
      index,
      slide
    } = this.state;

    const wrapperStyles = {
      width: `${ 100 * children.length }%`,
      transform: `translateX(${ slide * (100 / children.length) - 100 }%)`,
    };

    const captions = [1998, 2009, 2016];

    return (
      <div className="horizontalSlider" style={{height: 768}}>
        <Toggle 
          width={navWidth} 
          index={index} 
          captions={captions}
          handleDragStart={this.handleDragStart}
          handleDragMove={this.handleDragMove}
          handleDragEnd={this.handleDragEnd}/>
        <div 
          className="horizontalSlider__wrapper"
          style={wrapperStyles}>
            {children}
          </div>
      </div>
    );
  }
}

