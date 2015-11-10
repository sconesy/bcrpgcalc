import alt from "../alt"

class CalcStore {
  constuctor() {
    Object.assign(this, {
      characters: []
    });

    this.bindListeners({
      handleUpdateCalc: calcActions.UPDATE_CALC
    });
  }
}

export default alt.createStore(CalcStore, "CalcStore");
