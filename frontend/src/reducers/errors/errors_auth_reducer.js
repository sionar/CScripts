import {
  SET_LOGIN_ERROR,
  SET_REGISTER_ERROR_USERNAME_INVALID,
  SET_REGISTER_ERROR_USERNAME_TAKEN,
  SET_REGISTER_ERROR_EMAIL_INVALID,
  SET_REGISTER_ERROR_EMAIL_TAKEN,
  SET_REGISTER_ERROR_PASSWORD_LENGTH,
  SET_REGISTER_ERROR_PASSWORDS_MATCH,
  SET_RECOVER_ERROR_EMAIL_INVALID,
  SET_RECOVER_ERROR_TOKEN_INVALID,
  SET_RECOVER_ERROR_PASSWORD_LENGTH,
  SET_RECOVER_ERROR_PASSWORDS_MATCH
  } from '../../actions/auth_actions';
import {
  SET_LOGIN_USERNAME,
  SET_LOGIN_PASSWORD,
  SET_REGISTER_EMAIL,
  SET_REGISTER_USERNAME,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_PASSWORD2,
  SET_RECOVER_EMAIL,
  SET_RECOVER_TOKEN,
  SET_RECOVER_PASSWORD,
  SET_RECOVER_PASSWORD2
  } from '../../actions/ui_auth_actions';

export default (
  state = {
    loginFailed: false,
    usernameInvalid: false,
    usernameTaken: false,
    emailTaken: false,
    emailInvalid: false,
    passwordShort: false,
    passwordsDontMatch: false,
    emailFailed: false,
    tokenInvalid: false,
    recoverPasswordShort: false,
    recoverPasswordsDontMatch: false
  }, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_LOGIN_ERROR:
      nextState.loginFailed = true;
      return nextState;
    case SET_LOGIN_USERNAME:
      nextState.loginFailed = false;
      return nextState;
    case SET_LOGIN_PASSWORD:
      nextState.loginFailed = false;
      return nextState;
    case SET_REGISTER_ERROR_USERNAME_INVALID:
      nextState.usernameInvalid = true;
      return nextState;
    case SET_REGISTER_ERROR_USERNAME_TAKEN:
      nextState.usernameTaken = true;
      return nextState;
    case SET_REGISTER_ERROR_EMAIL_INVALID:
      nextState.emailInvalid = true;
      return nextState;
    case SET_REGISTER_ERROR_EMAIL_TAKEN:
      nextState.emailTaken = true;
      return nextState;
    case SET_REGISTER_ERROR_PASSWORD_LENGTH:
      nextState.passwordShort = true;
      return nextState;
    case SET_REGISTER_ERROR_PASSWORDS_MATCH:
      nextState.passwordsDontMatch = true;
      return nextState;
    case SET_REGISTER_EMAIL:
      nextState.emailInvalid = false;
      nextState.emailTaken = false;
      return nextState;
    case SET_REGISTER_USERNAME:
      nextState.usernameInvalid = false;
      nextState.usernameTaken = false;
      return nextState;
    case SET_REGISTER_PASSWORD:
      nextState.passwordShort = false;
      return nextState;
    case SET_REGISTER_PASSWORD2:
      nextState.passwordsDontMatch = false;
      return nextState;
    case SET_RECOVER_ERROR_EMAIL_INVALID:
      nextState.emailFailed = true;
      return nextState;
    case SET_RECOVER_ERROR_TOKEN_INVALID:
      nextState.tokenInvalid = true;
      return nextState;
    case SET_RECOVER_ERROR_PASSWORD_LENGTH:
      nextState.recoverPasswordShort = true;
      return nextState;
    case SET_RECOVER_ERROR_PASSWORDS_MATCH:
      nextState.recoverPasswordsDontMatch = true;
      return nextState;   
    case SET_RECOVER_EMAIL:
      nextState.emailFailed = false;
      return nextState;
    case SET_RECOVER_TOKEN:
      nextState.tokenInvalid = false;
      return nextState;
    case SET_RECOVER_PASSWORD:
      nextState.recoverPasswordShort = false;
      return nextState;
    case SET_RECOVER_PASSWORD2:
      nextState.recoverPasswordsDontMatch = false;
      return nextState;     
    default:
      return state;
  };
};