import React, {PropTypes} from 'react';
import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      bariers: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.loopBariers();
      requestAnimationFrame(() => {this.updateY();});
    }, 1500);
    requestAnimationFrame(() => {this.checkCollision();});

    // let {barierY} = this.state;

    //const randomDistance = Math.random() * (500 - 1000) + 500;
    //const delay = 1000; //1 second

    // this.loadInterval = setInterval(() => {
    // //   // barier later laten vertrekken
    // //
    //   barierY += 1;
    //   this.setState({barierY});
    // //
    //   this.checkCollision();
    // //
    // //   if (barierY > 10) {
    // //     //barierX = this.getRandomPos();
    // //     //this.setState({barierX});
    // //
    // //     barierY = - 250;
    // //     this.setState({barierY: - 150});
    // //
    // //   }
    // //
    // //   const barierX = 0;
    // //
    // }, 35);

  }

  getRandomXpos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  getRandomYpos() {
    return Math.floor(Math.random() * 400) - 420 / 2;
  }

  checkCollision() {
    const {carX, carY} = this.props;
    const {bariers} = this.state;

    const carwidth = 8;
    const carDepth = 2;

    bariers.map((barier, i) => {
      console.log(barier);
      if (barier.barierX <= carX + carwidth && barier.barierX >= carX) {
        if (barier.barierY <= carY + carDepth / 2 && barier.barierY >= carY - carDepth / 2) {
          console.log(`collision`);
          this.props.gameEnd(`barier`);
        }
      }
    });

    requestAnimationFrame(() => {this.checkCollision();});
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  //const randomDistance = Math.random() * (40 - 80) + 40;

  renderBariers() {
    const bariers = [];
    this.loopBariers(bariers);
    return bariers;
  }

  updateY() {
    let {bariers} = this.state;

    bariers.map(function(barier, i) {
      barier.barierY += 0.5;

      if (barier.barierY > 100) {

        bariers = bariers.filter(b => b !== bariers[i]);
        const planeWidth = 8;

        const barierX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
        const barierY = Math.floor(Math.random() * 170) - 200 / 2;

        bariers.push({
          barierX: barierX,
          barierY: barierY,
        });
      }
    });

    this.setState({bariers});

    requestAnimationFrame(() => {this.updateY();});
  }

  loopBariers(bariers) {
    for (let i = 0;i <= 6;i ++) {
      this.pushBarier();
    }
    return bariers;
  }

  pushBarier() {
    const {bariers} = this.state;
    const barierX = this.getRandomXpos();
    const barierY = this.getRandomYpos();

    bariers.push({
      barierX: barierX,
      barierY: barierY
    });
    this.setState({bariers});
  }

  render() {
    const {bariers} = this.state;
    return (
      <group>
        {bariers.map(function(barier, i) {
          return <Barier key={i} barierX={barier.barierX} barierY={barier.barierY} />;
        })}
      </group>
    );
  }
}


Bariers.propTypes = {
  carY: PropTypes.number,
  carX: PropTypes.number,
  gameEnd: PropTypes.func
};


export default Bariers;
