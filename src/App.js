import React, { Component } from "react";
import HorizontalSlider from "./components/HorizontalSlider";
import VerticalSlider from "./components/VerticalSlider";
import Slide1 from "./components/Slide1";
import Slide2 from "./components/Slide2";

const backgrounds = {
  slide1: "url('./img/Slide1.jpg')",
  slide2: "url('./img/Slide2.jpg')",
  slide3_1: "url('./img/Slide3_1.jpg')",
  slide3_2: "url('./img/Slide3_2.jpg')",
  slide3_3: "url('./img/Slide3_3.jpg')",
}

export default class App extends Component {
  render() {
    return (
      <VerticalSlider>
        <Slide1/>
        <Slide2/>
        <HorizontalSlider>
          <div className="slide"></div>
          <div className="slide"></div>
          <div className="slide"></div>
        </HorizontalSlider>
      </VerticalSlider>
    )
  }
}