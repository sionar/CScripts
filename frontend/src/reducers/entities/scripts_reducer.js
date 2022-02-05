import { RECEIVE_SCRIPTS, RECEIVE_PAGE, RECEIVE_SCRIPT, RECEIVE_USER_SCRIPTS } from '../../actions/script_actions';
import { ADD_CREATE_SCRIPT } from '../../actions/script_create_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let entry;
  switch (action.type) {
    case RECEIVE_SCRIPTS:
      action.data.results.forEach(script => {
        entry = Object.assign({}, script)
        entry.owner = entry.owner.username;
        delete entry.versions;
        nextState[entry.id] = entry;
        });
      return nextState;
    case RECEIVE_PAGE:
      action.data.results.forEach(script => {
        entry = Object.assign({}, script)
        entry.owner = entry.owner.username;
        delete entry.versions;
        nextState[entry.id] = entry;
        });
      return nextState;
    case RECEIVE_SCRIPTS:
      action.data.results.forEach(script => {
        entry = Object.assign({}, script)
        entry.owner = entry.owner.username;
        delete entry.versions;
        nextState[entry.id] = entry;
        });
      return nextState;
    case RECEIVE_SCRIPT:
      entry = Object.assign({}, action.data);
      if (action.data.owner != null)
        entry.owner = action.data.owner.username;
      delete entry.versions;
      nextState[entry.id] = entry;
      return nextState;
    case ADD_CREATE_SCRIPT:
      entry = Object.assign({}, action.script);
      if (action.script.owner != null)
        entry.owner = action.script.owner.username;
      delete entry.versions;
      nextState[entry.id] = entry;
      return nextState;
    case RECEIVE_USER_SCRIPTS:
      action.data.scripts.forEach(script => {
        entry = Object.assign({}, script)
        entry.owner = entry.owner.username;
        delete entry.versions;
        nextState[entry.id] = entry;
        });
      return nextState;
    default:
      return state;
  };
};