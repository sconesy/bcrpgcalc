import React, { Component } from "react";
import _ from "lodash";

import CalcActions from "../actions/calc-actions";

import ProgressBar from "./progress-bar";
import ActionButton from "./action-button";

class PottyMeter extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "potty-meter";

  render() {
    const pottyMeter = this.props;

    return <div className={PottyMeter.className}>
        <ProgressBar {...pottyMeter} />
        {
          pottyMeter.actions.map((action, index) => 
            <ActionButton {...action} character={pottyMeter.character} pottyMeter={pottyMeter} key={index} />
          )
        }
    </div>;
  }
}

export default PottyMeter;
