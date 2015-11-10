import alt from "../alt"

class CalcActions {
  updateCalc(calc) {
    this.dispatch(calc);
  }
}

export default alt.createActions(CalcActions);
