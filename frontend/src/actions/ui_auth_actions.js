import * as AuthUtil from '../util/api_auth_util';

export const SET_REGISTER_EMAIL = 'SET_REGISTER_EMAIL';
export const SET_REGISTER_USERNAME = 'SET_REGISTER_USERNAME';
export const SET_REGISTER_PASSWORD = 'SET_REGISTER_PASSWORD';
export const SET_REGISTER_PASSWORD2 = 'SET_REGISTER_PASSWORD2';
export const CLEAR_REGISTER_STATE = 'CLEAR_REGISTER_STATE';
export const SET_LOGIN_USERNAME = 'SET_LOGIN_USERNAME';
export const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
export const CLEAR_LOGIN_STATE = 'CLEAR_LOGIN_STATE';
export const SET_RECOVER_EMAIL = 'SET_RECOVER_EMAIL';
export const SET_RECOVER_TOKEN = 'SET_RECOVER_TOKEN';
export const SET_RECOVER_PASSWORD = 'SET_RECOVER_PASSWORD';
export const SET_RECOVER_PASSWORD2 = 'SET_RECOVER_PASSWORD2';
export const SET_RECOVER_EMAIL_SENT = 'SET_RECOVER_EMAIL_SENT';
export const SET_RECOVER_PASSWORD_CHANGED = 'SET_RECOVER_PASSWORD_CHANGED';
export const CLEAR_RECOVER_STATE = 'CLEAR_RECOVER_STATE';

export const setRegisterFieldAction = (field, input) => {
  let type;
  switch (field) {
    case 'email':
      type = SET_REGISTER_EMAIL;
      break;
    case 'username':
      type = SET_REGISTER_USERNAME;
      break;
    case 'password':
      type = SET_REGISTER_PASSWORD;
      break;
    case 'password2':
      type = SET_REGISTER_PASSWORD2;
      break;
    default:
      type = SET_REGISTER_EMAIL;
  }
  return {type, input};
};

export const setLoginFieldAction = (field, input) => {
  let type;
  switch (field) {

    case 'username':
      type = SET_LOGIN_USERNAME;
      break;
    case 'password':
      type = SET_LOGIN_PASSWORD;
      break;
    default:
      type = SET_LOGIN_USERNAME;
  }
  return {type, input};
};

export const setRecoverFieldAction = (field, input) => {
  let type;
  switch (field) {
    case 'email':
      type = SET_RECOVER_EMAIL;
      break;
    case 'token':
      type = SET_RECOVER_TOKEN;
      break;
    case 'password':
      type = SET_RECOVER_PASSWORD;
      break;
    case 'password2':
      type = SET_RECOVER_PASSWORD2;
      break;
    default:
      type = SET_RECOVER_EMAIL;
  }
  return {type, input};
};

export const clearRegisterStateAction = () => ({
  type: CLEAR_REGISTER_STATE
});

export const clearLoginStateAction = () => ({
  type: CLEAR_LOGIN_STATE
});

export const clearRecoverStateAction = () => ({
  type: CLEAR_RECOVER_STATE
});

export const setRecoverEmailSentAction = (status) => ({
  type: SET_RECOVER_EMAIL_SENT,
  status
});

export const setRecoverPasswordChangedAction = (status) => ({
  type: SET_RECOVER_PASSWORD_CHANGED,
  status
});


export const setRegisterField = (field, input) => (dispatch) => {
  dispatch(setRegisterFieldAction(field, input));
};

export const setLoginField = (field, input) => (dispatch) => {
  dispatch(setLoginFieldAction(field, input));
};

export const setRecoverField = (field, input) => (dispatch) => {
  dispatch(setRecoverFieldAction(field, input));
};

export const clearRegisterState = () => (dispatch) => {
  dispatch(clearRegisterStateAction());
};

export const clearLoginState = () => (dispatch) => {
  dispatch(clearLoginStateAction());
};

export const clearRecoverState = () => (dispatch) => {
  dispatch(clearRecoverStateAction());
};

export const setRecoverEmailSent = (status) => (dispatch) => {
  dispatch(setRecoverEmailSentAction(status));
};

export const setRecoverPasswordChanged = (status) => (dispatch) => {
  dispatch(setRecoverPasswordChangedAction(status));
};