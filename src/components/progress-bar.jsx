import React, { Component } from "react";

class ProgressBar extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "progress-bar";

  render() {
    // TODO
    return <p>ProgressBar TODO</p>;
  }
}

export default ProgressBar;
