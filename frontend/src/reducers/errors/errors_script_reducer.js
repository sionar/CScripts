import { RECEIVE_SCRIPTS_ERRORS, RECEIVE_SCRIPT, RECEIVE_SCRIPTS, RECEIVE_USER_SCRIPTS } from '../../actions/script_actions';
import { RECEIVE_CREATE_ERRORS } from '../../actions/script_create_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SCRIPTS_ERRORS:
      return action.errors;  
    case RECEIVE_CREATE_ERRORS:
      return action.errors;
    case RECEIVE_SCRIPT:
      return {};
    case RECEIVE_SCRIPTS:
      return {};
    case RECEIVE_USER_SCRIPTS:
      return {};
    default:
      return nextState;
  };
};