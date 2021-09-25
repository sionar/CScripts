import {
  SET_REGISTER_EMAIL,
  SET_REGISTER_USERNAME,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_PASSWORD2,
  CLEAR_REGISTER_STATE
  } from '../../actions/ui_auth_actions';

export default (state = {email: '', username: '', password: '', password2: ''}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_REGISTER_EMAIL:
      nextState.email = action.input;
      return nextState;
    case SET_REGISTER_USERNAME:
      nextState.username = action.input;
      return nextState;
    case SET_REGISTER_PASSWORD:
      nextState.password = action.input;
      return nextState;
    case SET_REGISTER_PASSWORD2:
      nextState.password2 = action.input;
      return nextState;
    case CLEAR_REGISTER_STATE:
      nextState = {email: '', username: '', password: '', password2: ''};
      return nextState;
    default:
      return state;
  };
};