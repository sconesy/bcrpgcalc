import React, { Component } from "react";
import { render } from "react-dom";
import AltContainer from "alt-container";

import CalcStore from "./stores/calc-store";
import Character from "./components/character"; 
import TimeButton from "./components/time-button";

class App extends Component {
  // Needed or Babel explodes - see babel/babel#2775
  constructor(props) { super(props) }

  state = CalcStore.getState();

  componentDidMount() {
    CalcStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    CalcStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const characters = this.state.characters.map((character, index) => 
      <Character {...character} index={index} key={index} />
    );

    const buttons = this.state.timeIntervals.map((timeInterval, index) => 
      <TimeButton {...timeInterval} index={index} key={index} />
    );

    return <AltContainer>{characters.concat(buttons)}</AltContainer>;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  render(<App/>, document.querySelector("#app"));
});
