import '../styles/Toggle.scss';
import React from 'react';

export default function Toggle(props) {
  const {
    width, 
    index,
    captions,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = props;

  const numOfSteps = captions.length - 1;
  const offset = 100/numOfSteps * index;
  const fillWidth = `${100 - offset}%`;

  return (
    <div className="toggle" style={{width: width}}>
      <div className="toggle__scale"/>
      <div 
        className="toggle__thumb"
        style={{right: `${offset}%`}}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}/>
      <div className="toggle__scaleFill" style={{width: fillWidth}}/>
      <ul className="toggle__captions">
        {captions.map((caption, i) => {
            return <li key={i} className="toggle__caption">{caption}</li>
        })}
      </ul>
    </div>
  )
}