import { SET_NIGHT_ORDER } from '../../actions/script_actions';
import { GET_CHARS, ADD_CREATE_VERSION, UPDATE_VERSION } from '../../actions/script_create_actions';

export default (state = {first: [], other: []}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let index, end;
  switch (action.type) {
    case GET_CHARS:
      action.characters.forEach(character => {
        if (!character.playable && character.night_first_order > 0) {
          index = 0;
          end = nextState.first.every((char, idx) => {
            if (Number(character.night_first_order) < Number(char.night_first_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.first.push(character) : nextState.first.splice(index, 0, character);
        };
        if (!character.playable && character.night_other_order > 0) {
          index = 0;
          end = nextState.other.every((char, idx) => {
            if (Number(character.night_other_order) < Number(char.night_other_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.other.push(character) : nextState.other.splice(index, 0, character);
        };
      });
      return nextState;
    case SET_NIGHT_ORDER:
      nextState.first = nextState.first.filter(character => !character.playable);
      nextState.other = nextState.other.filter(character => !character.playable);
      action.characters.forEach(character => {
        index = 0;
        if (character.night_first_order != 0) {
          end = nextState.first.every((character2, idx) => {
            if (Number(character.night_first_order) < Number(character2.night_first_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.first.push(character) : nextState.first.splice(index, 0, character);
        };
        index = 0;
        if (character.night_other_order != 0) {
          end = nextState.other.every((character2, idx) => {
            if (Number(character.night_other_order) < Number(character2.night_other_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.other.push(character) : nextState.other.splice(index, 0, character);
        };
      });
      return nextState;
    case ADD_CREATE_VERSION:
      nextState.first = nextState.first.filter(character => !character.playable);
      nextState.other = nextState.other.filter(character => !character.playable);
      action.version.characters.forEach(character => {
        index = 0;
        if (character.night_first_order != 0) {
          end = nextState.first.every((character2, idx) => {
            if (Number(character.night_first_order) < Number(character2.night_first_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.first.push(character) : nextState.first.splice(index, 0, character);
        };
        index = 0;
        if (character.night_other_order != 0) {
          end = nextState.other.every((character2, idx) => {
            if (Number(character.night_other_order) < Number(character2.night_other_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.other.push(character) : nextState.other.splice(index, 0, character);
        };
      });
      return nextState;
    case UPDATE_VERSION:
      nextState.first = nextState.first.filter(character => !character.playable);
      nextState.other = nextState.other.filter(character => !character.playable);
      action.version.characters.forEach(character => {
        index = 0;
        if (character.night_first_order != 0) {
          end = nextState.first.every((character2, idx) => {
            if (Number(character.night_first_order) < Number(character2.night_first_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.first.push(character) : nextState.first.splice(index, 0, character);
        };
        index = 0;
        if (character.night_other_order != 0) {
          end = nextState.other.every((character2, idx) => {
            if (Number(character.night_other_order) < Number(character2.night_other_order)) {
              index = idx;
              return false;
            };
            return true;
          });
          end ? nextState.other.push(character) : nextState.other.splice(index, 0, character);
        };
      });
      return nextState;
    default:
      return state;
  };
};

