import React, {Component, PropTypes} from 'react';
//import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class Car extends Component {

  state = {}

  componentDidMount() {
    const carLoader = new THREE.JSONLoader();
    carLoader.load(`../assets/json/car.json`, this.loadCar);
  }

  loadCar = (carGeometry, carMaterials) => {
    carMaterials = carMaterials[0];
    this.setState({carGeometry, carMaterials});
  }

  render() {
    const {carGeometry} = this.state;
    const Xpos = this.props.carX;

    if (carGeometry) {

      return (
          <mesh
            position={new THREE.Vector3(Xpos + 0.4, 0, 0)}
            rotation={new THREE.Euler(0, 3.16, 0)}
          >
            <geometry
              vertices={carGeometry.vertices}
              faces={carGeometry.faces}
              colors={carGeometry.colors}
            />
            <meshLambertMaterial
              color={0x901595}
            />
          </mesh>
      );
    } else {
      return (
        <group></group>
      );
    }
  }
}

Car.propTypes = {
  carX: PropTypes.number
};
