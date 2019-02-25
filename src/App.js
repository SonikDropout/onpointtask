import React, { Component } from "react";
import HorizontalSlider from "./components/HorizontalSlider";
import VerticalSlider from "./components/VerticalSlider";

export default class App extends Component {
  render() {
    return (
      <VerticalSlider>
        <div className="slide" style={{ background: '#21BB9A' }}>A</div>
        <div className="slide" style={{ background: '#329ADD' }}>B</div>
        <HorizontalSlider>
          <div className="slide" style={{ background: '#9A5CB9' }}>C</div>
          <div className="slide" style={{ background: '#329ADD' }}>D</div>
          <div className="slide" style={{ background: '#21BB9A' }}>E</div>
        </HorizontalSlider>
      </VerticalSlider>
    )
  }
}