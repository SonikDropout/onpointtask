import React, { Component } from "react";
import '../styles/HorizontalSlider.scss';

export default class HorizontalSlider extends Component {
  static defaultProps = {
    navWidth: 200,
    style: {
      height: 0
    },
  }

  state = {
    index: 0,
    lastIndex: 0,
    dragStart: 0,
    drag: 0
  }

  handleDragStart = (event) => {
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
    } else if (newIndex >= children.length) {
      newIndex = children.length - 1;
    }

    this.setState({
      index: newIndex,
      drag: drag
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

  renderNav() {
    const {
      navWidth,
      children
    } = this.props;

    const {
      index
    } = this.state;

    const navRangeWidth = navWidth / (children.length - 1);
    const offset = -index * navRangeWidth;

    const thumbStyle = {
      transform: `translateX(${offset}px)`
    };

    return (
      <div 
        className="horizontalSlider__nav"
        style={{width: navWidth}}>
          <div 
            className="horizontalSlider__thumb"
            style={thumbStyle}
            onTouchStart={this.handleDragStart}
            onTouchMove={this.handleDragMove}
            onTouchEnd={this.handleDragEnd}/>
      </div>
    );
  }


  render() {
    const {
      style,
      children
    } = this.props;

    const {
      index
    } = this.state;

    const wrapperStyles = {
      width: `${ 100 * children.length }%`,
      transform: `translateX(${ (index + 1) * (100 / children.length) - 100 }%)`,
    };

    return (
      <div className="horizontalSlider" style={{height: style.height}}>
        {this.renderNav()}
        <div 
          className="horizontalSlider__wrapper"
          style={wrapperStyles}>
            {children}
          </div>
      </div>
    );
  }
}

