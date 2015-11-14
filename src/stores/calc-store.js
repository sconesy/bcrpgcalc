import alt from "../alt";
import _ from "lodash";
import CalcActions from "../actions/calc-actions";

const INITIAL_POTTY_METERS = [
  {
    type: "wet",
    barColor: "yellow",
    textColor: "black",
    value: 0,
    capacity: 100,
    initialIncreasePerTick: 2,
    increasePerTick: 2,
    // TODO: Refine this to detail how bad of an accident we've had :3
    accidentCount: 0,
    actions: [
      {
        label: "Wet",
        type: "release"
      },
      {
        label: "Spurt",
        type: "decrease",
        amount: 10
      },
      {
        label: "Drink a bottle of water",
        type: "gradualIncrease",
        amount: 3,
        resetAfterTicks: 12
        /*
        type: "increase",
        amount: 30
        */
      }
    ]
  },
  {
    type: "mess",
    barColor: "brown",
    textColor: "black",
    value: 0,
    capacity: 100,
    initialIncreasePerTick: 1,
    increasePerTick: 1,
    accidentCount: 0,
    actions: [
      {
        label: "Mess",
        type: "release"
      },
      {
        label: "Let a little out",
        type: "decrease",
        amount: 10
      },
      {
        label: "Eat a meal",
        type: "gradualIncrease",
        amount: 2,
        resetAfterTicks: 24
        /*
        type: "increase",
        amount: 30
        */
      }
    ]
  }
]

const INITIAL_STATE = {
  // 1 tick = 5 minutes
  currentTick: 0,
  lastTick: 0,
  characters: [
    {
      name: "Jacqui",
      pottyMeters: _.cloneDeep(INITIAL_POTTY_METERS)
    },
    {
      name: "Jess",
      pottyMeters: _.cloneDeep(INITIAL_POTTY_METERS)
    }
  ],
  timeIntervals: [
    {
      numTicks: 3,
      label: "15 minutes"
    },
    {
      numTicks: 6,
      label: "30 minutes"
    },
    {
      numTicks: 12,
      label: "One hour"
    }
  ]
};

const ACCIDENT_ACTION = {
  label: "Uh oh! Time to change~",
  type: "change"
};

class CalcStore {
  constructor() {
    // TODO: Pull initial state from somewhere else?
    Object.assign(this, _.cloneDeep(INITIAL_STATE));

    this.bindListeners({
      handleProcessPottyAction: CalcActions.PROCESS_POTTY_ACTION,
      handleAdvanceTime: CalcActions.ADVANCE_TIME
    });
  }

  processTicks(pottyMeter) {
    const { currentTick, lastTick } = this; 

    for (let i = 0, ii = (currentTick - lastTick); i < ii; ++i) {
      pottyMeter.value += pottyMeter.increasePerTick;
    }

    if (pottyMeter.resetAtTick && currentTick >= pottyMeter.resetAtTick) {
      pottyMeter.increasePerTick = pottyMeter.initialIncreasePerTick;

      delete pottyMeter.resetAtTick;
    }

    this.checkPottyMeterValues(pottyMeter);
  }

  checkPottyMeterValues(pottyMeter) {
    if (pottyMeter.value >= pottyMeter.capacity) {
      pottyMeter.accidentCount++;
      pottyMeter.value = 0;
    }

    this.checkAccidentState(pottyMeter);
  }

  checkAccidentState(pottyMeter) {
    // Filter out accident action
    // FIXME: This should probably be elsewhere
    pottyMeter.actions = pottyMeter.actions.filter(function(x) {
      if (x.type === ACCIDENT_ACTION.type) {
        return false;
      } else {
        return true;
      }
    });

    if (pottyMeter.accidentCount > 0) {
      pottyMeter.actions.push(ACCIDENT_ACTION);
    }
  }

  handleProcessPottyAction({ character, pottyMeter, action }) {
    const { currentTick } = this;
    const targetPottyMeter = this.characters[character].pottyMeters[pottyMeter];

    if (action.type === "gradualIncrease") {
      // FIXME: This needs to reset after a time
      targetPottyMeter.increasePerTick += action.amount;
      targetPottyMeter.resetAtTick = currentTick + action.resetAfterTicks; 
    } else if (action.type === "increase") {
      targetPottyMeter.value += action.amount;
    } else if (action.type === "decrease") {
      targetPottyMeter.value -= action.amount;
    } else if (action.type === "release") {
      targetPottyMeter.value = targetPottyMeter.capacity;
    } else if (action.type === "change") {
      targetPottyMeter.accidentCount = 0;
    }

    this.checkPottyMeterValues(targetPottyMeter);
  };

  handleAdvanceTime(numTicks) {
    this.lastTick = this.currentTick;
    this.currentTick += numTicks;

    this.characters.forEach(character =>
      character.pottyMeters.forEach(this.processTicks.bind(this))
    );
  }
}

export default alt.createStore(CalcStore, "CalcStore");
