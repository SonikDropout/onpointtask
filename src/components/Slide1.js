import React, {Component} from 'react';
import '../styles/Slide1.scss';

export default class Slide1 extends Component {
  static defaultProps = {
    style: {
      height: 0
    },
  }

  render() {
    const {style} = this.props;

    return (
      <div className="slide slide1">
        <Pulsar size={'lg'} caption={'Цель по HbA1c'} />
        <Pulsar size={'md'} caption={'Гипоглекимия'} />
        <Pulsar size={'sm'} caption={'Осложнения СД'} />
        <Pulsar size={'sm'} caption={'СС риски'} />
        <h2 className="slide__header slide1__header">
          {'Всегда ли цели терапии СД2 на поверхности?'}
        </h2>
      </div>
    )
  }
}

function Pulsar(props) {
  const {
    size,
    caption,
    position
  } = props;

  const className = `pulsar pulsar_${size}`;

  return (
    <div className={className}>
      <div className="pulsar__circle"/>
      <h3 className="pulsar__caption">{caption}</h3>
    </div>
  )
}