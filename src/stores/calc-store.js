import alt from "../alt"
import CalcActions from "../actions/calc-actions";

const INITIAL_STATE = {
  characters: [
    {
      name: "Jacqui",
      pottyMeters: [
        {
          type: "wet",
          color: "yellow",
          value: 0,
          capacity: 100,
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
              type: "increase",
              amount: 30
            }
          ]
        },
        {
          type: "mess",
          color: "brown",
          value: 0,
          capacity: 100,
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
              type: "increase",
              amount: 30
            }
          ]
        }
      ]
    }
  ]
};

class CalcStore {
  constructor() {
    // TODO: Pull initial state from somewhere else?
    Object.assign(this, INITIAL_STATE);

    this.bindListeners({
      handleUpdateCharacters: CalcActions.UPDATE_CHARACTERS,
      handleUpdatePottyMeter: CalcActions.UPDATE_POTTY_METER
    });
  }

  handleUpdatePottyMeter({ character, pottyMeter, action }) {
    const targetCharacter = this.characters[character];
    const targetPottyMeter = targetCharacter.pottyMeters[pottyMeter];

    // TODO: Put string constants in symbols or something
    if (action.type === "increase") {
      targetPottyMeter.value += action.amount;
    } else if (action.type === "decrease") {
      targetPottyMeter.value -= action.amount;
    } else if (action.type === "release") {
      targetPottyMeter.value = targetPottyMeter.capacity;
    } else if (action.type === "reset") {
      targetPottyMeter.value = 0;
    }
  }

  handleUpdateCharacters(characters) {
    this.characters = characters;
  }
}

export default alt.createStore(CalcStore, "CalcStore");
