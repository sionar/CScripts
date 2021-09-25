import { SET_NIGHT_ORDER } from '../../actions/script_actions';
import {
  GET_CHARS,
  CLEAR_CREATE_SCRIPT,
  SET_UI_CREATE_RESET_CHARS,
  ADD_UI_CREATE_VERSION_USED_CHAR,
  REMOVE_UI_CREATE_VERSION_USED_CHAR
  } from '../../actions/script_create_actions';

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
    case ADD_UI_CREATE_VERSION_USED_CHAR:
      if (action.character.night_first_order != 0) {
        index = 0;
        end = nextState.first.every((char, idx) => {
          if (Number(action.character.night_first_order) < Number(char.night_first_order)) {
            index = idx;
            return false;
          };
          return true;
        });
        end ? nextState.first.push(action.character) : nextState.first.splice(index, 0, action.character);
      };
      if (action.character.night_other_order != 0) {
        index = 0;
        end = nextState.other.every((char, idx) => {
          if (Number(action.character.night_other_order) < Number(char.night_other_order)) {
            index = idx;
            return false;
          };
          return true;
        });
        end ? nextState.other.push(action.character) : nextState.other.splice(index, 0, action.character);
      };
      return nextState;
    case REMOVE_UI_CREATE_VERSION_USED_CHAR:
      index = nextState.first.findIndex(character => character.id == action.character.id );
      if (index != -1)
        nextState.first.splice(index, 1);
      index = nextState.other.findIndex(character => character.id == action.character.id );
      if (index != -1)
        nextState.other.splice(index, 1);
      return nextState;
    case CLEAR_CREATE_SCRIPT:
      nextState.first.filter(character => !character.playable);
      nextState.other.filter(character => !character.playable);
      return nextState;
    case SET_UI_CREATE_RESET_CHARS:
      nextState.first = nextState.first.filter(character => !character.playable);
      nextState.other = nextState.other.filter(character => !character.playable);
      return nextState;
    default:
      return state;
  };
};

