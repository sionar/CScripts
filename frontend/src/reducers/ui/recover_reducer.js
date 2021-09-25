import {
  SET_RECOVER_EMAIL,
  SET_RECOVER_TOKEN,
  SET_RECOVER_PASSWORD,
  SET_RECOVER_PASSWORD2,
  CLEAR_RECOVER_STATE,
  SET_RECOVER_EMAIL_SENT,
  SET_RECOVER_PASSWORD_CHANGED
  } from '../../actions/ui_auth_actions';

export default (
  state = {
    email: '',
    token: '',
    password: '',
    password2:'',
    emailSent: false,
    passwordChanged: false
  }, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_RECOVER_EMAIL:
      nextState.email = action.input;
      return nextState;
    case SET_RECOVER_TOKEN:
      nextState.token = action.input;
      return nextState;
    case SET_RECOVER_PASSWORD:
      nextState.password = action.input;
      return nextState;
    case SET_RECOVER_PASSWORD2:
      nextState.password2 = action.input;
      return nextState;
    case SET_RECOVER_EMAIL_SENT:
      nextState.emailSent = action.status;
      return nextState;       
    case SET_RECOVER_PASSWORD_CHANGED:
      nextState.passwordChanged = action.status;
      return nextState;    
    case CLEAR_RECOVER_STATE:
      nextState = {
        email: '',
        token: '',
        password: '',
        password2:'',
        emailSent: false,
        passwordChanged: false
      };
      return nextState;
    default:
      return state;
  };
};