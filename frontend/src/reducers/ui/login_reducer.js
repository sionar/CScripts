import {
  SET_LOGIN_USERNAME,
  SET_LOGIN_PASSWORD,
  CLEAR_LOGIN_STATE,
  } from '../../actions/ui_auth_actions';

export default (state = {username: '', password: ''}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_LOGIN_USERNAME:
      nextState.username = action.input;
      return nextState;
    case SET_LOGIN_PASSWORD:
      nextState.password = action.input;
      return nextState;
    case CLEAR_LOGIN_STATE:
      nextState = {username: '', password: ''};
      return nextState;
    default:
      return state;
  }
}