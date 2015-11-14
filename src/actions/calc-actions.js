import alt from "../alt"
import _ from "lodash";

import CalcStore from "../stores/calc-store";

class CalcActions {
  processPottyAction(character, pottyMeter, action) {
    return { character, pottyMeter, action };
  }

  advanceTime(numTicks) {
    return numTicks;
  }
}

export default alt.createActions(CalcActions);
