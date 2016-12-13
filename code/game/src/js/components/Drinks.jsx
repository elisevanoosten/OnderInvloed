import React, {PropTypes} from 'react';

import {Drink} from './singleElements/';

class Drinks extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      drinkY: - 100,
      drinkX: this.getRandomPos()
    };
  }

  componentDidMount() {
    let {drinkY} = this.state;

    setInterval(() => {

      // Y POS ++
      drinkY += 1;
      this.setState({drinkY});
      this.checkCollision();

      if (drinkY > 10) {
        drinkX = this.getRandomPos();
        this.setState({drinkX});

        drinkY = - 150;
        this.setState({drinkY: - 150});
      }

      //EERSTE X POS
      let drinkX = 0;
    }, 40);

  }

  getRandomPos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  checkCollision() {
    const {carX, carY} = this.props;
    const {drinkY, drinkX} = this.state;

    const carwidth = 0.8;
    const carDepth = 0.8;

    if (drinkX <= carX + carwidth && drinkX >= carX) {
      if (drinkY <= carY + carDepth / 2 && drinkY >= carY - carDepth / 2) {
        console.log(`bots boem baf -- drinks groen`);
      }
    }
  }


  renderDrinks() {
    const {drinkX, drinkY} = this.state;

    return <Drink drinkX={drinkX} drinkY={drinkY} />;
  }

  render() {
    return (
      this.renderDrinks()
    );
  }
}

Drinks.propTypes = {
  carY: PropTypes.number,
  carX: PropTypes.number
  // getBarierY: PropTypes.func,
  // getBarierY: PropTypes.func
};

export default Drinks;
