import { 
  GET_CHARS,
  SET_UI_CREATE_VERSION_NUM,
  SET_UI_CREATE_VERSION_SCRIPT_ID,
  ADD_UI_CREATE_VERSION_USED_CHAR,
  REMOVE_UI_CREATE_VERSION_USED_CHAR,
  SET_UI_CREATE_VERSION_USED_CHARS,
  SET_UI_CREATE_VERSION_UNUSED_CHARS,
  SET_UI_CREATE_FILTER_INPUT,
  SET_UI_CREATE_RESET_CHARS,
  TRIM_USED_CHARACTERS,
  SET_VERSION,
  CLEAR_CREATE_SCRIPT,
  } from '../../actions/script_create_actions';
import { RECEIVE_SCRIPT } from '../../actions/script_actions';
import { scriptSize } from '../../util/constants'

export default (state = {unusedChars: [], usedChars: [], versionNum: 1, filter:''}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let foundIndex = null;
  let character;

  switch (action.type) {
    case GET_CHARS:
      nextState.unusedChars = action.characters;
      nextState.unusedChars.sort((el1, el2) => {
        if (el1.name < el2.name)
          return -1;
        return 1;
      });
      nextState.usedChars = [];
      return nextState;
    case SET_UI_CREATE_VERSION_NUM:
      nextState.versionNum = action.versionNum;
      return nextState;
    case SET_UI_CREATE_VERSION_SCRIPT_ID:
      nextState.scriptId = action.scriptId;
      return nextState;
    case ADD_UI_CREATE_VERSION_USED_CHAR:
      nextState.unusedChars.every((element, index) => {
        if (element.id == action.character.id) {
          foundIndex = index;
          return false;
        }
        return true;
      });

      if (foundIndex != null) {
        nextState.usedChars.push(nextState.unusedChars[foundIndex]);
        nextState.unusedChars.splice(foundIndex, 1);
      }
      return nextState;
    case REMOVE_UI_CREATE_VERSION_USED_CHAR:
      nextState.usedChars.every((element, index) => {
        if (element.id == action.character.id) {
          foundIndex = index;
          return false;
        }
        return true;
      });
      const char = Object.assign({}, nextState.usedChars[foundIndex]);
      if (foundIndex != null) {
        nextState.unusedChars.every((element, index) => {
          if (char.name < element.name) {
            nextState.unusedChars.splice(index, 0, char);
            return false;
          }
          return true;
        })
        nextState.usedChars.splice(foundIndex, 1);
      }
      return nextState;
    case SET_UI_CREATE_VERSION_USED_CHARS:
      nextState.usedChars = action.characters;
      return nextState;
    case SET_UI_CREATE_VERSION_UNUSED_CHARS:
      nextState.unusedChars = action.characters;
      return nextState;
    case SET_UI_CREATE_RESET_CHARS:
      nextState.unusedChars = nextState.unusedChars.concat(nextState.usedChars)
      nextState.unusedChars.sort((el1, el2) => {
        if (el1.name < el2.name)
          return -1;
        return 1;
      });
      nextState.usedChars = [];
      return nextState;
    case CLEAR_CREATE_SCRIPT:
      nextState.usedChars.forEach((char) => {
        nextState.unusedChars.every((element, index) => {
          if (char.name < element.name) {
            nextState.unusedChars.splice(index, 0, char);
            return false;
          };
          return true;
        });
      });
      nextState.usedChars = [];
      nextState.versionNum = 0;
      return nextState;
    case TRIM_USED_CHARACTERS:
      const limit = scriptSize[action.scriptType];
      const count = {};
      const nextUsedChars = [];
      for (const [k,v] of Object.entries(limit)) {
        count[k] = 0;
      }
      nextState.usedChars.forEach((character, index) => {
        if (count[character.char_type] < limit[character.char_type]) {
          count[character.char_type] += 1;
          nextUsedChars.push(character);
        } else {
          nextState.unusedChars.push(character);
        }
      });
      nextState.usedChars = nextUsedChars;
      nextState.unusedChars.sort((el1, el2) => {
        if (el1.name < el2.name)
          return -1;
        return 1;
      });
      return nextState;
    case SET_UI_CREATE_FILTER_INPUT:
      nextState.filter = action.text;
      return nextState;
    case RECEIVE_SCRIPT:
      nextState.usedChars = action.data.versions[0].characters.map(character => character);
      nextState.usedChars.forEach(character => {
        nextState.unusedChars.every((element, index) => {
          if (character.id == element.id) {
            nextState.unusedChars.splice(index, 1);
            return false; 
          };
          return true;
        });
      });
      return nextState;
    case SET_VERSION:
      nextState.usedChars = action.version.characters;
      nextState.usedChars.forEach(character => {
        nextState.unusedChars.every((element, index) => {
          if (character.id == element.id) {
            nextState.unusedChars.splice(index, 1);
            return false; 
          };
          return true;
        });
      });
      return nextState;
    default:
      return state;
  };
};