import alt from "../alt"

class CalcActions {
  updateCharacters(characters) {
    this.dispatch(characters);
  }

  updatePottyMeter(o) {
    this.dispatch(o);
  }
}

export default alt.createActions(CalcActions);
