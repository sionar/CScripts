import { RECEIVE_SCRIPTS, RECEIVE_SCRIPT, RECEIVE_USER_SCRIPTS } from '../../actions/script_actions';
import { ADD_CREATE_VERSION, UPDATE_VERSION } from '../../actions/script_create_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let entry, version;
  switch (action.type) {
    case RECEIVE_SCRIPTS:
      action.data.forEach(script => 
        script.versions.forEach(version => {
          entry = Object.assign({}, version);
          entry.script_id = script.id;
          nextState[entry.id] = entry;
        })
      );
      return nextState;
    case RECEIVE_SCRIPT:
      const script = action.data;
      script.versions.forEach(version => {
        entry = Object.assign({}, version);
        entry.script_id = script.id;
        nextState[entry.id] = entry;
      });
      return nextState;
    case ADD_CREATE_VERSION:
      version = action.version;
      version.script_id = action.scriptId;
      version.characters = version.characters.map(el => action.characters[el.id]);
      nextState[version.id] = version;
      return nextState;
    case UPDATE_VERSION:
      version = action.version;
      version.script_id = Number(action.scriptId);
      version.characters = version.characters.map(el => action.characters[el.id]);
      nextState[version.id] = version;
      return nextState;
    case RECEIVE_USER_SCRIPTS:
      action.data.scripts.forEach(script => 
        script.versions.forEach(version => {
          entry = Object.assign({}, version);
          entry.script_id = script.id;
          nextState[entry.id] = entry;
        })
      );
      return nextState;
    default:
      return state;
  };
};