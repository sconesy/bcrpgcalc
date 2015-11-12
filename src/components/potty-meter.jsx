import React, { Component } from "react";

import ProgressBar from "./progress-bar";
import ActionButton from "./action-button";

class PottyMeter extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "potty-meter";

  render() {
    const pottyMeter = this.props;

    // Copy actions locally for potential mutation
    // FIXME: Maybe use lodash's cloneDeep instead
    const actions = pottyMeter.actions.slice(); 

    console.log(pottyMeter.value);

    // If the value is equal or above the maximum, we've had an accident, so we
    // add an additional action to acknowledge this and reset the meter
    if (pottyMeter.value >= pottyMeter.capacity) {
      actions.push({
        label: "Uh oh~",
        type: "reset"
      });
    }

    return <div className={PottyMeter.className}>
        <ProgressBar {...pottyMeter} />
        {
          actions.map((action, index) => 
            <ActionButton {...action} character={pottyMeter.character} pottyMeter={pottyMeter.index} key={index} />
          )
        }
    </div>;
  }
}

export default PottyMeter;
