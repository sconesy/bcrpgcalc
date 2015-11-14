import React, { Component } from "react";

class ProgressBar extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  static className = "progress-bar";

  render() {
    const pottyMeter = this.props; 

    const outerStyle = {
      color: pottyMeter.textColor
//      borderColor: pottyMeter.barColor
    };

    const innerStyle = {
      width: `${pottyMeter.value / pottyMeter.capacity * 100}%`,
      backgroundColor: pottyMeter.barColor
    };

    // TODO
    return <div className={ProgressBar.className} style={outerStyle}>
      <span className={`${ProgressBar.className}--text`}>
        <span>{pottyMeter.value} / {pottyMeter.capacity}</span>
        <span>
          {pottyMeter.accidentCount > 0 && ` (Accidents: ${pottyMeter.accidentCount})`}
        </span>
      </span>
      <div style={innerStyle} className={`${ProgressBar.className}--display`} />
    </div>;
  }
}

export default ProgressBar;
