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

  render() {
    const actionButton = this.props;

    // TODO
    return <button onClick={this.handleClick.bind(this)}>
      {actionButton.label}
    </button>;
  }
}

export default ActionButton;
