import React, { Component } from "react";
import { render } from "react-dom";
import AltContainer from "alt-container";

import CalcStore from "./stores/calc-store";
import Character from "./components/character"; 

class App extends Component {
  state = CalcStore.getState();

  // This is needed or Babel flips its shit
  constructor() {
    super();
  }

  componentDidMount() {
    CalcStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CalcStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <AltContainer>
        {
          this.props.characters.map((character, index) => (
            <Character key={index} character={character}/>
          ))
        }
      </AltContainer>
    );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  render(<App/>, document.querySelector("#app"));
});
