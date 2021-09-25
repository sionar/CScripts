import { SET_DELETE_SCRIPT_STATUS, SET_DELETE_SCRIPT_ID } from '../../actions/script_create_actions';

export default (state = {deleted: false, scriptId: null}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_DELETE_SCRIPT_STATUS:
      nextState.deleted = action.status;
      return nextState;
    case SET_DELETE_SCRIPT_ID:
      nextState.scriptId = action.scriptId;
      return nextState;
    default:
      return state;
  };
};