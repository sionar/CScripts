import { SET_CREATE_SCRIPT_ID, SET_CREATE_SCRIPT_STATUS } from '../../actions/script_create_actions';

export default (state = {created: false, scriptId: null}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_CREATE_SCRIPT_ID:
      nextState.scriptId = action.scriptId;
      return nextState;
    case SET_CREATE_SCRIPT_STATUS:
      nextState.created = action.status;
      if (action.status == false)
        nextState.scriptId = null;
      return nextState;
    default:
      return state;
  };
};