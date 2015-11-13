import React, { Component } from "react";
import PottyMeter from "./potty-meter";

class Character extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "character";

  render() {
    const character = this.props;

    return <section className={Character.className}>
      <h3>{character.name}</h3>
      {
        character.pottyMeters.map((pottyMeter, index) => 
          <PottyMeter {...pottyMeter} character={character} index={index} key={index} /> 
        )
      }
    </section>;
  }
}


export default Character;
