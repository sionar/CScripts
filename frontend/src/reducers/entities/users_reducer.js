import { RECEIVE_SCRIPTS, RECEIVE_SCRIPT, RECEIVE_USER_SCRIPTS } from '../../actions/script_actions';
import { ADD_AUTH_USER, RECEIVE_AUTH } from '../../actions/auth_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let entry;
  switch (action.type) {
    case RECEIVE_SCRIPTS:
      action.data.forEach(script => {
        entry = Object.assign({}, script.owner);
        nextState[entry.username] = entry;
        });
      return nextState;
    case RECEIVE_SCRIPT:
      entry = Object.assign({}, action.data.owner);
      nextState[entry.username] = entry;
      return nextState;
    case ADD_AUTH_USER:
      entry = Object.assign({}, action.user);
      delete entry.token;
      nextState[entry.username] = entry;
      return nextState;
    case RECEIVE_AUTH:
      entry = Object.assign({}, action.user);
      delete entry.token;
      nextState[entry.username] = entry;
      return nextState;
    case RECEIVE_USER_SCRIPTS:
      let user = {username: action.data.username, is_guest: action.data.is_guest}
      nextState[user.username] = user;
      return nextState;
    default:
      return state;
  };
};