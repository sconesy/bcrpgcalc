import React, { Component } from "react";

class ProgressBar extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "progress-bar";

  render() {
    const pottyMeter = this.props; 

    // TODO
    return <div className={ProgressBar.className}>
      <span>{pottyMeter.value} / {pottyMeter.capacity}</span>
    </div>;
  }
}

export default ProgressBar;
