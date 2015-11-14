import React, { Component } from "react";

import CalcActions from "../actions/calc-actions";

class TimeButton extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "time-button";

  handleClick() {
    const { numTicks } = this.props;
    
    CalcActions.advanceTime(numTicks);
  }

  render() {
    const timeInterval = this.props;

    return <button className={TimeButton.className} onClick={this.handleClick.bind(this)}>
      {timeInterval.label}
    </button>;
  }
}

export default TimeButton;
