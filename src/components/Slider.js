import React, { Component } from "react";
import '../styles/Slider.scss';

class Slider extends Component {
  state = {
    index: 0,
    dragStart: 0
  }

  handleDragStart = (event) => {
    this.setState({
      dragStart: event.pageY
    });
  }

  handleDragMove = (event) => {
    const { dragStart } = this.state;
    if (dragStart) {
      const offset = event.pageY - dragStart;
      event.target.style.transform = `translateY(${offset}px)`
      event.target.nextSibling.style.transform = `translateY(${offset}px)`
    }
  }

  handleDragEnd = (event) => {
    this.setState({
      dragStart: 0
    })
  }


  render() {

    const { children } = this.props;

    return (
      <div
        className="slider"
        onMouseDown={this.handleDragStart}
        onMouseMove={this.handleDragMove}
        onMouseUp={this.handleDragEnd}>
        { children }
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