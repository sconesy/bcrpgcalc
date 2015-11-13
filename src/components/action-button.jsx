import React, { Component } from "react";

import CalcActions from "../actions/calc-actions";

class ActionButton extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  handleClick(event) {
    const { character, pottyMeter, ...action } = this.props;

    CalcActions.updatePottyMeter({
      character,
      pottyMeter,
      action
    });
  }

  static className = "action-button";

  isDisabled() {
    const { pottyMeter, ...action} = this.props;

    if (pottyMeter.value === 0) {
      if (action.type === "decrease" || action.type === "release") {
        return true;
      }
    } else if (pottyMeter.value >= pottyMeter.capacity) {
      if (action.type !== "reset") {
        return true;
      }
    }

    return false;
  }

  render() {
    const actionButton = this.props;
    const disabled = this.isDisabled();

    // TODO
    return <button className={ActionButton.className} onClick={this.handleClick.bind(this)} disabled={disabled}>
      {actionButton.label}
    </button>;
  }
}

export default ActionButton;
